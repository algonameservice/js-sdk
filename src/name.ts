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
  private name: string;
  private resolver: Resolver;
  private transactions: Transactions;
  constructor(options: NameConstructor) {
    const { name, rpc, indexer } = options;
    this.name = name;
    this.resolver = new Resolver(rpc, indexer, name);
    this.transactions = new Transactions(rpc, indexer, name);
  }

  async isRegistered(): Promise<boolean> {
    const status: NameResponse = await this.resolver.resolveName();
    return status.found;
  }

  async getOwner(): Promise<string | NameNotRegisteredError> {
    return await this.resolver.owner();
  }

  async getContent(): Promise<string | NameNotRegisteredError> {
    return await this.resolver.content();
  }

  async getText(key: string): Promise<string | NameNotRegisteredError> {
    return await this.resolver.text(key);
  }

  async getAllInformation(): Promise<NameResponse> {
    return await this.resolver.resolveName();
  }

  async getExpiry(): Promise<Date | NameNotRegisteredError> {
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
      throw new NameNotRegisteredError(this.name);
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
        throw new IncorrectOwnerError(this.name, sender);
      }
    } else if (sender && receiver) {
      if (method === "initiate_transfer") {
        if (owner !== sender) {
          throw new IncorrectOwnerError(this.name, sender);
        }
      } else if (method === "accept_transfer") {
        if (owner !== receiver) {
          throw new IncorrectOwnerError(this.name, receiver);
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
    } else {
      return await this.transactions.prepareNameRegistrationTransactions(
        address,
        period
      );
    }
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
