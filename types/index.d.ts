import { AddressValidationError, IncorrectOwnerError, InvalidNameError, NameNotRegisteredError } from "./classes/errors";
import { NameConstructor, AddressConstructor, DomainInformation, Domains, DomainOptions, RegistrationTxns } from "./interfaces/interfaces";
declare class Name {
    private name;
    private resolver;
    private transactions;
    constructor(options: NameConstructor);
    isRegistered(): Promise<boolean>;
    getOwner(): Promise<string>;
    getContent(): Promise<string>;
    getText(key: string): Promise<string>;
    getAllInformation(): Promise<DomainInformation>;
    getExpiry(): Promise<Date | string>;
    isValidTransaction(sender: string, receiver?: string, method?: string): Promise<boolean | IncorrectOwnerError | InvalidNameError | AddressValidationError | NameNotRegisteredError>;
    register(address: string, period: number): Promise<RegistrationTxns>;
    update(address: string, editedHandles: object[]): Promise<object[]>;
    renew(address: string, years: number): Promise<object[]>;
    initTransfer(owner: string, newOwner: string, price: number): Promise<object>;
    acceptTransfer(newOwner: string, owner: string, price: number): Promise<object[]>;
}
declare class Address {
    private address;
    private resolver;
    constructor(options: AddressConstructor);
    getNames(options?: DomainOptions): Promise<Domains | []>;
}
export declare class ANS {
    private client;
    private indexer;
    constructor(client: any, indexer: any);
    name(name: string): Name;
    address(address: string): Address;
}
export {};
