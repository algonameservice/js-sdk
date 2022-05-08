import algosdk from "algosdk";
export declare class Resolver {
  private algodClient;
  private indexerClient;
  private cache;
  private name;
  constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer, name?: string);
  isCacheSet(name?: string): boolean;
  generateLsig(name?: string): Promise<algosdk.LogicSigAccount>;
  resolveName(name?: string): Promise<any>;
  getNamesOwnedByAddress(
    address: string,
    socials?: boolean,
    metadata?: boolean,
    limit?: number
  ): Promise<false | any[] | undefined>;
  filterKvPairs(
    kvPairs: any,
    type: string
  ):
    | {
        key: any;
        value: any;
      }[]
    | undefined;
  decodeKvPairs(kvPairs: any): any;
  filterDomainRegistrationTxns(txns: any): Promise<any>;
  owner(): Promise<any>;
  text(key: string): Promise<any>;
  expiry(): Promise<Date | "Not Registered">;
  content(): Promise<string>;
}
