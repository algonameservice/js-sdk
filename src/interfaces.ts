import algosdk from "algosdk";

export interface NameConstructor {
  rpc: algosdk.Algodv2;
  indexer: algosdk.Indexer;
  name: string;
}

export interface AddressConstructor {
  address: string;
  rpc: algosdk.Algodv2;
  indexer: algosdk.Indexer;
}

export interface DomainInformation {
  found: boolean;
  address?: string;
  socials?: object[] | [];
  metadata?: object[] | [];
}

export interface DomainOptions {
  socials?: boolean;
  metadata?: boolean;
  limit?: number;
}

export interface Domain extends NameResponse {
  name: string;
}

export interface RegistrationTxns {
  optinTxn?: object;
  txns: object[];
  unsignedOptinTxn?: object;
}

export interface Record {
  key: string;
  value: string;
}

export interface NameResponse {
  found: boolean;
  address: string;
  socials?: Record[];
  metadata?: Record[];
}
