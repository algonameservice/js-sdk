import {
  AddressValidationError,
  InvalidNameError,
} from "./errors.js";
import { isValidAddress, isValidName } from "./validation.js";
import { Name } from './name.js';
import { Address } from "./address.js";

export class ANS {
  private client: any;
  private indexer: any;

  constructor(client: any, indexer: any) {
    this.client = client;
    this.indexer = indexer;
  }

  name(name: string): Name {
    if (name.length > 0) {
      name = name.toLowerCase();
    }
    name = name.split(".algo")[0];
    if (!isValidName(name)) {
      throw new InvalidNameError();
    }
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
