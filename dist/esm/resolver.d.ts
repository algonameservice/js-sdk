import algosdk, { Transaction } from "algosdk";
import CachedApi from "./cachedApi.js";
import { Domain, NameResponse, Record } from "./interfaces.js";
import { Name } from "./name.js";
export declare class Resolver extends CachedApi {
    private name?;
    private resolvedData?;
    constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer, name?: Name, network?: string);
    private checkName;
    resolveName(name?: string): Promise<NameResponse>;
    getNamesOwnedByAddress(address: string, socials?: boolean, metadata?: boolean, limit?: number): Promise<Domain[]>;
    filterKvPairs(kvPairs: Record[], type: string): Record[];
    decodeKvPairs(kvPairs: Record[]): Record[];
    filterDomainRegistrationTxns(txns: Transaction[]): Promise<string[]>;
    getDefaultDomain(address: string): Promise<string | Error>;
    owner(): Promise<string>;
    value(): Promise<string>;
    text(key: string): Promise<string>;
    expiry(): Promise<Date>;
    content(): Promise<string>;
}
//# sourceMappingURL=resolver.d.ts.map