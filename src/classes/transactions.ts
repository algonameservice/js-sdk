import algosdk from 'algosdk';
import { CONSTANTS } from '../constants';
import { generateTeal } from './generateTeal'

export class Transactions {

    private algodClient: any;
    private APP_ID:any;

    constructor(client?:any) {
        
        this.algodClient = client;        
        this.APP_ID = CONSTANTS.APP_ID
    }

    generateLsig = async (name:string) => {
        const client = this.algodClient;
        let program = await client.compile(generateTeal(name)).do();
        program = new Uint8Array(Buffer.from(program.result, "base64"));

        const lsig = new algosdk.LogicSigAccount(program);
        return lsig;
    }

    prepareNameRegistrationTransactions = async (name:string, address:string, period:number) => {
        const algodClient = this.algodClient;

        /* 1st Txn - Payment to Smart Contract */

        let amount = 0;
        const lsig = await this.generateLsig(name);
        const params = await algodClient.getTransactionParams().do();

        params.fee = 1000;
        params.flatFee = true;

        let receiver = algosdk.getApplicationAddress(CONSTANTS.APP_ID);
        let sender = address;

        if(period === undefined) period = 0
        else period = period-1

        if (name.length < 3) return;
        else if (name.length === 3) amount = CONSTANTS.CHAR_3_AMOUNT + period*CONSTANTS.CHAR_3_AMOUNT
        else if (name.length === 4) amount = CONSTANTS.CHAR_4_AMOUNT + period*CONSTANTS.CHAR_4_AMOUNT
        else if (name.length >= 5) amount = CONSTANTS.CHAR_5_AMOUNT + period*CONSTANTS.CHAR_5_AMOUNT

        let closeToRemaninder = undefined;
        let note = undefined;

        let txn1 = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);

        const groupTxns = [];
        groupTxns.push(txn1);

        /* 2nd Txn - Funding Lsig */

        sender = address;
        receiver = lsig.address();
        amount = 915000;

        let txn2 = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);

        groupTxns.push(txn2);

        /* 3rd Txn - Optin to App from Lsig */
        
        let txn3 = await algosdk.makeApplicationOptInTxnFromObject({
            from: lsig.address(),
            suggestedParams: params,
            appIndex: this.APP_ID
        });

        groupTxns.push(txn3);

        sender = lsig.address();
        receiver = address;
        amount = 0;

        /* 4th Txn - Account registers name */

        let method = "register_name";
        

        let appArgs = [];

        period = period+1

        appArgs.push(new Uint8Array(Buffer.from(method)));
        appArgs.push(new Uint8Array(Buffer.from(name)))
        appArgs.push(algosdk.encodeUint64(period))
        let txn4 = await algosdk.makeApplicationNoOpTxn(address, params, this.APP_ID, appArgs, [lsig.address()]);
        groupTxns.push(txn4);

        algosdk.assignGroupID(groupTxns);

        let signedOptinTxn = algosdk.signLogicSigTransaction(groupTxns[2], lsig);

        return ({ optinTxn: signedOptinTxn, txns: groupTxns, unsignedOptinTxn: groupTxns[2] });
    }

    prepareUpdateNamePropertyTransactions = async (name:string, address:string, editedHandles:any) => {

        const algodClient = this.algodClient;

        const lsig = await this.generateLsig(name);
        const params = await algodClient.getTransactionParams().do();
        params.fee = 1000;
        params.flatFee = true;

        let method = "update_name";

        const txns=[];
        const groupTxns = [];

        for(let key in editedHandles) {
        
            let appArgs=[];
            let network = key;
            let handle = editedHandles[key];
            
            appArgs.push(new Uint8Array(Buffer.from(method)));
            appArgs.push(new Uint8Array(Buffer.from(network)));
            appArgs.push(new Uint8Array(Buffer.from(handle)));
            
            let txn = await algosdk.makeApplicationNoOpTxn(address, params, this.APP_ID, appArgs, [lsig.address()]);
            groupTxns.push(txn);
        }

        if(Object.keys(editedHandles).length > 1) algosdk.assignGroupID(groupTxns);

        return groupTxns;

    }

    preparePaymentTxn = async (sender:string, receiver:string, amt:number, note?:any) => {
        const algodClient = this.algodClient;
        const params = await algodClient.getTransactionParams().do();
        amt = algosdk.algosToMicroalgos(amt);
        const enc = new TextEncoder();
        note = enc.encode(note);
        let closeToRemaninder = undefined;

        let txn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);

        return txn;

    }

    prepareNameRenewalTxns = async (name:string, sender:string, years:number, amt:number) => {
        const algodClient = this.algodClient;        
        const params = await algodClient.getTransactionParams().do();
        let receiver = algosdk.getApplicationAddress(CONSTANTS.APP_ID);
        let closeToRemaninder=undefined;
        let note=undefined;
        let paymentTxn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);

        name = name.split('.algo')[0];

        let lsig = await this.generateLsig(name);

        let appArgs = [];
        appArgs.push(new Uint8Array(Buffer.from("renew_name")));
        appArgs.push(algosdk.encodeUint64(years));

        let applicationTxn = algosdk.makeApplicationNoOpTxn(sender, params, CONSTANTS.APP_ID, appArgs, [lsig.address()]);

        algosdk.assignGroupID([paymentTxn, applicationTxn]);

        const groupTxns = [paymentTxn, applicationTxn];
        return groupTxns;
    }

    prepareInitiateNameTransferTransaction = async (name:string, sender:string, newOwner:string, price:number) => {

        const algodClient = this.algodClient; 
        price = algosdk.algosToMicroalgos(price);
        const params = await algodClient.getTransactionParams().do();
        name = name.split('.algo')[0];

        let lsig = await this.generateLsig(name);

        let appArgs = [];
        appArgs.push(new Uint8Array(Buffer.from("initiate_transfer")));
        appArgs.push(algosdk.encodeUint64(price));

        let applicationTxn = algosdk.makeApplicationNoOpTxn(sender, params, CONSTANTS.APP_ID, appArgs, [lsig.address(), newOwner]);
        return applicationTxn;
    }

    prepareAcceptNameTransferTransactions = async (name:string, sender:string, receiver: string, amt:number) => {

        amt = algosdk.algosToMicroalgos(amt);
        const algodClient = this.algodClient;
        const params = await algodClient.getTransactionParams().do();
        
        let closeToRemaninder=undefined;
        let note=undefined;
        let paymentToOwnerTxn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);

        receiver = algosdk.getApplicationAddress(CONSTANTS.APP_ID);
        
        let paymentToSmartContractTxn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, CONSTANTS.TRANSFER_FEE, closeToRemaninder, note, params);

        name = name.split('.algo')[0];

        let lsig = await this.generateLsig(name);

        let appArgs = [];
        appArgs.push(new Uint8Array(Buffer.from("accept_transfer")));
        
        let applicationTxn = algosdk.makeApplicationNoOpTxn(sender, params, CONSTANTS.APP_ID, appArgs, [lsig.address()]);

        algosdk.assignGroupID([paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn]);

        const groupTxns = [paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn];
        return groupTxns;
    }

}