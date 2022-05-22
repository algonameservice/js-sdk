import { Algodv2, Indexer, Transaction } from "algosdk";
export interface NameConstructor {
    rpc: Algodv2;
    indexer: Indexer;
    name: string;
}
export interface AddressConstructor {
    address: string;
    rpc: Algodv2;
    indexer: Indexer;
}
export interface DomainOptions {
    socials?: boolean;
    metadata?: boolean;
    limit?: number;
}
export interface Domain extends NameResponse {
    name: string;
    socials?: Record[];
    metadata?: Record[];
    address: string;
}
export interface RegistrationTxns {
    optinTxn?: {
        txID: string;
        blob: Uint8Array;
    };
    txns: Transaction[];
    unsignedOptinTxn?: Transaction;
}
export interface Record {
    key: string;
    value: string;
}
export interface NameResponse {
    found: boolean;
    address?: string;
    socials?: Record[];
    metadata?: Record[];
}
//# sourceMappingURL=interfaces.d.ts.map