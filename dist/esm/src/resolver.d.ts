import algosdk, { Transaction } from "algosdk";
import { NameNotRegisteredError } from "./errors.js";
import CachedApi from "./cachedApi.js";
import { Domain, NameResponse, Record } from "./interfaces.js";
import { Name } from "./name.js";
export declare class Resolver extends CachedApi {
    private name?;
    private resolvedData?;
    constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer, name?: Name);
    resolveName(name?: string): Promise<NameResponse>;
    getNamesOwnedByAddress(address: string, socials?: boolean, metadata?: boolean, limit?: number): Promise<Domain[]>;
    filterKvPairs(kvPairs: Record[], type: string): Record[];
    decodeKvPairs(kvPairs: Record[]): Record[];
    filterDomainRegistrationTxns(txns: Transaction[]): Promise<string[]>;
    owner(): Promise<string | NameNotRegisteredError>;
    text(key: string): Promise<string | NameNotRegisteredError>;
    expiry(): Promise<Date | NameNotRegisteredError>;
    content(): Promise<string | NameNotRegisteredError>;
}
//# sourceMappingURL=resolver.d.ts.map