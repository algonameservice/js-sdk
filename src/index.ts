import { AddressValidationError } from "./errors.js";
import { isValidAddress, normalizeName } from "./validation.js";
import { Name } from "./name.js";
import { Address } from "./address.js";
import algosdk from "algosdk";
import CachedApi from "./cachedApi.js";

export class ANS extends CachedApi {
  constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer) {
    super(client, indexer);
    this.indexer = indexer;
  }

  name(name: string): Name {
    name = normalizeName(name);
    return new Name({
      rpc: this.rpc,
      indexer: this.indexer,
      name,
    });
  }

  address(address: string): Address {
    if (!isValidAddress(address)) {
      throw new AddressValidationError();
    }
    return new Address({
      rpc: this.rpc,
      indexer: this.indexer,
      address,
    });
  }
}
