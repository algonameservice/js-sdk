import { Resolver } from "./resolver.js";
export class Address {
    constructor(options) {
        const { address, rpc, indexer } = options;
        this.address = address;
        this.resolver = new Resolver(rpc, indexer);
    }
    async getNames(options) {
        return await this.resolver.getNamesOwnedByAddress(this.address, options?.socials, options?.metadata, options?.limit);
    }
}
