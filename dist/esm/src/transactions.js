import algosdk from "algosdk";
import { APP_ID, REGISTRATION_PRICE, TRANSFER_FEE } from "./constants.js";
import CachedApi from "./cachedApi.js";
import { toIntArray } from "./util.js";
import { Name } from "./name.js";
export class Transactions extends CachedApi {
    name;
    constructor(client, indexer, name) {
        super(client, indexer);
        if (name instanceof Name) {
            this.name = name.name;
        }
        else {
            this.name = name;
        }
    }
    calculatePrice(period) {
        let amount = 0;
        if (this.name.length === 3) {
            amount = REGISTRATION_PRICE.CHAR_3_AMOUNT * period;
        }
        else if (this.name.length === 4) {
            amount = REGISTRATION_PRICE.CHAR_4_AMOUNT * period;
        }
        else if (this.name.length >= 5) {
            amount = REGISTRATION_PRICE.CHAR_5_AMOUNT * period;
        }
        return amount;
    }
    async prepareNameRegistrationTransactions(address, period) {
        const algodClient = this.rpc;
        /* 1st Txn - Payment to Smart Contract */
        let amount = 0;
        const lsig = await this.getTeal(this.name);
        const params = await algodClient.getTransactionParams().do();
        params.fee = 1000;
        params.flatFee = true;
        let receiver = algosdk.getApplicationAddress(APP_ID);
        let sender = address;
        if (period === undefined) {
            period = 1;
        }
        amount = this.calculatePrice(period);
        const closeToRemaninder = undefined;
        const note = undefined;
        const txn1 = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
        const groupTxns = [];
        groupTxns.push(txn1);
        /* 2nd Txn - Funding Lsig */
        sender = address;
        receiver = lsig.address();
        amount = 915000;
        const txn2 = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
        groupTxns.push(txn2);
        /* 3rd Txn - Optin to App from Lsig */
        const txn3 = await algosdk.makeApplicationOptInTxnFromObject({
            from: lsig.address(),
            suggestedParams: params,
            appIndex: APP_ID,
        });
        groupTxns.push(txn3);
        /* 4th Txn - Account registers name */
        const method = "register_name";
        const appArgs = [];
        appArgs.push(toIntArray(method));
        appArgs.push(toIntArray(this.name));
        appArgs.push(algosdk.encodeUint64(period));
        const txn4 = await algosdk.makeApplicationNoOpTxn(address, params, APP_ID, appArgs, [lsig.address()]);
        groupTxns.push(txn4);
        algosdk.assignGroupID(groupTxns);
        const signedOptinTxn = algosdk.signLogicSigTransaction(groupTxns[2], lsig);
        return {
            optinTxn: signedOptinTxn,
            txns: groupTxns,
            unsignedOptinTxn: groupTxns[2],
        };
    }
    async prepareUpdateNamePropertyTransactions(address, editedHandles) {
        const lsig = await this.getTeal(this.name);
        const params = await this.rpc.getTransactionParams().do();
        params.fee = 1000;
        params.flatFee = true;
        const method = "update_name";
        const groupTxns = [];
        for (const key in editedHandles) {
            const appArgs = [];
            const network = key;
            const handle = editedHandles[key];
            appArgs.push(toIntArray(method));
            appArgs.push(toIntArray(network));
            appArgs.push(toIntArray(handle));
            const txn = await algosdk.makeApplicationNoOpTxn(address, params, APP_ID, appArgs, [lsig.address()]);
            groupTxns.push(txn);
        }
        if (Object.keys(editedHandles).length > 1) {
            algosdk.assignGroupID(groupTxns);
        }
        return groupTxns;
    }
    async prepareNameRenewalTxns(sender, years) {
        const params = await this.rpc.getTransactionParams().do();
        const receiver = algosdk.getApplicationAddress(APP_ID);
        const closeToRemaninder = undefined;
        const note = undefined;
        const paymentTxn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, this.calculatePrice(years), closeToRemaninder, note, params);
        const lsig = await this.getTeal(this.name);
        const appArgs = [];
        appArgs.push(toIntArray("renew_name"));
        appArgs.push(algosdk.encodeUint64(years));
        const applicationTxn = algosdk.makeApplicationNoOpTxn(sender, params, APP_ID, appArgs, [lsig.address()]);
        algosdk.assignGroupID([paymentTxn, applicationTxn]);
        return [paymentTxn, applicationTxn];
    }
    async prepareInitiateNameTransferTransaction(sender, newOwner, price) {
        price = algosdk.algosToMicroalgos(price);
        const params = await this.rpc.getTransactionParams().do();
        const lsig = await this.getTeal(this.name);
        const appArgs = [];
        appArgs.push(toIntArray("initiate_transfer"));
        appArgs.push(algosdk.encodeUint64(price));
        return algosdk.makeApplicationNoOpTxn(sender, params, APP_ID, appArgs, [
            lsig.address(),
            newOwner,
        ]);
    }
    async prepareAcceptNameTransferTransactions(sender, receiver, amt) {
        amt = algosdk.algosToMicroalgos(amt);
        const params = await this.rpc.getTransactionParams().do();
        const closeToRemaninder = undefined;
        const note = undefined;
        const paymentToOwnerTxn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
        receiver = algosdk.getApplicationAddress(APP_ID);
        const paymentToSmartContractTxn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, TRANSFER_FEE, closeToRemaninder, note, params);
        const lsig = await this.getTeal(this.name);
        const appArgs = [];
        appArgs.push(toIntArray("accept_transfer"));
        const applicationTxn = algosdk.makeApplicationNoOpTxn(sender, params, APP_ID, appArgs, [lsig.address()]);
        algosdk.assignGroupID([
            paymentToOwnerTxn,
            paymentToSmartContractTxn,
            applicationTxn,
        ]);
        return [paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn];
    }
}
