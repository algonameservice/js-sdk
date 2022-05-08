import algosdk from "algosdk";
import { APP_ID, ALLOWED_SOCIALS } from "./constants.js";
import { InvalidNameError, AddressValidationError } from "./errors.js";
import { generateTeal } from "./generateTeal.js";

declare const Buffer: any;

export class Resolver {
  private algodClient: algosdk.Algodv2;
  private indexerClient: algosdk.Indexer;
  private cache: any;
  private name: string | undefined;

  constructor(
    client: algosdk.Algodv2,
    indexer: algosdk.Indexer,
    name?: string
  ) {
    this.algodClient = client;
    this.indexerClient = indexer;
    if (name) {
      this.name = name;
      this.resolveName();
    }
  }

  isCacheSet(name?: string) : boolean {
    return !name && this.cache;
  }

  async generateLsig(name?: string) {
    if (name === undefined) {
      name = this.name;
    }
    let program = await this.algodClient.compile(generateTeal(name as string)).do();
    program = new Uint8Array(Buffer.from(program.result, "base64"));
    return new algosdk.LogicSigAccount(program);
  }

  async resolveName(name?: string) {
    if(this.isCacheSet(name)) {
      return this.cache;
    } 

    if(name === undefined) {
      name = this.name;
    }

    if (name.length === 0 || name.length > 64) {
      throw new InvalidNameError();
    }
    const indexer = await this.indexerClient;
    const lsig = await this.generateLsig(name);
    let found = false;
    try {
      let accountInfo = await indexer.lookupAccountByID(lsig.address()).do();

      accountInfo = accountInfo.account["apps-local-state"];

      const length = accountInfo.length;
      let address;

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
          address = metadata.filter((kv: any) => kv.key === "owner")[0].value;
        }
      }

      if (found) {
        if (this.cache === undefined && name === this.name) {
          this.cache = {
            found,
            address,
            socials,
            metadata,
          };
        }
        return {
          found,
          address,
          socials,
          metadata,
        };
      } else return { found };
    } catch (err) {
      return { found };
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
              if (socials) {
                domain["socials"] = info.socials;
              }
              if (metadata) {
                domain["metadata"] = info.metadata;
              }
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
      const {key, value} = kvPairs[i];

      const kvObj = {
        key,
        value,
      };

      if (ALLOWED_SOCIALS.includes(key)) {
        socials.push(kvObj);
        continue;
      } 
      metadata.push(kvObj);
     
    }
    if (type === "socials") {
      return socials;
    } 
    if (type === "metadata") {
      return metadata;
    }
  }

  decodeKvPairs(kvPairs: any) {
    return kvPairs.map((kvPair: any) => {
      const decodedKvPair = {
        key: "",
        value: "",
      };

      let {key} = kvPair;
      const {value} = kvPair;

      key = Buffer.from(key, "base64").toString();
      decodedKvPair.key = key;

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

  async owner() {
    const domainInformation: any = await this.resolveName();
    if (domainInformation.found === true) {
      return domainInformation.address;
    } else return "Not Registered";
  }

  async text(key: string) {
    const domainInformation: any = await this.resolveName();
    if (domainInformation.found === true) {
      const socialRecords = domainInformation.socials.filter(
        (social: any) => social.key === key
      );
      if (socialRecords.length > 0) {
        return socialRecords[0].value;
      } else {
        const metadataRecords = domainInformation.metadata.filter(
          (metadata: any) => metadata.key === key
        );
        if (metadataRecords.length > 0) {
          return metadataRecords[0].value;
        } else {
          return "Property not set";
        }
      }
    } else {
      return "Not Registered";
    }
  }

  async expiry() {
    const domainInformation: any = await this.resolveName();
    if (domainInformation.found === true) {
      //Convert milliseconds to seconds by multiplying with 1000
      return new Date(
        domainInformation.metadata.filter(
          (data: any) => data.key === "expiry"
        )[0].value * 1000
      );
    } else return "Not Registered";
  }

  async content(): Promise<string> {
    const domainInformation: any = await this.resolveName();
    if (domainInformation.found === true) {
      const contentRecords: any[] = domainInformation.metadata.filter(
        (kv: any) => kv.key === "content"
      );
      if (contentRecords.length > 0) {
        return contentRecords[0].value;
      } else {
        return "Content field is not set";
      }
    } else {
      return "Domain not registered";
    }
  }
}
