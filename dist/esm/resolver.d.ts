import algosdk, { Transaction } from "algosdk";
import CachedApi from "./cachedApi.js";
import { Domain, NameResponse, Record } from "./interfaces.js";
export declare class Resolver extends CachedApi {
    private name?;
    constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer, name?: string);
    resolveName(name?: string): Promise<NameResponse>;
    getNamesOwnedByAddress(address: string, socials?: boolean, metadata?: boolean, limit?: number): Promise<Domain[]>;
    filterKvPairs(kvPairs: Record[], type: string): Record[];
    decodeKvPairs(kvPairs: Record[]): Record[];
    filterDomainRegistrationTxns(txns: Transaction[]): Promise<string[]>;
    owner(): Promise<string | undefined>;
    text(key: string): Promise<string>;
    expiry(): Promise<Date | string>;
    content(): Promise<string>;
}
//# sourceMappingURL=resolver.d.ts.map