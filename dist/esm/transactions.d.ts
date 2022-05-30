import algosdk, { Transaction } from "algosdk";
import CachedApi from "./cachedApi.js";
import { RegistrationTxns } from "./interfaces.js";
import { Record } from "./interfaces.js";
import { Name } from "./name.js";
export declare class Transactions extends CachedApi {
    private name;
    constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer, name: Name | string);
    calculatePrice(period: number): number;
    prepareNameRegistrationTransactions(address: string, period: number): Promise<RegistrationTxns>;
    prepareUpdateNamePropertyTransactions(address: string, editedHandles: Record): Promise<Transaction[]>;
    prepareNameRenewalTxns(sender: string, years: number): Promise<Transaction[]>;
    prepareUpdateValueTxn(address: string, value: string): Promise<algosdk.Transaction>;
    prepareInitiateNameTransferTransaction(sender: string, newOwner: string, price: number): Promise<Transaction>;
    prepareAcceptNameTransferTransactions(sender: string, receiver: string, amt: number): Promise<Transaction[]>;
}
//# sourceMappingURL=transactions.d.ts.map