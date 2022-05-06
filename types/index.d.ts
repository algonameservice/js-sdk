import { Name } from "./name.js";
import { Address } from "./address.js";
export declare class ANS {
    private client;
    private indexer;
    constructor(client: any, indexer: any);
    name(name: string): Name;
    address(address: string): Address;
}
