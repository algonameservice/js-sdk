var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import algosdk from "algosdk";
import { ALLOWED_SOCIALS } from "./constants.js";
import { AddressValidationError, NameNotRegisteredError, PropertyNotSetError, } from "./errors.js";
import CachedApi from "./cachedApi.js";
import { b64toString } from "./util.js";
export class Resolver extends CachedApi {
    constructor(client, indexer, name, network, app) {
        super(client, indexer, network, app);
        this.name = name;
    }
    checkName(name) {
        if (!name) {
            // @ts-ignore
            name = this === null || this === void 0 ? void 0 : this.name.name;
        }
        if (!name) {
            throw new Error("A name must be provided");
        }
        return name;
    }
    resolveName(name) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            name = this.checkName(name);
            let found = false;
            const error = {
                found: false,
                socials: [],
                metadata: [],
                address: "Not Registered",
                value: "Not Registered",
            };
            try {
                if (!this.resolvedData || name !== ((_a = this.name) === null || _a === void 0 ? void 0 : _a.name)) {
                    this.resolvedData = yield this.indexer
                        .lookupAccountByID((yield this.getTeal(name)).address())
                        .do();
                }
                let accountInfo = this.resolvedData;
                accountInfo = accountInfo.account["apps-local-state"];
                const length = accountInfo.length;
                let address, value;
                let socials = [], metadata = [];
                for (let i = 0; i < length; i++) {
                    const app = accountInfo[i];
                    if (app.id === this.APP) {
                        const kv = app["key-value"];
                        const decodedKvPairs = this.decodeKvPairs(kv);
                        socials = this.filterKvPairs(decodedKvPairs, "socials");
                        metadata = this.filterKvPairs(decodedKvPairs, "metadata");
                        found = true;
                        address = metadata.filter((kv) => kv.key === "owner")[0]
                            .value;
                        value = metadata.filter((kv) => kv.key === "account" || kv.key === "value");
                        if (value.length > 0) {
                            value = value[0].value;
                        }
                        else {
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
            }
            catch (err) {
                return error;
            }
        });
    }
    getNamesOwnedByAddress(address, socials = false, metadata = false, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield algosdk.isValidAddress(address))) {
                throw new AddressValidationError();
            }
            let nextToken = "";
            let txnLength = 1;
            let txns = [];
            while (txnLength > 0) {
                try {
                    const info = yield this.indexer
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
            const names = yield this.filterDomainRegistrationTxns(txns);
            if (names.length > 0) {
                const details = [];
                for (let i = 0; i < names.length; i++) {
                    if (details.length && details.length >= limit) {
                        break;
                    }
                    const info = yield this.resolveName(names[i]);
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
        });
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
            if (key === "owner" ||
                key === "transfer_to" ||
                key === "account" ||
                key === "value") {
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
    filterDomainRegistrationTxns(txns) {
        return __awaiter(this, void 0, void 0, function* () {
            const names = [];
            try {
                for (let i = 0; i < txns.length; i++) {
                    const txn = txns[i];
                    if (txn["tx-type"] === "appl") {
                        // @ts-ignore
                        if (txn["application-transaction"]["application-id"] === this.APP) {
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
                                let accountInfo = yield this.indexer
                                    .lookupAccountByID(lsigAccount)
                                    .do();
                                accountInfo = accountInfo.account["apps-local-state"];
                                const length = accountInfo.length;
                                for (let i = 0; i < length; i++) {
                                    if (accountInfo[i].id === this.APP) {
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
        });
    }
    getDefaultDomain(address) {
        return __awaiter(this, void 0, void 0, function* () {
            let nextToken = "";
            let txnLength = 1;
            let txns = [];
            while (txnLength > 0) {
                try {
                    const info = yield this.indexer
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
                }
                catch (err) {
                    throw Error("No transactions found");
                }
            }
            let accountTxns = [];
            for (let i = 0; i < txns.length; i++) {
                accountTxns = accountTxns.concat(txns[i]);
            }
            txns = accountTxns;
            const appArgs = txns.map((txn) => txn["application-transaction"]["application-args"][0]);
            const appAccounts = txns.map((txn) => txn["application-transaction"]["accounts"]);
            for (const i in appArgs) {
                if (Buffer.from(appArgs[i], "base64").toString() === "set_default_account") {
                    const account = appAccounts[i];
                    let accountInfo = yield this.indexer.lookupAccountByID(account).do();
                    accountInfo = accountInfo["account"]["apps-local-state"];
                    for (const i in accountInfo) {
                        if (accountInfo[i].id === this.APP) {
                            const domain = this.decodeKvPairs(accountInfo[i]["key-value"]).filter((kv) => kv.key === "name");
                            if (domain.length > 0) {
                                return domain[0].value + ".algo";
                            }
                            else {
                                throw Error("Default domain not set");
                            }
                        }
                    }
                }
            }
            const domains = yield this.getNamesOwnedByAddress(address, false, false, 1);
            if (domains.length > 0) {
                return domains[0].name;
            }
            throw Error("No domains owned by this address");
        });
    }
    owner() {
        return __awaiter(this, void 0, void 0, function* () {
            const domainInformation = yield this.resolveName();
            if (domainInformation.found) {
                // @ts-ignore
                return domainInformation.address;
            }
            // @ts-ignore
            throw new NameNotRegisteredError(this.name.name);
        });
    }
    value() {
        return __awaiter(this, void 0, void 0, function* () {
            const domainInformation = yield this.resolveName();
            if (domainInformation.found) {
                // @ts-ignore
                return domainInformation.value;
            }
            // @ts-ignore
            throw new NameNotRegisteredError(this.name.name);
        });
    }
    text(key) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const domainInformation = yield this.resolveName();
            if (domainInformation.found) {
                const socialRecords = (_a = domainInformation.socials) === null || _a === void 0 ? void 0 : _a.filter((social) => social.key === key);
                if (socialRecords && socialRecords.length > 0) {
                    return socialRecords[0].value;
                }
                const metadataRecords = (_b = domainInformation.metadata) === null || _b === void 0 ? void 0 : _b.filter((metadata) => metadata.key === key);
                if (metadataRecords && metadataRecords.length > 0) {
                    return metadataRecords[0].value;
                }
                throw new PropertyNotSetError(key);
            }
            // @ts-ignore
            throw new NameNotRegisteredError(this.name.name);
        });
    }
    expiry() {
        return __awaiter(this, void 0, void 0, function* () {
            const domainInformation = yield this.resolveName();
            if (domainInformation.found) {
                //Convert milliseconds to seconds by multiplying with 1000
                return new Date(parseInt(domainInformation === null || domainInformation === void 0 ? void 0 : domainInformation.metadata.filter((data) => data.key === "expiry")[0].value) * 1000);
            }
            // @ts-ignore
            throw new NameNotRegisteredError(this.name.name);
        });
    }
    content() {
        return __awaiter(this, void 0, void 0, function* () {
            const domainInformation = yield this.resolveName();
            if (domainInformation.found) {
                const contentRecords = domainInformation === null || domainInformation === void 0 ? void 0 : domainInformation.metadata.filter((kv) => kv.key === "content");
                if (contentRecords.length > 0) {
                    return contentRecords[0].value;
                }
                return "Content field is not set";
            }
            // @ts-ignore
            throw new NameNotRegisteredError(this._name);
        });
    }
}
//# sourceMappingURL=resolver.js.map