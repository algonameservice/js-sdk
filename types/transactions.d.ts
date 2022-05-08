import algosdk from "algosdk";
export declare class Transactions {
  private algodClient;
  private name;
  constructor(client: algosdk.Algodv2, name: string);
  generateLsig(): Promise<algosdk.LogicSigAccount>;
  calculatePrice(period: number): number;
  prepareNameRegistrationTransactions(
    address: string,
    period: number
  ): Promise<{
    optinTxn: {
      txID: string;
      blob: Uint8Array;
    };
    txns: algosdk.Transaction[];
    unsignedOptinTxn: algosdk.Transaction;
  }>;
  prepareUpdateNamePropertyTransactions(
    address: string,
    editedHandles: object
  ): Promise<algosdk.Transaction[]>;
  preparePaymentTxn(
    sender: string,
    receiver: string,
    amt: number,
    note?: any
  ): Promise<algosdk.Transaction>;
  prepareNameRenewalTxns(
    sender: string,
    years: number
  ): Promise<algosdk.Transaction[]>;
  prepareInitiateNameTransferTransaction(
    sender: string,
    newOwner: string,
    price: number
  ): Promise<algosdk.Transaction>;
  prepareAcceptNameTransferTransactions(
    sender: string,
    receiver: string,
    amt: number
  ): Promise<algosdk.Transaction[]>;
}
