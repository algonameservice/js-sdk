import algosdk from "algosdk";
import { ALLOWED_SOCIALS, APP_ID } from "./constants.js";
import { AddressValidationError, NameNotRegisteredError, PropertyNotSetError, } from "./errors.js";
import CachedApi from "./cachedApi.js";
import { b64toString } from "./util.js";
export class Resolver extends CachedApi {
    name;
    // @ts-ignore
    resolvedData;
    constructor(client, indexer, name) {
        super(client, indexer);
        this.rpc = client;
        this.indexer = indexer;
        this.name = name;
    }
    checkName(name) {
        if (!name) {
            // @ts-ignore
            name = this?.name.name;
        }
        if (!name) {
            throw new Error('A name must be provided');
        }
        return name;
    }
    async resolveName(name) {
        name = this.checkName(name);
        let found = false;
        const error = {
            found: false,
            socials: [],
            metadata: [],
            address: "Not Registered",
        };
        try {
            if (!this.resolvedData || name !== this.name?.name) {
                this.resolvedData = await this.indexer
                    .lookupAccountByID((await this.getTeal(name)).address())
                    .do();
            }
            let accountInfo = this.resolvedData;
            accountInfo = accountInfo.account["apps-local-state"];
            const length = accountInfo.length;
            let address;
            let socials = [], metadata = [];
            for (let i = 0; i < length; i++) {
                const app = accountInfo[i];
                if (app.id === APP_ID) {
                    const kv = app["key-value"];
                    const decodedKvPairs = this.decodeKvPairs(kv);
                    socials = this.filterKvPairs(decodedKvPairs, "socials");
                    metadata = this.filterKvPairs(decodedKvPairs, "metadata");
                    found = true;
                    address = metadata.filter((kv) => kv.key === "owner")[0]
                        .value;
                }
            }
            if (found) {
                return {
                    found,
                    address,
                    socials,
                    metadata,
                };
            }
            return error;
        }
        catch (err) {
            return error;
        }
    }
    async getNamesOwnedByAddress(address, socials = false, metadata = false, limit = 10) {
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
                    .applicationID(APP_ID)
                    .nextToken(nextToken)
                    .do();
                txnLength = info.transactions.length;
                if (txnLength > 0) {
                    nextToken = info["next-token"];
                    txns.push(info.transactions);
                }
            }
            catch (err) {
                return [];
            }
        }
        let accountTxns = [];
        for (let i = 0; i < txns.length; i++) {
            accountTxns = accountTxns.concat(txns[i]);
        }
        txns = accountTxns;
        const names = await this.filterDomainRegistrationTxns(txns);
        if (names.length > 0) {
            const details = [];
            for (let i = 0; i < names.length; i++) {
                if (details.length && details.length >= limit) {
                    break;
                }
                const info = await this.resolveName(names[i]);
                if (!info.found) {
                    i--;
                    continue;
                }
                if (info.found && info.address === address) {
                    const domain = {
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
    filterKvPairs(kvPairs, type) {
        const socials = [], metadata = [];
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
    decodeKvPairs(kvPairs) {
        return kvPairs.map((kvPair) => {
            const decodedKvPair = {
                key: "",
                value: "",
            };
            let { key } = kvPair;
            const { value } = kvPair;
            key = Buffer.from(key, "base64").toString();
            decodedKvPair.key = key;
            if (key === "owner") {
                decodedKvPair.value = algosdk.encodeAddress(
                // @ts-ignore
                new Uint8Array(Buffer.from(value.bytes, "base64")));
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
    async filterDomainRegistrationTxns(txns) {
        const names = [];
        try {
            for (let i = 0; i < txns.length; i++) {
                const txn = txns[i];
                if (txn["tx-type"] === "appl") {
                    // @ts-ignore
                    if (txn["application-transaction"]["application-id"] === APP_ID) {
                        // @ts-ignore
                        const appArgs = txn["application-transaction"]["application-args"];
                        if (Buffer.from(appArgs[0], "base64").toString() === "register_name") {
                            const decodedName = b64toString(appArgs[1]);
                            if (!names.includes(decodedName)) {
                                names.push(decodedName);
                            }
                        }
                        else if (b64toString(appArgs[0]) === "accept_transfer") {
                            // @ts-ignore
                            const lsigAccount = txn["application-transaction"]["accounts"][0];
                            let accountInfo = await this.indexer
                                .lookupAccountByID(lsigAccount)
                                .do();
                            accountInfo = accountInfo.account["apps-local-state"];
                            const length = accountInfo.length;
                            for (let i = 0; i < length; i++) {
                                if (accountInfo[i].id === APP_ID) {
                                    const kvPairs = accountInfo[i]["key-value"];
                                    const domainInfo = this.decodeKvPairs(kvPairs).filter((domain) => domain.key === "name");
                                    if (!names.includes(domainInfo[0].value)) {
                                        names.push(domainInfo[0].value);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (err) {
            return [];
        }
        return names;
    }
    async owner() {
        const domainInformation = await this.resolveName();
        if (domainInformation.found) {
            // @ts-ignore
            return domainInformation.address;
        }
        // @ts-ignore
        throw new NameNotRegisteredError(this.name.name);
    }
    async text(key) {
        const domainInformation = await this.resolveName();
        if (domainInformation.found) {
            const socialRecords = domainInformation.socials?.filter((social) => social.key === key);
            if (socialRecords && socialRecords.length > 0) {
                return socialRecords[0].value;
            }
            const metadataRecords = domainInformation.metadata?.filter((metadata) => metadata.key === key);
            if (metadataRecords && metadataRecords.length > 0) {
                return metadataRecords[0].value;
            }
            throw new PropertyNotSetError(key);
        }
        // @ts-ignore
        throw new NameNotRegisteredError(this.name.name);
    }
    async expiry() {
        const domainInformation = await this.resolveName();
        if (domainInformation.found) {
            //Convert milliseconds to seconds by multiplying with 1000
            return new Date(parseInt(domainInformation?.metadata.filter((data) => data.key === "expiry")[0].value) * 1000);
        }
        // @ts-ignore
        throw new NameNotRegisteredError(this.name.name);
    }
    async content() {
        const domainInformation = await this.resolveName();
        if (domainInformation.found) {
            const contentRecords = domainInformation?.metadata.filter((kv) => kv.key === "content");
            if (contentRecords.length > 0) {
                return contentRecords[0].value;
            }
            return "Content field is not set";
        }
        // @ts-ignore
        throw new NameNotRegisteredError(this._name);
    }
}
//# sourceMappingURL=resolver.js.map