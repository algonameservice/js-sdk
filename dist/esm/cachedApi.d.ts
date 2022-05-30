import algosdk, { LogicSigAccount } from "algosdk";
export default class CachedApi {
    private cache;
    protected rpc: algosdk.Algodv2;
    protected indexer: algosdk.Indexer;
    protected ESCROW: string;
    protected APP: number;
    constructor(client: algosdk.Algodv2, indexer: algosdk.Indexer);
    protected getTeal(name: string): Promise<LogicSigAccount>;
}
//# sourceMappingURL=cachedApi.d.ts.map