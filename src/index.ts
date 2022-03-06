import {resolver} from './classes/resolver';

export class ansResolver {

    private client:any;
    private indexer:any;
    private resolverInstance:any;

    constructor(client:any, indexer:any) {
        this.client = client;
        this.indexer = indexer;
        this.resolverInstance = new resolver(client, indexer);
    }

    resolveName = async function(name:string) {
        let nameInfo:Object = await this.resolverInstance.resolveName(name);
        return nameInfo;
    }

    getNamesOwnedByAddress = async function(account:string) {
        let accountInfo:Object = await this.resolverInstance.getNamesOwnedByAddress(account);
        return accountInfo;
    }
}
