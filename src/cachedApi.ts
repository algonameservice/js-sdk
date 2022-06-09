import algosdk, { LogicSigAccount } from "algosdk";
import { generateTeal } from "./util.js";
import {
  MAINNET_ESCROW,
  APP_ID,
  TESTNET_ESCROW,
  TESTNET_APP_ID,
} from "./constants.js";

export default class CachedApi {
  private cache: { [name: string]: algosdk.LogicSigAccount } = {};

  protected rpc: algosdk.Algodv2;
  protected indexer: algosdk.Indexer;
  protected ESCROW: string = MAINNET_ESCROW;
  protected APP: number = APP_ID;

  constructor(
    client: algosdk.Algodv2,
    indexer: algosdk.Indexer,
    network?: string
  ) {
    this.rpc = client;
    this.indexer = indexer;
    if (network === "testnet") {
      this.ESCROW = TESTNET_ESCROW;
      this.APP = TESTNET_APP_ID;
    }
  }

  protected async getTeal(name: string): Promise<LogicSigAccount> {
    if (name in this.cache) {
      return this.cache[name];
    }

    let program = await this.rpc
      .compile(generateTeal(name as string, this.ESCROW, this.APP))
      .do();
    program = new Uint8Array(Buffer.from(program.result, "base64"));

    this.cache[name] = new algosdk.LogicSigAccount(program);
    return this.cache[name];
  }
}
