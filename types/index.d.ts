import { Name } from "./name.js";
import { Address } from "./address.js";
import algosdk from "algosdk";
export declare class ANS {
  private client;
  private indexer;
  constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer);
  name(name: string): Name;
  address(address: string): Address;
}
