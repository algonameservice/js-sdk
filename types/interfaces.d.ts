import algosdk from "algosdk";
export declare type NameConstructor = {
    client: algosdk.Algodv2;
    indexer: algosdk.Indexer;
    name: string;
};
export declare type AddressConstructor = {
    address: string;
    client: algosdk.Algodv2;
    indexer: algosdk.Indexer;
};
export declare type DomainInformation = {
    found: boolean;
    address?: string;
    socials?: object[] | [];
    metadata?: object[] | [];
};
export declare type DomainOptions = {
    socials?: boolean;
    metadata?: boolean;
    limit?: number;
};
export declare type Domains = {
    name: string;
    socials?: object[] | [];
    metadata?: object[] | [];
};
export declare type RegistrationTxns = {
    optinTxn?: object;
    txns: object[];
    unsignedOptinTxn?: object;
};
