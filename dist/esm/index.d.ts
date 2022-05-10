import { Name } from "./name.js";
import { Address } from "./address.js";
import algosdk from "algosdk";
import CachedApi from "./cachedApi.js";
export declare class ANS extends CachedApi {
    constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer);
    name(name: string): Name;
    address(address: string): Address;
}
//# sourceMappingURL=index.d.ts.map