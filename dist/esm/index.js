import { AddressValidationError } from "./errors.js";
import { isValidAddress, normalizeName } from "./validation.js";
import { Name } from "./name.js";
import { Address } from "./address.js";
import CachedApi from "./cachedApi.js";
export { Resolver } from "./resolver.js";
export { Transactions } from "./transactions.js";
export * from "./errors.js";
export default class ANS extends CachedApi {
    name(name) {
        name = normalizeName(name);
        return new Name({
            rpc: this.rpc,
            indexer: this.indexer,
            name,
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
        });
    }
}
//# sourceMappingURL=index.js.map