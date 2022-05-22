import { AddressConstructor, Domain, DomainOptions } from "./interfaces.js";
export declare class Address {
    private address;
    private resolver;
    constructor(options: AddressConstructor);
    getNames(options?: DomainOptions): Promise<Domain[]>;
}
//# sourceMappingURL=address.d.ts.map