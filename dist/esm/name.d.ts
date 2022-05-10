import { AddressValidationError, IncorrectOwnerError, InvalidNameError, NameNotRegisteredError } from "./errors.js";
import { NameResponse, NameConstructor, RegistrationTxns } from "./interfaces.js";
import { Transaction } from "algosdk";
import { Record } from "./interfaces.js";
export declare class Name {
    private name;
    private resolver;
    private transactions;
    constructor(options: NameConstructor);
    isRegistered(): Promise<boolean>;
    getOwner(): Promise<string | undefined>;
    getContent(): Promise<string>;
    getText(key: string): Promise<string>;
    getAllInformation(): Promise<NameResponse>;
    getExpiry(): Promise<Date | string>;
    isValidTransaction(sender: string, receiver?: string, method?: string): Promise<boolean | IncorrectOwnerError | InvalidNameError | AddressValidationError | NameNotRegisteredError>;
    register(address: string, period: number): Promise<RegistrationTxns>;
    update(address: string, editedHandles: Record): Promise<Transaction[]>;
    renew(address: string, years: number): Promise<Transaction[]>;
    initTransfer(owner: string, newOwner: string, price: number): Promise<Transaction>;
    acceptTransfer(newOwner: string, owner: string, price: number): Promise<Transaction[]>;
}
//# sourceMappingURL=name.d.ts.map