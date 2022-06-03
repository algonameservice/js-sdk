import algosdk from "algosdk";
import { generateTeal } from "./util.js";
import { MAINNET_ESCROW, APP_ID, TESTNET_ESCROW, TESTNET_APP_ID } from "./constants.js";
export default class CachedApi {
    cache = {};
    rpc;
    indexer;
    ESCROW = MAINNET_ESCROW;
    APP = APP_ID;
    constructor(client, indexer, network) {
        this.rpc = client;
        this.indexer = indexer;
        if (network === 'testnet') {
            this.ESCROW = TESTNET_ESCROW;
            this.APP = TESTNET_APP_ID;
        }
    }
    async getTeal(name) {
        if (name in this.cache) {
            return this.cache[name];
        }
        let program = await this.rpc.compile(generateTeal(name, this.ESCROW, this.APP)).do();
        program = new Uint8Array(Buffer.from(program.result, "base64"));
        this.cache[name] = new algosdk.LogicSigAccount(program);
        return this.cache[name];
    }
}
//# sourceMappingURL=cachedApi.js.map