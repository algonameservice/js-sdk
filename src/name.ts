import { Resolver } from "./resolver.js";
import { Transactions } from "./transactions.js";
import {
  AddressValidationError,
  IncorrectOwnerError,
  InvalidNameError,
  NameNotRegisteredError,
} from "./errors.js";
import {
  NameResponse,
  NameConstructor,
  RegistrationTxns,
} from "./interfaces.js";
import { isValidAddress } from "./validation.js";
import { Transaction } from "algosdk";
import { Record } from "./interfaces.js";

export class Name {
  private resolver: Resolver;
  private transactions: Transactions;
  private _name: string;

  constructor(options: NameConstructor) {
    const { name, rpc, indexer, network } = options;
    this._name = name;
    this.resolver = new Resolver(rpc, indexer, this, network);
    this.transactions = new Transactions(rpc, indexer, this, network);
  }

  get name(): string {
    return this._name;
  }

  async isRegistered(): Promise<boolean> {
    const status: NameResponse = await this.resolver.resolveName();
    return status.found;
  }

  async getOwner(): Promise<string> {
    return await this.resolver.owner();
  }

  async getValue(): Promise<string> {
    return await this.resolver.value();
  }

  async getContent(): Promise<string> {
    return await this.resolver.content();
  }

  async getText(key: string): Promise<string> {
    return await this.resolver.text(key);
  }

  async getAllInformation(): Promise<NameResponse> {
    return await this.resolver.resolveName();
  }

  async getExpiry(): Promise<Date> {
    return await this.resolver.expiry();
  }

  async isValidTransaction(
    sender: string,
    receiver?: string,
    method?: string
  ): Promise<
    | boolean
    | IncorrectOwnerError
    | InvalidNameError
    | AddressValidationError
    | NameNotRegisteredError
  > {
    if (!(await this.isRegistered())) {
      throw new NameNotRegisteredError(this._name);
    }
    if (!isValidAddress(sender)) {
      throw new AddressValidationError();
    }
    if (receiver) {
      if (!isValidAddress(receiver)) throw new AddressValidationError();
    }
    const owner: string | NameNotRegisteredError = await this.getOwner();

    if (!(await isValidAddress(sender))) {
      throw new AddressValidationError();
    }
    if (!receiver && !method) {
      if (owner !== sender) {
        throw new IncorrectOwnerError(this._name, sender);
      }
    } else if (sender && receiver) {
      if (method === "initiate_transfer") {
        if (owner !== sender) {
          throw new IncorrectOwnerError(this._name, sender);
        }
      } else if (method === "accept_transfer") {
        if (owner !== receiver) {
          throw new IncorrectOwnerError(this._name, receiver);
        }
      }
    }
    return true;
  }

  async register(address: string, period: number): Promise<RegistrationTxns> {
    if (await this.isRegistered()) {
      throw new Error("Name already registered");
    }
    if (!isValidAddress(address)) {
      throw new AddressValidationError();
    }

    return await this.transactions.prepareNameRegistrationTransactions(
      address,
      period
    );
  }

  async update(address: string, editedHandles: Record): Promise<Transaction[]> {
    await this.isValidTransaction(address);
    return await this.transactions.prepareUpdateNamePropertyTransactions(
      address,
      editedHandles
    );
  }

  async renew(address: string, years: number): Promise<Transaction[]> {
    await this.isValidTransaction(address);
    return await this.transactions.prepareNameRenewalTxns(address, years);
  }

  async setValue(address: string, value: string): Promise<Transaction> {
    await this.isValidTransaction(address);
    return await this.transactions.prepareUpdateValueTxn(address, value);
  }

  async setDefaultDomain(address: string): Promise<Transaction> {
    await this.isValidTransaction(address);
    return await this.transactions.prepareSetDefaultDomainTxn(address);
  }

  async initTransfer(
    owner: string,
    newOwner: string,
    price: number
  ): Promise<Transaction> {
    await this.isValidTransaction(owner, newOwner, "initiate_transfer");
    return await this.transactions.prepareInitiateNameTransferTransaction(
      owner,
      newOwner,
      price
    );
  }

  async acceptTransfer(
    newOwner: string,
    owner: string,
    price: number
  ): Promise<Transaction[]> {
    await this.isValidTransaction(newOwner, owner, "accept_transfer");
    return await this.transactions.prepareAcceptNameTransferTransactions(
      newOwner,
      owner,
      price
    );
  }
}
