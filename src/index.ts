import { AddressValidationError } from "./errors.js";
import { isValidAddress } from "./validation.js";
import { Name } from "./name.js";
import { Address } from "./address.js";
import algosdk from "algosdk";
import { normalizeName } from "./validation.js";

export class ANS {
  private client: algosdk.Algodv2;
  private indexer: algosdk.Indexer;

  constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer) {
    this.client = client;
    this.indexer = indexer;
  }

  name(name: string): Name {
    name = normalizeName(name);
    return new Name({
      client: this.client,
      indexer: this.indexer,
      name: name,
    });
  }

  address(address: string): Address {
    if (!isValidAddress(address)) {
      throw new AddressValidationError();
    }
    return new Address({
      client: this.client,
      indexer: this.indexer,
      address: address,
    });
  }
}
