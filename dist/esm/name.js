import { Resolver } from "./resolver.js";
import { Transactions } from "./transactions.js";
import { AddressValidationError, IncorrectOwnerError, NameNotRegisteredError, } from "./errors.js";
import { isValidAddress } from "./validation.js";
export class Name {
    resolver;
    transactions;
    _name;
    constructor(options) {
        const { name, rpc, indexer } = options;
        this._name = name;
        this.resolver = new Resolver(rpc, indexer, this);
        this.transactions = new Transactions(rpc, indexer, this);
    }
    get name() {
        return this._name;
    }
    async isRegistered() {
        const status = await this.resolver.resolveName();
        return status.found;
    }
    async getOwner() {
        return await this.resolver.owner();
    }
    async getContent() {
        return await this.resolver.content();
    }
    async getText(key) {
        return await this.resolver.text(key);
    }
    async getAllInformation() {
        return await this.resolver.resolveName();
    }
    async getExpiry() {
        return await this.resolver.expiry();
    }
    async isValidTransaction(sender, receiver, method) {
        if (!(await this.isRegistered())) {
            throw new NameNotRegisteredError(this._name);
        }
        if (!isValidAddress(sender)) {
            throw new AddressValidationError();
        }
        if (receiver) {
            if (!isValidAddress(receiver))
                throw new AddressValidationError();
        }
        const owner = await this.getOwner();
        if (!(await isValidAddress(sender))) {
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
    }
    async register(address, period) {
        if (await this.isRegistered()) {
            throw new Error("Name already registered");
        }
        if (!isValidAddress(address)) {
            throw new AddressValidationError();
        }
        return await this.transactions.prepareNameRegistrationTransactions(address, period);
    }
    async update(address, editedHandles) {
        await this.isValidTransaction(address);
        return await this.transactions.prepareUpdateNamePropertyTransactions(address, editedHandles);
    }
    async renew(address, years) {
        await this.isValidTransaction(address);
        return await this.transactions.prepareNameRenewalTxns(address, years);
    }
    async initTransfer(owner, newOwner, price) {
        await this.isValidTransaction(owner, newOwner, "initiate_transfer");
        return await this.transactions.prepareInitiateNameTransferTransaction(owner, newOwner, price);
    }
    async acceptTransfer(newOwner, owner, price) {
        await this.isValidTransaction(newOwner, owner, "accept_transfer");
        return await this.transactions.prepareAcceptNameTransferTransactions(newOwner, owner, price);
    }
}
//# sourceMappingURL=name.js.map