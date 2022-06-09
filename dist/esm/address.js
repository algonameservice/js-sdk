var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Resolver } from "./resolver.js";
export class Address {
    constructor(options) {
        const { address, rpc, indexer, network } = options;
        this.address = address;
        this.resolver = new Resolver(rpc, indexer, undefined, network);
    }
    getNames(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.resolver.getNamesOwnedByAddress(this.address, options === null || options === void 0 ? void 0 : options.socials, options === null || options === void 0 ? void 0 : options.metadata, options === null || options === void 0 ? void 0 : options.limit);
        });
    }
    getDefaultDomain() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.resolver.getDefaultDomain(this.address);
        });
    }
}
//# sourceMappingURL=address.js.map