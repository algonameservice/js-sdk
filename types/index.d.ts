export declare class AnsResolver {
    private resolverInstance;
    private transactionsInstance;
    constructor(client: any, indexer: any);
    isValidAddress(address: string): Promise<boolean>;
    isValidName(name: any): Promise<boolean>;
    isValidTransaction(name: string, sender: string, receiver?: string, method?: string): Promise<true | undefined>;
    resolveName(name: string): Promise<any>;
    getNamesOwnedByAddress(account: string, socials?: boolean, metadata?: boolean, limit?: number): Promise<any>;
    prepareNameRegistrationTransactions(name: string, address: string, period: number): Promise<any>;
    prepareUpdateNamePropertyTransactions(name: string, address: string, editedHandles: any): Promise<any>;
    preparePaymentTxn(sender: string, receiver: string, amt: number, note?: any): Promise<any>;
    prepareNameRenewalTransactions(name: string, sender: string, years: number): Promise<any>;
    prepareInitiateNameTransferTransaction(name: string, sender: string, newOwner: string, price: number): Promise<any>;
    prepareAcceptNameTransferTransactions(name: string, sender: string, receiver: string, amt: number): Promise<any>;
}
