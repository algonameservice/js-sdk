import algosdk from "algosdk";
export declare class Transactions {
    private algodClient;
    constructor(client?: any);
    generateLsig(name: string): Promise<algosdk.LogicSigAccount>;
    prepareNameRegistrationTransactions(name: string, address: string, period: number): Promise<{
        optinTxn: {
            txID: string;
            blob: Uint8Array;
        };
        txns: algosdk.Transaction[];
        unsignedOptinTxn: algosdk.Transaction;
    } | undefined>;
    prepareUpdateNamePropertyTransactions(name: string, address: string, editedHandles: any): Promise<algosdk.Transaction[]>;
    preparePaymentTxn(sender: string, receiver: string, amt: number, note?: any): Promise<algosdk.Transaction>;
    prepareNameRenewalTxns(name: string, sender: string, years: number, amt: number): Promise<algosdk.Transaction[]>;
    prepareInitiateNameTransferTransaction(name: string, sender: string, newOwner: string, price: number): Promise<algosdk.Transaction>;
    prepareAcceptNameTransferTransactions(name: string, sender: string, receiver: string, amt: number): Promise<algosdk.Transaction[]>;
}
