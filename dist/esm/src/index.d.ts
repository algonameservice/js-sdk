import { Name } from "./name.js";
import { Address } from "./address.js";
import CachedApi from "./cachedApi.js";
export * from './errors.js';
export declare class ANS extends CachedApi {
    name(name: string): Name;
    address(address: string): Address;
}
//# sourceMappingURL=index.d.ts.map