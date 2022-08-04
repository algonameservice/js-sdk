var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import algosdk from "algosdk";
import { generateTeal } from "./util.js";
import { MAINNET_ESCROW, APP_ID, TESTNET_ESCROW, TESTNET_APP_ID, } from "./constants.js";
export default class CachedApi {
    constructor(client, indexer, network, appId) {
        var _a;
        this.cache = {};
        this.ESCROW = MAINNET_ESCROW;
        this.APP = APP_ID;
        this.rpc = client;
        this.indexer = indexer;
        if (network === "testnet") {
            this.ESCROW = (_a = algosdk.getApplicationAddress(appId !== null && appId !== void 0 ? appId : TESTNET_APP_ID)) !== null && _a !== void 0 ? _a : TESTNET_ESCROW;
            this.APP = appId !== null && appId !== void 0 ? appId : TESTNET_APP_ID;
        }
    }
    getTeal(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name in this.cache) {
                return this.cache[name];
            }
            let program = yield this.rpc
                .compile(generateTeal(name, this.ESCROW, this.APP))
                .do();
            program = new Uint8Array(Buffer.from(program.result, "base64"));
            this.cache[name] = new algosdk.LogicSigAccount(program);
            return this.cache[name];
        });
    }
}
//# sourceMappingURL=cachedApi.js.map