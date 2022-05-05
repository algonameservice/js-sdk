import { Resolver } from "./classes/resolver";
import { Transactions } from "./classes/transactions";
import { ASCII_CODES, REGISTRATION_PRICE } from "./constants";
import algosdk from "algosdk";
import {
  AddressValidationError,
  IncorrectOwnerError,
  InvalidNameError,
  NameNotRegisteredError,
} from "./classes/errors";
import { NameConstructor, AddressConstructor, DomainInformation, Domains, DomainOptions } from "./interfaces/interfaces";

class Name {
  private name = '';
  private resolver: any;
  private transactions:any;
  constructor(options: NameConstructor) {
    const {name, client, indexer} = options;    
    this.name = name;
    this.resolver = new Resolver(client, indexer);
    this.transactions = new Transactions(client);
  }

  async isRegistered():Promise<boolean> {
    return await this.resolver.resolveName(this.name).found;
  }

  //GET METHODS
  async getOwner():Promise<string> {
    return await this.resolver.owner(this.name);
  }

  async getContent ():Promise<string> {
    return await this.resolver.content(this.name);
  }

  async getText(key:string):Promise<string> {
    return await this.resolver.text(this.name, key);
  }

  async getAllInformation():Promise<DomainInformation> {
    return await this.resolver.resolveName(this.name);
  }

  async getExpiry():Promise<Date | string>{
    return await this.resolver.expiry(this.name);
  }

  async register(address: string, period:number) {
    //TODO: Return registration txns
  }

}

class Address {
  private address = '';
  private resolver: any;
  constructor(options: AddressConstructor) {
    const {address, client, indexer} = options;
    this.address = address;
    this.resolver = new Resolver(client, indexer);
  }

  async getNames(options?: DomainOptions): Promise<Domains | []> {
    const socials = options?.socials || false, metadata = options?.metadata || false, limit = options?.metadata;
    return await this.resolver.getNamesOwnedByAddress(this.address, socials, metadata, limit);
  }
}

export class ANS {
  private resolver: any;
  private transactionsInstance: any;
  private client: any;
  private indexer:any;

  constructor(client: any, indexer: any) {
    this.resolver = new Resolver(client, indexer);
    this.transactionsInstance = new Transactions(client);
    this.client = client;
    this.indexer = indexer;
  }

  isValidAddress (address: string): boolean{
    return algosdk.isValidAddress(address);
  }

  isValidName (name: any): boolean {
    name = name.split(".algo")[0];
    const lengthOfName = name.length;
    for (let i = 0; i < lengthOfName; i++) {
      if (
        !(
          name.charCodeAt(i) >= ASCII_CODES.ASCII_0 &&
          name.charCodeAt(i) <= ASCII_CODES.ASCII_9
        )
      ) {
        if (
          !(
            name.charCodeAt(i) >= ASCII_CODES.ASCII_A &&
            name.charCodeAt(i) <= ASCII_CODES.ASCII_Z
          )
        )
          return false;
      }
    }
    return true;
  }

  name(name:string) : Name {
    if(name.length > 0) name = name.toLowerCase();
    if (!(this.isValidName(name))) throw new InvalidNameError();
    return new Name({
      client: this.client,
      indexer: this.indexer,
      resolver: this.resolver,
      name: name
    })
  }

  address(address: string): Address {
    if(!this.isValidAddress(address)) throw new AddressValidationError();
    return new Address({
      client: this.client,
      indexer: this.indexer,
      resolver: this.resolver,
      address: address
    })
  }

