import { AddressValidationError } from "./errors.js";
import { isValidAddress, normalizeName } from "./validation.js";
import { Name } from "./name.js";
import { Address } from "./address.js";
import CachedApi from "./cachedApi.js";
export { Resolver } from "./resolver.js";
export { Transactions } from "./transactions.js";
export * from "./errors.js";
export class ANS extends CachedApi {
    constructor(client, indexer, network) {
        super(client, indexer, network);
        this.network = "mainnet";
        if (network === "testnet") {
            this.network = "testnet";
        }
    }
    name(name) {
        name = normalizeName(name);
        return new Name({
            rpc: this.rpc,
            indexer: this.indexer,
            name,
            network: this.network,
        });
    }
    address(address) {
        if (!isValidAddress(address)) {
            throw new AddressValidationError();
        }
        return new Address({
            rpc: this.rpc,
            indexer: this.indexer,
            address,
            network: this.network,
        });
    }
}
//# sourceMappingURL=index.js.map