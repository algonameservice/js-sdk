import { Resolver } from "./resolver.js";
import { AddressConstructor, Domain, DomainOptions } from "./interfaces.js";

export class Address {
  private address: string;
  private resolver: Resolver;

  constructor(options: AddressConstructor) {
    const { address, rpc, indexer, network } = options;
    this.address = address;
    this.resolver = new Resolver(rpc, indexer, undefined, network);
  }

  async getNames(options?: DomainOptions): Promise<Domain[]> {
    return await this.resolver.getNamesOwnedByAddress(
      this.address,
      options?.socials,
      options?.metadata,
      options?.limit
    );
  }

  async getDefaultDomain(): Promise<string | Error> {
    return await this.resolver.getDefaultDomain(this.address);
  }
}
