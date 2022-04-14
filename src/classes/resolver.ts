import algosdk from 'algosdk';
import { CONSTANTS } from '../constants';
import { InvalidNameError, AddressValidationError } from './errors';
import { generateTeal } from './generateTeal'

declare const Buffer:any;

export class resolver {

    private algodClient: any;
    private indexerClient:any;
    private APP_ID:any;

    constructor(client?:any, indexer?:any) {
        
        this.algodClient = client;
        this.indexerClient = indexer;
        
        this.APP_ID = CONSTANTS.APP_ID
    }

    generateLsig = async (name:string) => {
        const client = this.algodClient;
        let program = await client.compile(generateTeal(name)).do();
        program = new Uint8Array(Buffer.from(program.result, "base64"));

        const lsig = algosdk.makeLogicSig(program);
        return lsig;
    }

    resolveName = async (name:string) => {
        if(name.length === 0 || name.length > 64) {
            throw new InvalidNameError()
        } else {
            name = name.split('.algo')[0];
            name = name.toLowerCase();
            let indexer = await this.indexerClient;
            const lsig = await this.generateLsig(name);
            
            try {
                let accountInfo = await indexer.lookupAccountByID(lsig.address()).do();
                
                accountInfo = accountInfo.account['apps-local-state'];

                const length = accountInfo.length;
                let owner;
                let found=false;
                let data=[];
                for (let i = 0; i < length; i++) {
                    
                    let app = accountInfo[i];
                    
                    if (app.id === this.APP_ID) {
                        let kv = app['key-value'];
                        let kvLength = kv.length;
                        
                        for (let j = 0; j < kvLength; j++) {
                            
                            let key = Buffer.from(kv[j].key, 'base64').toString();
                            let value;
                            
                            if(key === 'expiry') {
                                value = kv[j].value.uint;
                                value = new Date(value*1000).toString()
                            }
                            else if(key === 'transfer_price') {
                                value = kv[j].value.uint;
                            }
                            else if(key === 'transfer_to') {
                                value = kv[j].value.bytes;
                                
                                if(value!== "") value = (algosdk.encodeAddress(new Uint8Array(Buffer.from(value, 'base64'))));
                            }
                            else value = Buffer.from(kv[j].value.bytes, 'base64').toString();

                            let kvObj = {
                                key: key,
                                value: value
                            }
                            if(key !== 'owner' && value !== '' && value !== 0 && key !== 'name') data.push(kvObj)

                            if (key === 'owner') {
                                
                                value = kv[j].value.bytes;
                                
                                value = (algosdk.encodeAddress(new Uint8Array(Buffer.from(value, 'base64'))));
                                
                                owner = value;
                                found=true;
                                
                            }
                            
                        }
                    }
                }
                
                if(found) {
                    return ({ found: true, address: owner, kvPairs:data})
                }
                else return ({ found: false });

            } catch (err) {
                
                return ({ found: false });
            }

        }
    }

    getNamesOwnedByAddress = async (address:string, limit:number) => {
        const isValidAddress:Boolean = await algosdk.isValidAddress(address);
        if(!isValidAddress) {
            throw new AddressValidationError();
        }
        else {
            let indexer = await this.indexerClient;
            
            let nextToken = '';
            let txnLength = 1;
            let txns = [];
            let count=0;
            while(txnLength > 0){
                try{
                    let info = await indexer.lookupAccountTransactions(address).
                    limit(10000).
                    afterTime('2022-02-25').
                    nextToken(nextToken).do();
                    txnLength=info.transactions.length;
                    if(txnLength > 0) {
                        count++;
                        nextToken = info["next-token"];
                        txns.push(info.transactions);
                    }
                    
                }catch(err){
                    return false;
                }
            }

            let accountTxns:any = [];
            for(let i=0; i<txns.length; i++){
                accountTxns=accountTxns.concat(txns[i]);
            }
        
            txns = accountTxns;
            const names:any = [];
            
            try{
        
                for(let i=0; i<txns.length; i++) {
                    let txn= txns[i];

                    if(txn["tx-type"] === "appl") {
                        
                        if(txn["application-transaction"]["application-id"] === CONSTANTS.APP_ID) {
                            
                            let appArgs = txn["application-transaction"]["application-args"];
                            if(Buffer.from(appArgs[0], 'base64').toString() === "register_name") {
                                if(!names.includes(Buffer.from(appArgs[1], 'base64').toString())) names.push(Buffer.from(appArgs[1], 'base64').toString())
                            }
                            else if(Buffer.from(appArgs[0], 'base64').toString() === "accept_transfer"){
                                let lsigAccount = txn["application-transaction"]["accounts"][0];
                                let accountInfo = await indexer.lookupAccountByID(lsigAccount).do();
                                accountInfo = accountInfo.account['apps-local-state'];

                                const length = accountInfo.length;
                                for(let i=0; i<length; i++){
                                    if(accountInfo[i].id === CONSTANTS.APP_ID) {
                                        let kvPairs = accountInfo[i]["key-value"];
                                        for(let j=0; j<kvPairs.length; j++) {
                                            let key = Buffer.from(kvPairs[j].key, 'base64');
                                            let value = Buffer.from(kvPairs[j].value.bytes, 'base64');

                                            if(key === 'name') {
                                                
                                                if(!names.includes(value)) names.push(value);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            } catch (err) {
                return []
            }

            if(names.length > 0) {

                let details=[];
                
                for(let i=0; i<names.length; i++) {
                    if(limit !== undefined) {
                        if(details.length >= limit) break;
                    }
                    
                    let info:any = await this.resolveName(names[i]);                
                    if(info.found && info.address !== undefined) {

                        if(info.address === address){
                            details.push(names[i]+'.algo');
                        }
                        
                    } else {
                        i = i-1;
                    }
                    
                }
                
                return (details);
            }
        }
    }

    //TODO:Get socials, and metadata
}
