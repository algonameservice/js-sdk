import { Name } from "./name.js";
import { Address } from "./address.js";
import CachedApi from "./cachedApi.js";
export { Resolver } from "./resolver.js";
export { Transactions } from "./transactions.js";
export * from "./errors.js";
export default class ANS extends CachedApi {
    name(name: string): Name;
    address(address: string): Address;
}
//# sourceMappingURL=index.d.ts.map