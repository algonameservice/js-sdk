import algosdk from "algosdk";
export declare class Resolver {
    private algodClient;
    private indexerClient;
    constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer);
    generateLsig(name: string): Promise<algosdk.LogicSigAccount>;
    resolveName(name: string): Promise<{
        found: boolean;
        address: any;
        socials: any;
        metadata: any;
    } | {
        found: boolean;
        address?: undefined;
        socials?: undefined;
        metadata?: undefined;
    }>;
    getNamesOwnedByAddress(address: string, socials?: boolean, metadata?: boolean, limit?: number): Promise<false | any[] | undefined>;
    filterKvPairs(kvPairs: any, type: string): {
        key: any;
        value: any;
    }[] | undefined;
    decodeKvPairs(kvPairs: any): any;
    filterDomainRegistrationTxns(txns: any): Promise<any>;
    owner(name: string): Promise<any>;
    text(name: string, key: string): Promise<any>;
    expiry(name: string): Promise<Date | "Not Registered">;
    content(name: string): Promise<void>;
}
