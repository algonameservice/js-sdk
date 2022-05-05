export type NameConstructor = {
    client: object,
    indexer: object,
    resolver: object,
    name: string
}

export type AddressConstructor = {
    address : string,
    resolver: object,
    client: object,
    indexer: object
}

export type DomainInformation = {
    found: boolean,
    address? : string,
    socials? : object[] | [],
    metadata?: object[] | []
}

export type DomainOptions = {
    socials?:boolean,
    metadata?: boolean,
    limit?: number
}

export type Domains = {
    name: string,
    socials? : object[] | [],
    metadata?: object[] | []
}