import { Resolver } from "./resolver.js";
import { AddressConstructor, Domain, DomainOptions } from "./interfaces.js";

export class Address {
  private address: string;
  private resolver: Resolver;

  constructor(options: AddressConstructor) {
    const { address, rpc, indexer } = options;
    this.address = address;
    this.resolver = new Resolver(rpc, indexer);
  }

  async getNames(options?: DomainOptions): Promise<Domain[]> {
    return await this.resolver.getNamesOwnedByAddress(
      this.address,
      options?.socials,
      options?.metadata,
      options?.limit
    );
  }
}
