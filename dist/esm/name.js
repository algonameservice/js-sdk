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
import { Transactions } from "./transactions.js";
import { AddressValidationError, IncorrectOwnerError, NameNotRegisteredError, } from "./errors.js";
import { isValidAddress } from "./validation.js";
export class Name {
    constructor(options) {
        const { name, rpc, indexer, network } = options;
        this._name = name;
        this.resolver = new Resolver(rpc, indexer, this, network);
        this.transactions = new Transactions(rpc, indexer, this, network);
    }
    get name() {
        return this._name;
    }
    isRegistered() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.resolver.resolveName();
            return status.found;
        });
    }
    getOwner() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.resolver.owner();
        });
    }
    getValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.resolver.value();
        });
    }
    getContent() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.resolver.content();
        });
    }
    getText(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.resolver.text(key);
        });
    }
    getAllInformation() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.resolver.resolveName();
        });
    }
    getExpiry() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.resolver.expiry();
        });
    }
    isValidTransaction(sender, receiver, method) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isRegistered())) {
                throw new NameNotRegisteredError(this._name);
            }
            if (!isValidAddress(sender)) {
                throw new AddressValidationError();
            }
            if (receiver) {
                if (!isValidAddress(receiver))
                    throw new AddressValidationError();
            }
            const owner = yield this.getOwner();
            if (!(yield isValidAddress(sender))) {
                throw new AddressValidationError();
            }
            if (!receiver && !method) {
                if (owner !== sender) {
                    throw new IncorrectOwnerError(this._name, sender);
                }
            }
            else if (sender && receiver) {
                if (method === "initiate_transfer") {
                    if (owner !== sender) {
                        throw new IncorrectOwnerError(this._name, sender);
                    }
                }
                else if (method === "accept_transfer") {
                    if (owner !== receiver) {
                        throw new IncorrectOwnerError(this._name, receiver);
                    }
                }
            }
            return true;
        });
    }
    register(address, period) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isRegistered()) {
                throw new Error("Name already registered");
            }
            if (!isValidAddress(address)) {
                throw new AddressValidationError();
            }
            return yield this.transactions.prepareNameRegistrationTransactions(address, period);
        });
    }
    update(address, editedHandles) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isValidTransaction(address);
            return yield this.transactions.prepareUpdateNamePropertyTransactions(address, editedHandles);
        });
    }
    renew(address, years) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isValidTransaction(address);
            return yield this.transactions.prepareNameRenewalTxns(address, years);
        });
    }
    setValue(address, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isValidTransaction(address);
            return yield this.transactions.prepareUpdateValueTxn(address, value);
        });
    }
    setDefaultDomain(address) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isValidTransaction(address);
            return yield this.transactions.prepareSetDefaultDomainTxn(address);
        });
    }
    initTransfer(owner, newOwner, price) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isValidTransaction(owner, newOwner, "initiate_transfer");
            return yield this.transactions.prepareInitiateNameTransferTransaction(owner, newOwner, price);
        });
    }
    acceptTransfer(newOwner, owner, price) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isValidTransaction(newOwner, owner, "accept_transfer");
            return yield this.transactions.prepareAcceptNameTransferTransactions(newOwner, owner, price);
        });
    }
}
//# sourceMappingURL=name.js.map