  /*
  async isValidTransaction (
    name: string,
    sender: string,
    receiver?: string,
    method?: string
  ) {
    name = name.split(".algo")[0];
    if (!(await this.isValidName(name))) return;
    if (!(await this.isValidAddress(sender)))
      throw new AddressValidationError();
    if (!receiver && !method) {
      const nameInfo: any = await this.resolveName(name);
      if (nameInfo["found"]) {
        if (nameInfo["address"] !== sender)
          throw new IncorrectOwnerError(name, sender);
      }
    } else if (sender && receiver) {
      if (method === "initiate_transfer") {
        const nameInfo: any = await this.resolveName(name);
        if (nameInfo["found"]) {
          if (nameInfo["address"] !== sender)
            throw new IncorrectOwnerError(name, sender);
        }
      } else if (method === "accept_transfer") {
        const nameInfo: any = await this.resolveName(name);
        if (nameInfo["found"]) {
          if (nameInfo["address"] !== receiver)
            throw new IncorrectOwnerError(name, sender);
        }
      }
    }
    return true;
  }

  async resolveName (name: string) {
    if (!(await this.isValidName(name))) return;
    return await this.resolverInstance.resolveName(name);
  }

  async getNamesOwnedByAddress (
    account: string,
    socials?: boolean,
    metadata?: boolean,
    limit?: number
  ) {
    if (!(await this.isValidAddress(account)))
      throw new AddressValidationError();
    return await this.resolverInstance.getNamesOwnedByAddress(
      account,
      socials,
      metadata,
      limit
    );
    
  }

  async prepareNameRegistrationTransactions (
    name: string,
    address: string,
    period: number
  ) {
    await this.isValidName(name);
    if (!(await this.isValidAddress(address)))
      throw new AddressValidationError();
    const nameInfo: any = await this.resolveName(name);
    if (nameInfo["found"]) throw new Error("Name already registered");
    try {
      return await this.transactionsInstance.prepareNameRegistrationTransactions(
          name,
          address,
          period
        );

    } catch (err: any) {
      return err.message;
    }
  }

  async prepareUpdateNamePropertyTransactions(
    name: string,
    address: string,
    editedHandles: any
  ) {
    await this.isValidTransaction(name, address);
    const nameInfo: any = await this.resolveName(name);
    if (!nameInfo["found"]) throw new NameNotRegisteredError(name);
    try {
      return await this.transactionsInstance.prepareUpdateNamePropertyTransactions(
          name,
          address,
          editedHandles
        );
    } catch (err: any) {
      return err.message;
    }
  }

  async preparePaymentTxn (
    sender: string,
    receiver: string,
    amt: number,
    note?: any
  ) {
    try {
      return await this.transactionsInstance.preparePaymentTxn(
        sender,
        receiver,
        amt,
        note
      );
    } catch (err: any) {
      return err.message;
    }
  }

  async prepareNameRenewalTransactions (
    name: string,
    sender: string,
    years: number
  ){
    await this.isValidTransaction(name, sender);
    const nameInfo: any = await this.resolveName(name);
    if (!nameInfo["found"]) throw new NameNotRegisteredError(name);
    try {
      let amt = 0;
      name = name.split(".algo")[0];
      if (name.length < 3) return;
      if (name.length === 3) amt = REGISTRATION_PRICE.CHAR_3_AMOUNT * years;
      else if (name.length === 4) amt = REGISTRATION_PRICE.CHAR_4_AMOUNT * years;
      else if (name.length >= 5) amt = REGISTRATION_PRICE.CHAR_5_AMOUNT * years;
      return await this.transactionsInstance.prepareNameRenewalTxns(
        name,
        sender,
        years,
        amt
      );
    } catch (err: any) {
      return err.message;
    }
  }

  async prepareInitiateNameTransferTransaction (
    name: string,
    sender: string,
    newOwner: string,
    price: number
  ) {
    await this.isValidTransaction(name, sender, newOwner, "initiate_transfer");
    const nameInfo: any = await this.resolveName(name);
    if (!nameInfo["found"]) throw new NameNotRegisteredError(name);
    try {
      return await this.transactionsInstance.prepareInitiateNameTransferTransaction(
          name,
          sender,
          newOwner,
          price
        );
    } catch (err: any) {
      return err.message;
    }
  }

  async prepareAcceptNameTransferTransactions (
    name: string,
    sender: string,
    receiver: string,
    amt: number
  ) {
    await this.isValidTransaction(name, sender, receiver, "accept_transfer");
    const nameInfo: any = await this.resolveName(name);
    if (!nameInfo["found"]) throw new NameNotRegisteredError(name);
    try {
      return await this.transactionsInstance.prepareAcceptNameTransferTransactions(
          name,
          sender,
          receiver,
          amt
        );
    } catch (err: any) {
      return err.message;
    }
  }
  */
}
