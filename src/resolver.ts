import algosdk from "algosdk";
import { APP_ID, ALLOWED_SOCIALS } from "./constants.js";
import { InvalidNameError, AddressValidationError } from "./errors.js";
import { generateTeal } from "./generateTeal.js";

declare const Buffer: any;

export class Resolver {
  private algodClient: any;
  private indexerClient: any;

  constructor(client?: any, indexer?: any) {
    this.algodClient = client;
    this.indexerClient = indexer;
  }

  async generateLsig(name: string) {
    const client = this.algodClient;
    let program = await client.compile(generateTeal(name)).do();
    program = new Uint8Array(Buffer.from(program.result, "base64"));
    return new algosdk.LogicSigAccount(program);
  }

  async resolveName(name: string) {
    if (name.length === 0 || name.length > 64) {
      throw new InvalidNameError();
    } else {
      name = name.split(".algo")[0];
      name = name.toLowerCase();
      const indexer = await this.indexerClient;
      const lsig = await this.generateLsig(name);

      try {
        let accountInfo = await indexer.lookupAccountByID(lsig.address()).do();

        accountInfo = accountInfo.account["apps-local-state"];

        const length = accountInfo.length;
        let owner;
        let found = false;
        let socials: any = [],
          metadata: any = [];
        for (let i = 0; i < length; i++) {
          const app = accountInfo[i];
          if (app.id === APP_ID) {
            const kv = app["key-value"];
            const decodedKvPairs = this.decodeKvPairs(kv);
            socials = this.filterKvPairs(decodedKvPairs, "socials");
            metadata = this.filterKvPairs(decodedKvPairs, "metadata");
            found = true;
            owner = metadata.filter((kv: any) => kv.key === "owner")[0].value;
          }
        }

        if (found) {
          return {
            found: true,
            address: owner,
            socials: socials,
            metadata: metadata,
          };
        } else return { found: false };
      } catch (err) {
        return { found: false };
      }
    }
  }

  async getNamesOwnedByAddress(
    address: string,
    socials?: boolean,
    metadata?: boolean,
    limit?: number
  ) {
    const isValidAddress: boolean = await algosdk.isValidAddress(address);
    if (!isValidAddress) {
      throw new AddressValidationError();
    } else {
      const indexer = await this.indexerClient;

      let nextToken = "";
      let txnLength = 1;
      let txns = [];
      while (txnLength > 0) {
        try {
          const info = await indexer
            .searchForTransactions()
            .address(address)
            .addressRole("sender")
            .afterTime("2022-02-24")
            .txType("appl")
            .applicationID(APP_ID)
            .nextToken(nextToken)
            .do();

          txnLength = info.transactions.length;
          if (txnLength > 0) {
            nextToken = info["next-token"];
            txns.push(info.transactions);
          }
        } catch (err) {
          return false;
        }
      }

      let accountTxns: any = [];
      for (let i = 0; i < txns.length; i++) {
        accountTxns = accountTxns.concat(txns[i]);
      }

      txns = accountTxns;
      const names: any = await this.filterDomainRegistrationTxns(txns);

      if (names.length > 0) {
        const details = [];

        for (let i = 0; i < names.length; i++) {
          if (limit !== undefined) {
            if (details.length >= limit) break;
          }

          const info: any = await this.resolveName(names[i]);
          if (info.found && info.address !== undefined) {
            if (info.address === address) {
              const domain: any = {
                name: "",
              };
              domain.name = names[i] + ".algo";
              if (socials) domain["socials"] = info.socials;
              if (metadata) domain["metadata"] = info.metadata;
              details.push(domain);
            }
          } else {
            i = i - 1;
          }
        }
        return details;
      }
    }
  }

  filterKvPairs(kvPairs: any, type: string) {
    const socials = [],
      metadata = [];

    for (const i in kvPairs) {
      const key = kvPairs[i].key;
      const value = kvPairs[i].value;

      const kvObj = {
        key: key,
        value: value,
      };

      if (ALLOWED_SOCIALS.includes(key)) socials.push(kvObj);
      else metadata.push(kvObj);
    }
    if (type === "socials") {
      return socials;
    } else if (type === "metadata") {
      return metadata;
    }
  }

  decodeKvPairs(kvPairs: any) {
    return kvPairs.map((kvPair: any) => {
      const decodedKvPair = {
        key: "",
        value: "",
      };
      let key: string = kvPair.key;
      key = Buffer.from(key, "base64").toString();
      decodedKvPair.key = key;
      const value: any = kvPair.value;
      if (key === "owner") {
        decodedKvPair.value = algosdk.encodeAddress(
          new Uint8Array(Buffer.from(value.bytes, "base64"))
        );
      } else if (value.type === 1) {
        decodedKvPair.value = Buffer.from(value.bytes, "base64").toString();
      } else if (value.type === 2) {
        decodedKvPair.value = value.uint;
      }
      return decodedKvPair;
    });
  }

  async filterDomainRegistrationTxns(txns: any) {
    const names: any = [];
    const indexer = this.indexerClient;
    try {
      for (let i = 0; i < txns.length; i++) {
        const txn = txns[i];

        if (txn["tx-type"] === "appl") {
          if (txn["application-transaction"]["application-id"] === APP_ID) {
            const appArgs = txn["application-transaction"]["application-args"];

            if (
              Buffer.from(appArgs[0], "base64").toString() === "register_name"
            ) {
              if (!names.includes(Buffer.from(appArgs[1], "base64").toString()))
                names.push(Buffer.from(appArgs[1], "base64").toString());
            } else if (
              Buffer.from(appArgs[0], "base64").toString() === "accept_transfer"
            ) {
              const lsigAccount = txn["application-transaction"]["accounts"][0];
              let accountInfo = await indexer
                .lookupAccountByID(lsigAccount)
                .do();
              accountInfo = accountInfo.account["apps-local-state"];

              const length = accountInfo.length;

              for (let i = 0; i < length; i++) {
                if (accountInfo[i].id === APP_ID) {
                  const kvPairs = accountInfo[i]["key-value"];
                  const domainInfo = this.decodeKvPairs(kvPairs).filter(
                    (domain: any) => domain.key === "name"
                  );
                  if (!names.includes(domainInfo[0].value)) {
                    names.push(domainInfo[0].value);
                  }
                }
              }
            }
          }
        }
      }
    } catch (err) {
      return [];
    }

    return names;
  }

  async owner(name: string) {
    const domainInformation: any = await this.resolveName(
      name.split(".algo")[0]
    );
    if (domainInformation.found === true) {
      return domainInformation.address;
    } else return "Not Registered";
  }

  async text(name: string, key: string) {
    const domainInformation: any = await this.resolveName(name);
    if (domainInformation.found === true) {
      const textRecords = domainInformation.socials.filter(
        (social: any) => social.key === key
      );
      if (textRecords.length > 0) {
        return domainInformation.socials.filter(
          (social: any) => social.key === key
        )[0].value;
      } else {
        return "Property Not Set";
      }
    } else {
      return "Not Registered";
    }
  }

  async expiry(name: string) {
    const domainInformation: any = await this.resolveName(
      name.split(".algo")[0]
    );
    if (domainInformation.found === true) {
      return new Date(
        domainInformation.metadata.filter(
          (data: any) => data.key === "expiry"
        )[0].value * 1000
      );
    } else return "Not Registered";
  }

  async content(name:string) {
    //TODO: Must return the content value
  }
}
