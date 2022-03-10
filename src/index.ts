import {resolver} from './classes/resolver';
import { Transactions } from './classes/transactions';

export class ansResolver {

    private resolverInstance:any;
    private transactionsInstance:any;

    constructor(client:any, indexer:any) {
        this.resolverInstance = new resolver(client, indexer);
        this.transactionsInstance = new Transactions(client);
    }

    resolveName = async (name:string) => {
        let nameInfo:Object = await this.resolverInstance.resolveName(name);
        return nameInfo;
    }

    getNamesOwnedByAddress = async (account:string) => {
        let accountInfo:Object = await this.resolverInstance.getNamesOwnedByAddress(account);
        return accountInfo;
    }

    prepareNameRegistrationTransactions = async (name:string, address:string, period:number) => {
        try{
            const txns = await this.transactionsInstance.prepareNameRegistrationTransactions(name, address, period);
            return txns;
        } catch (err:any) {
            return err.message;
        }
    }

    prepareUpdateNamePropertyTransactions = async (name:string, address:string, editedHandles:any) => {
        try{
            const txns = await this.transactionsInstance.prepareUpdateNamePropertyTransactions(name, address, editedHandles);
            return txns;
        } catch (err:any) {
            return err.message;
        }
    }

    preparePaymentTxn = async (sender:string, receiver:string, amt:number, note?:any) => {
        try{
            const txns = await this.transactionsInstance.preparePaymentTxn(sender, receiver, amt, note);
            return txns;
        } catch (err:any) {
            return err.message;
        }
    }

    prepareNameRenewalTxns = async (name:string, sender:string, years:number, amt:number) => {
        try{
            const txns = await this.transactionsInstance.prepareNameRenewalTxns(name, sender, years, amt);
            return txns;
        } catch (err:any) {
            return err.message;
        }
    }

    prepareInitiateNameTransferTransaction = async (name:string, sender:string, newOwner:string, price:number) => {
        try{
            const txns = await this.transactionsInstance.prepareInitiateNameTransferTransaction(name, sender, newOwner, price);
            return txns;
        } catch (err:any) {
            return err.message;
        }
    }

    prepareAcceptNameTransferTransactions = async (name:string, sender:string, receiver: string, amt:number) => {
        try{
            const txns = await this.transactionsInstance.prepareAcceptNameTransferTransactions(name, sender, receiver, amt);
            return txns;
        } catch (err:any) {
            return err.message;
        }
    }
}
