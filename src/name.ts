import { Resolver } from "./resolver.js";
import { Transactions } from "./transactions.js";
import {
  AddressValidationError,
  IncorrectOwnerError,
  InvalidNameError,
  NameNotRegisteredError,
} from "./errors.js";
import {
  NameConstructor,
  DomainInformation,
  RegistrationTxns,
} from "./interfaces.js";
import { isValidAddress, isValidName } from "./validation.js";

export class Name {
  private name = "";
  private resolver: Resolver;
  private transactions: Transactions;
  constructor(options: NameConstructor) {
    const { name, client, indexer } = options;
    this.name = name;
    this.resolver = new Resolver(client, indexer);
    this.transactions = new Transactions(client);
  }

  async isRegistered(): Promise<boolean> {
    const status = await this.resolver.resolveName(this.name);
    return status.found;
  }

  async getOwner(): Promise<string> {
    return await this.resolver.owner(this.name);
  }

  async getContent(): Promise<string> {
    return await this.resolver.content(this.name);
  }

  async getText(key: string): Promise<string> {
    return await this.resolver.text(this.name, key);
  }

  async getAllInformation(): Promise<DomainInformation> {
    return await this.resolver.resolveName(this.name);
  }

  async getExpiry(): Promise<Date | string> {
    return await this.resolver.expiry(this.name);
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
    const owner: string = await this.getOwner();
    if (!(await isValidName(this.name))) {
      throw new InvalidNameError();
    }
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
    } 
    else {
      return await this.transactions.prepareNameRegistrationTransactions(
        this.name,
        address,
        period
      );
    }
  }

  async update(address: string, editedHandles: object[]): Promise<object[]> {
    await this.isValidTransaction(address);
    return await this.transactions.prepareUpdateNamePropertyTransactions(
      this.name,
      address,
      editedHandles
    );
  }

  async renew(address: string, years: number): Promise<object[]> {
    await this.isValidTransaction(address);
    return await this.transactions.prepareNameRenewalTxns(
      this.name,
      address,
      years
    );
  }

  async initTransfer(
    owner: string,
    newOwner: string,
    price: number
  ): Promise<object> {
    await this.isValidTransaction(owner, newOwner, "initiate_transfer");
    return await this.transactions.prepareInitiateNameTransferTransaction(
      this.name,
      owner,
      newOwner,
      price
    );
  }

  async acceptTransfer(
    newOwner: string,
    owner: string,
    price: number
  ): Promise<object[]> {
    await this.isValidTransaction(newOwner, owner, "accept_transfer");
    return await this.transactions.prepareAcceptNameTransferTransactions(
      this.name,
      newOwner,
      owner,
      price
    );
  }
}