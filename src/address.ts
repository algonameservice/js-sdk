import { Resolver } from "./resolver.js";
import { AddressConstructor, Domains, DomainOptions } from "./interfaces.js";

export class Address {
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
