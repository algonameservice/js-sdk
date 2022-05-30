import { AddressConstructor, Domain, DomainOptions } from "./interfaces.js";
export declare class Address {
    private address;
    private resolver;
    constructor(options: AddressConstructor);
    getNames(options?: DomainOptions): Promise<Domain[]>;
    getDefaultDomain(): Promise<string | Error>;
}
//# sourceMappingURL=address.d.ts.map