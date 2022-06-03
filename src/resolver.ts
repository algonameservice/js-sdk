import algosdk, { Transaction } from "algosdk";
import { ALLOWED_SOCIALS } from "./constants.js";
import {
  AddressValidationError,
  NameNotRegisteredError,
  PropertyNotSetError,
} from "./errors.js";
import CachedApi from "./cachedApi.js";
import { Domain, NameResponse, Record } from "./interfaces.js";
import { b64toString } from "./util.js";
import { Name } from "./name.js";

declare const Buffer: any;

export class Resolver extends CachedApi {
  private name?: Name;
  // @ts-ignore
  private resolvedData?: Record<string, any>;

  constructor(
    client: algosdk.Algodv2,
    indexer: algosdk.Indexer,
    name?: Name,
    network?: string
  ) {
    super(client, indexer, network);
    this.name = name;
  }

  private checkName(name?: string): string {
    if (!name) {
      // @ts-ignore
      name = this?.name.name;
    }
    if (!name) {
      throw new Error("A name must be provided");
    }
    return name;
  }

  async resolveName(name?: string): Promise<NameResponse> {
    name = this.checkName(name);
    let found = false;
    const error: NameResponse = {
      found: false,
      socials: [],
      metadata: [],
      address: "Not Registered",
      value: "Not Registered",
    };

    try {
      if (!this.resolvedData || name !== this.name?.name) {
        this.resolvedData = await this.indexer
          .lookupAccountByID((await this.getTeal(name as string)).address())
          .do();
      }

      let accountInfo = this.resolvedData;

      accountInfo = accountInfo.account["apps-local-state"];
      const length = accountInfo.length;
      let address, value: any;

      let socials: Record[] = [],
        metadata: Record[] = [];

      for (let i = 0; i < length; i++) {
        const app = accountInfo[i];
        if (app.id === this.APP) {
          const kv = app["key-value"];
          const decodedKvPairs = this.decodeKvPairs(kv);
          socials = this.filterKvPairs(decodedKvPairs, "socials");
          metadata = this.filterKvPairs(decodedKvPairs, "metadata");
          found = true;
          address = metadata.filter((kv: Record) => kv.key === "owner")[0]
            .value;
          value = metadata.filter(
            (kv: Record) => kv.key === "account" || kv.key === "value"
          );
          if (value.length > 0) {
            value = value[0].value;
          } else {
            value = address;
          }
        }
      }

      if (found) {
        return {
          found,
          address,
          socials,
          metadata,
          value,
        };
      }

      return error;
    } catch (err) {
      return error;
    }
  }

  async getNamesOwnedByAddress(
    address: string,
    socials = false,
    metadata = false,
    limit = 10
  ): Promise<Domain[]> {
    if (!(await algosdk.isValidAddress(address))) {
      throw new AddressValidationError();
    }

    let nextToken = "";
    let txnLength = 1;
    let txns = [];

    while (txnLength > 0) {
      try {
        const info = await this.indexer
          .searchForTransactions()
          .address(address)
          .addressRole("sender")
          .afterTime("2022-02-24")
          .txType("appl")
          .applicationID(this.APP)
          .nextToken(nextToken)
          .do();

        txnLength = info.transactions.length;

        if (txnLength > 0) {
          nextToken = info["next-token"];
          txns.push(info.transactions);
        }
      } catch (err) {
        return [];
      }
    }

    let accountTxns: algosdk.Transaction[] = [];
    for (let i = 0; i < txns.length; i++) {
      accountTxns = accountTxns.concat(txns[i]);
    }

    txns = accountTxns;
    const names: string[] = await this.filterDomainRegistrationTxns(txns);

    if (names.length > 0) {
      const details = [];

      for (let i = 0; i < names.length; i++) {
        if (details.length && details.length >= limit) {
          break;
        }
        const info: NameResponse = await this.resolveName(names[i]);
        if (!info.found) {
          i--;
          continue;
        }
        if (info.found && info.address === address) {
          const domain: Domain = {
            address: "",
            found: true,
            name: "",
          };
          domain.name = names[i] + ".algo";
          domain.address = info.address;
          if (socials) {
            domain.socials = info.socials;
          }
          if (metadata) {
            domain.metadata = info.metadata;
          }
          details.push(domain);
        }
      }
      return details;
    }

    return [];
  }

