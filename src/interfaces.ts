import algosdk from "algosdk";

export type NameConstructor = {
  client: algosdk.Algodv2;
  indexer: algosdk.Indexer;
  name: string;
};

export type AddressConstructor = {
  address: string;
  client: algosdk.Algodv2;
  indexer: algosdk.Indexer;
};

export type DomainInformation = {
  found: boolean;
  address?: string;
  socials?: object[] | [];
  metadata?: object[] | [];
};

export type DomainOptions = {
  socials?: boolean;
  metadata?: boolean;
  limit?: number;
};

export type Domains = {
  name: string;
  socials?: object[] | [];
  metadata?: object[] | [];
};

export type RegistrationTxns = {
  optinTxn?: object;
  txns: object[];
  unsignedOptinTxn?: object;
};
