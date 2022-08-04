import { AddressValidationError } from "./errors.js";
import { isValidAddress, normalizeName } from "./validation.js";
import { Name } from "./name.js";
import { Address } from "./address.js";
import CachedApi from "./cachedApi.js";
import algosdk from "algosdk";

export { Resolver } from "./resolver.js";
export { Transactions } from "./transactions.js";
export * from "./errors.js";

export class ANS extends CachedApi {
  protected network = "mainnet";

  constructor(
    client: algosdk.Algodv2,
    indexer: algosdk.Indexer,
    network?: string,
    appId?: number
  ) {
    super(client, indexer, network, appId);
    if (network === "testnet") {
      this.network = "testnet";
    }
  }

  name(name: string): Name {
    name = normalizeName(name);
    return new Name({
      rpc: this.rpc,
      indexer: this.indexer,
      name,
      network: this.network,
      app: this.APP
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
      network: this.network,
      app: this.APP
    });
  }
}
