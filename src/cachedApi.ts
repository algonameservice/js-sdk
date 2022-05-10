import algosdk, { LogicSigAccount } from "algosdk";
import { generateTeal } from "./util.js";

export default class CachedApi {
  private cache: { [name: string]: algosdk.LogicSigAccount } = {};

  protected rpc: algosdk.Algodv2;
  protected indexer: algosdk.Indexer;

  constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer) {
    this.rpc = client;
    this.indexer = indexer;
  }

  protected async getTeal(name: string): Promise<LogicSigAccount> {
    if (name in this.cache) {
      return this.cache[name];
    }

    let program = await this.rpc.compile(generateTeal(name as string)).do();
    program = new Uint8Array(Buffer.from(program.result, "base64"));

    this.cache[name] = new algosdk.LogicSigAccount(program);
    return this.cache[name];
  }
}
