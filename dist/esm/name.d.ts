import { AddressValidationError, IncorrectOwnerError, InvalidNameError, NameNotRegisteredError } from "./errors.js";
import { NameResponse, NameConstructor, RegistrationTxns } from "./interfaces.js";
import { Transaction } from "algosdk";
import { Record } from "./interfaces.js";
export declare class Name {
    private resolver;
    private transactions;
    private _name;
    constructor(options: NameConstructor);
    get name(): string;
    isRegistered(): Promise<boolean>;
    getOwner(): Promise<string>;
    getValue(): Promise<string>;
    getContent(): Promise<string>;
    getText(key: string): Promise<string>;
    getAllInformation(): Promise<NameResponse>;
    getExpiry(): Promise<Date>;
    isValidTransaction(sender: string, receiver?: string, method?: string): Promise<boolean | IncorrectOwnerError | InvalidNameError | AddressValidationError | NameNotRegisteredError>;
    register(address: string, period: number): Promise<RegistrationTxns>;
    update(address: string, editedHandles: Record): Promise<Transaction[]>;
    renew(address: string, years: number): Promise<Transaction[]>;
    setValue(address: string, value: string): Promise<Transaction>;
    initTransfer(owner: string, newOwner: string, price: number): Promise<Transaction>;
    acceptTransfer(newOwner: string, owner: string, price: number): Promise<Transaction[]>;
}
//# sourceMappingURL=name.d.ts.map