import { Name } from "./name.js";
import { Address } from "./address.js";
import CachedApi from "./cachedApi.js";
import algosdk from "algosdk";
export { Resolver } from "./resolver.js";
export { Transactions } from "./transactions.js";
export * from "./errors.js";
export declare class ANS extends CachedApi {
    protected network: string;
    constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer, network?: string, appId?: number);
    name(name: string): Name;
    address(address: string): Address;
}
//# sourceMappingURL=index.d.ts.map