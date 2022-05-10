import algosdk from "algosdk";
import { generateTeal } from "./util.js";
export default class CachedApi {
    constructor(client, indexer) {
        this.cache = {};
        this.rpc = client;
        this.indexer = indexer;
    }
    async getTeal(name) {
        if (name in this.cache) {
            return this.cache[name];
        }
        let program = await this.rpc.compile(generateTeal(name)).do();
        program = new Uint8Array(Buffer.from(program.result, "base64"));
        this.cache[name] = new algosdk.LogicSigAccount(program);
        return this.cache[name];
    }
}
