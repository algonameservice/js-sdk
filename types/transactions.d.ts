import algosdk from "algosdk";
export declare class Transactions {
    private algodClient;
    constructor(client: algosdk.Algodv2);
    generateLsig(name: string): Promise<algosdk.LogicSigAccount>;
    calculatePrice(name: string, period: number): number;
    prepareNameRegistrationTransactions(name: string, address: string, period: number): Promise<{
        optinTxn: {
            txID: string;
            blob: Uint8Array;
        };
        txns: algosdk.Transaction[];
        unsignedOptinTxn: algosdk.Transaction;
    }>;
    prepareUpdateNamePropertyTransactions(name: string, address: string, editedHandles: object[]): Promise<algosdk.Transaction[]>;
    preparePaymentTxn(sender: string, receiver: string, amt: number, note?: any): Promise<algosdk.Transaction>;
    prepareNameRenewalTxns(name: string, sender: string, years: number): Promise<algosdk.Transaction[]>;
    prepareInitiateNameTransferTransaction(name: string, sender: string, newOwner: string, price: number): Promise<algosdk.Transaction>;
    prepareAcceptNameTransferTransactions(name: string, sender: string, receiver: string, amt: number): Promise<algosdk.Transaction[]>;
}