  filterKvPairs(kvPairs: Record[], type: string): Record[] {
    const socials: Record[] = [],
      metadata: Record[] = [];

    for (const i in kvPairs) {
      const { key, value } = kvPairs[i];

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

    return [];
  }

  decodeKvPairs(kvPairs: Record[]): Record[] {
    return kvPairs.map((kvPair) => {
      const decodedKvPair: Record = {
        key: "",
        value: "",
      };

      let { key } = kvPair;
      const { value } = kvPair;

      key = Buffer.from(key, "base64").toString();
      decodedKvPair.key = key;

      if (
        key === "owner" ||
        key === "transfer_to" ||
        key === "account" ||
        key === "value"
      ) {
        decodedKvPair.value = algosdk.encodeAddress(
          // @ts-ignore
          new Uint8Array(Buffer.from(value.bytes, "base64"))
        );
        return decodedKvPair;
      }

      // @ts-ignore
      if (value.type === 1) {
        // @ts-ignore
        decodedKvPair.value = Buffer.from(value.bytes, "base64").toString();
      }

      // @ts-ignore
      if (value.type === 2) {
        // @ts-ignore
        decodedKvPair.value = value.uint;
      }

      return decodedKvPair;
    });
  }

  async filterDomainRegistrationTxns(txns: Transaction[]): Promise<string[]> {
    const names: string[] = [];
    try {
      for (let i = 0; i < txns.length; i++) {
        const txn: Transaction = txns[i];
        if (txn["tx-type" as keyof Transaction] === "appl") {
          // @ts-ignore
          if (txn["application-transaction"]["application-id"] === this.APP) {
            // @ts-ignore
            const appArgs = txn["application-transaction"]["application-args"];

            if (
              Buffer.from(appArgs[0], "base64").toString() === "register_name"
            ) {
              const decodedName = b64toString(appArgs[1]);
              if (!names.includes(decodedName)) {
                names.push(decodedName);
              }
            } else if (b64toString(appArgs[0]) === "accept_transfer") {
              // @ts-ignore
              const lsigAccount = txn["application-transaction"]["accounts"][0];
              let accountInfo = await this.indexer
                .lookupAccountByID(lsigAccount)
                .do();
              accountInfo = accountInfo.account["apps-local-state"];

              const length = accountInfo.length;

              for (let i = 0; i < length; i++) {
                if (accountInfo[i].id === this.APP) {
                  const kvPairs = accountInfo[i]["key-value"];
                  const domainInfo = this.decodeKvPairs(kvPairs).filter(
                    (domain: Record) => domain.key === "name"
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

  async getDefaultDomain(address: string): Promise<string | Error> {
    let nextToken = "";
    let txnLength = 1;
    let txns = [];

    while (txnLength > 0) {
      try {
        const info = await this.indexer
          .searchForTransactions()
          .address(address)
          .addressRole("sender")
          .afterTime("2022-02-24")
          .txType("appl")
          .applicationID(this.APP)
          .nextToken(nextToken)
          .do();

        txnLength = info.transactions.length;

        if (txnLength > 0) {
          nextToken = info["next-token"];
          txns.push(info.transactions);
        }
      } catch (err) {
        throw Error("No transactions found");
      }
    }

    let accountTxns: algosdk.Transaction[] = [];
    for (let i = 0; i < txns.length; i++) {
      accountTxns = accountTxns.concat(txns[i]);
    }

    txns = accountTxns;
    const appArgs = txns.map(
      (txn: any) => txn["application-transaction"]["application-args"][0]
    );
    const appAccounts = txns.map(
      (txn: any) => txn["application-transaction"]["accounts"]
    );
    for (const i in appArgs) {
      if (
        Buffer.from(appArgs[i], "base64").toString() === "set_default_account"
      ) {
        const account = appAccounts[i];
        let accountInfo = await this.indexer.lookupAccountByID(account).do();
        accountInfo = accountInfo["account"]["apps-local-state"];
        for (const i in accountInfo) {
          if (accountInfo[i].id === this.APP) {
            const domain = this.decodeKvPairs(
              accountInfo[i]["key-value"]
            ).filter((kv: any) => kv.key === "name");
            if (domain.length > 0) {
              return domain[0].value + ".algo";
            } else {
              throw Error("Default domain not set");
            }
          }
        }
      }
    }
    const domains = await this.getNamesOwnedByAddress(address, false, false, 1);
    if (domains.length > 0) {
      return domains[0].name;
    }
    throw Error("No domains owned by this address");
  }

  async owner(): Promise<string> {
    const domainInformation: NameResponse = await this.resolveName();
    if (domainInformation.found) {
      // @ts-ignore
      return domainInformation.address;
    }

    // @ts-ignore
    throw new NameNotRegisteredError(this.name.name);
  }

  async value(): Promise<string> {
    const domainInformation: NameResponse = await this.resolveName();
    if (domainInformation.found) {
      // @ts-ignore
      return domainInformation.value;
    }

    // @ts-ignore
    throw new NameNotRegisteredError(this.name.name);
  }

  async text(key: string): Promise<string> {
    const domainInformation: NameResponse = await this.resolveName();
    if (domainInformation.found) {
      const socialRecords: Record[] | undefined =
        domainInformation.socials?.filter(
          (social: Record) => social.key === key
        );
      if (socialRecords && socialRecords.length > 0) {
        return socialRecords[0].value;
      }
      const metadataRecords = domainInformation.metadata?.filter(
        (metadata: Record) => metadata.key === key
      );
      if (metadataRecords && metadataRecords.length > 0) {
        return metadataRecords[0].value;
      }

      throw new PropertyNotSetError(key);
    }

    // @ts-ignore
    throw new NameNotRegisteredError(this.name.name);
  }

  async expiry(): Promise<Date> {
    const domainInformation: NameResponse = await this.resolveName();
    if (domainInformation.found) {
      //Convert milliseconds to seconds by multiplying with 1000
      return new Date(
        parseInt(
          domainInformation?.metadata!.filter(
            (data: Record) => data.key === "expiry"
          )[0].value
        ) * 1000
      );
    }

    // @ts-ignore
    throw new NameNotRegisteredError(this.name.name);
  }

  async content(): Promise<string> {
    const domainInformation = await this.resolveName();
    if (domainInformation.found) {
      const contentRecords: Record[] = domainInformation?.metadata!.filter(
        (kv: Record) => kv.key === "content"
      );
      if (contentRecords.length > 0) {
        return contentRecords[0].value;
      }
      return "Content field is not set";
    }

    // @ts-ignore
    throw new NameNotRegisteredError(this._name);
  }
}
