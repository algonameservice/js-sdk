import { Resolver } from "./classes/resolver";
import { Transactions } from "./classes/transactions";
import {
  AddressValidationError,
  IncorrectOwnerError,
  InvalidNameError,
  NameNotRegisteredError,
} from "./classes/errors";
import {
  NameConstructor,
  AddressConstructor,
  DomainInformation,
  Domains,
  DomainOptions,
  RegistrationTxns,
} from "./interfaces/interfaces";
import { isValidAddress, isValidName } from "./utility/common";

class Name {
  private name = "";
  private resolver: any;
  private transactions: any;
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
    if (!(await this.isRegistered()))
      throw new NameNotRegisteredError(this.name);
    if (!isValidAddress(sender)) throw new AddressValidationError();
    if (receiver) {
      if (!isValidAddress(receiver)) throw new AddressValidationError();
    }
    const owner: string = await this.getOwner();
    if (!(await isValidName(this.name))) throw new InvalidNameError();
    if (!(await isValidAddress(sender))) throw new AddressValidationError();
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
    if (await this.isRegistered()) throw new Error("Name already registered");
    if (!isValidAddress(address)) throw new AddressValidationError();
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

class Address {
  private address = "";
  private resolver: any;
  constructor(options: AddressConstructor) {
    const { address, client, indexer } = options;
    this.address = address;
    this.resolver = new Resolver(client, indexer);
  }

  async getNames(options?: DomainOptions): Promise<Domains | []> {
    const socials = options?.socials || false,
      metadata = options?.metadata || false,
      limit = options?.metadata;
    return await this.resolver.getNamesOwnedByAddress(
      this.address,
      socials,
      metadata,
      limit
    );
  }
}

export class ANS {
  private client: any;
  private indexer: any;

  constructor(client: any, indexer: any) {
    this.client = client;
    this.indexer = indexer;
  }

  name(name: string): Name {
    if (name.length > 0) name = name.toLowerCase();
    name = name.split(".algo")[0];
    if (!isValidName(name)) throw new InvalidNameError();
    return new Name({
      client: this.client,
      indexer: this.indexer,
      name: name,
    });
  }

  address(address: string): Address {
    if (!isValidAddress(address)) throw new AddressValidationError();
    return new Address({
      client: this.client,
      indexer: this.indexer,
      address: address,
    });
  }
}
