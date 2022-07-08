var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import algosdk from "algosdk";
import { REGISTRATION_PRICE, TRANSFER_FEE } from "./constants.js";
import CachedApi from "./cachedApi.js";
import { toIntArray } from "./util.js";
import { Name } from "./name.js";
export class Transactions extends CachedApi {
    constructor(client, indexer, name, network, app) {
        super(client, indexer, network, app);
        if (name instanceof Name) {
            this.name = name.name;
        }
        else {
            this.name = name;
        }
    }
    calculatePrice(period) {
        const amounts = {
            3: REGISTRATION_PRICE.CHAR_3_AMOUNT,
            4: REGISTRATION_PRICE.CHAR_4_AMOUNT,
            5: REGISTRATION_PRICE.CHAR_5_AMOUNT,
        };
        const len = this.name.length >= 5 ? 5 : this.name.length;
        return amounts[len] * period;
    }
    prepareNameRegistrationTransactions(address, period) {
        return __awaiter(this, void 0, void 0, function* () {
            const algodClient = this.rpc;
            /* 1st Txn - Payment to Smart Contract */
            let amount = 0;
            const lsig = yield this.getTeal(this.name);
            const params = yield algodClient.getTransactionParams().do();
            params.fee = 1000;
            params.flatFee = true;
            let receiver = algosdk.getApplicationAddress(this.APP);
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
            const txn3 = yield algosdk.makeApplicationOptInTxnFromObject({
                from: lsig.address(),
                suggestedParams: params,
                appIndex: this.APP,
            });
            groupTxns.push(txn3);
            /* 4th Txn - Account registers name */
            const method = "register_name";
            const appArgs = [];
            appArgs.push(toIntArray(method));
            appArgs.push(toIntArray(this.name));
            appArgs.push(algosdk.encodeUint64(period));
            const txn4 = yield algosdk.makeApplicationNoOpTxn(address, params, this.APP, appArgs, [lsig.address()]);
            groupTxns.push(txn4);
            algosdk.assignGroupID(groupTxns);
            const signedOptinTxn = algosdk.signLogicSigTransaction(groupTxns[2], lsig);
            return {
                optinTxn: signedOptinTxn,
                txns: groupTxns,
                unsignedOptinTxn: groupTxns[2],
            };
        });
    }
    prepareUpdateNamePropertyTransactions(address, editedHandles) {
        return __awaiter(this, void 0, void 0, function* () {
            const lsig = yield this.getTeal(this.name);
            const params = yield this.rpc.getTransactionParams().do();
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
                const txn = yield algosdk.makeApplicationNoOpTxn(address, params, this.APP, appArgs, [lsig.address()]);
                groupTxns.push(txn);
            }
            if (Object.keys(editedHandles).length > 1) {
                algosdk.assignGroupID(groupTxns);
            }
            return groupTxns;
        });
    }
    prepareNameRenewalTxns(sender, years) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = yield this.rpc.getTransactionParams().do();
            const receiver = algosdk.getApplicationAddress(this.APP);
            const closeToRemaninder = undefined;
            const note = undefined;
            const paymentTxn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, this.calculatePrice(years), closeToRemaninder, note, params);
            const lsig = yield this.getTeal(this.name);
            const appArgs = [];
            appArgs.push(toIntArray("renew_name"));
            appArgs.push(algosdk.encodeUint64(years));
            const applicationTxn = algosdk.makeApplicationNoOpTxn(sender, params, this.APP, appArgs, [lsig.address()]);
            algosdk.assignGroupID([paymentTxn, applicationTxn]);
            return [paymentTxn, applicationTxn];
        });
    }
    prepareUpdateValueTxn(address, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = yield this.rpc.getTransactionParams().do();
            const lsig = yield this.getTeal(this.name);
            const appArgs = [];
            appArgs.push(toIntArray("set_default_account"));
            return algosdk.makeApplicationNoOpTxn(address, params, this.APP, appArgs, [
                lsig.address(),
                value,
            ]);
        });
    }
    prepareSetDefaultDomainTxn(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = yield this.rpc.getTransactionParams().do();
            const lsig = yield this.getTeal(this.name);
            const appArgs = [];
            appArgs.push(toIntArray("set_default_account"));
            return algosdk.makeApplicationNoOpTxn(address, params, this.APP, appArgs, [
                lsig.address(),
            ]);
        });
    }
    prepareInitiateNameTransferTransaction(sender, newOwner, price) {
        return __awaiter(this, void 0, void 0, function* () {
            price = algosdk.algosToMicroalgos(price);
            const params = yield this.rpc.getTransactionParams().do();
            const lsig = yield this.getTeal(this.name);
            const appArgs = [];
            appArgs.push(toIntArray("initiate_transfer"));
            appArgs.push(algosdk.encodeUint64(price));
            return algosdk.makeApplicationNoOpTxn(sender, params, this.APP, appArgs, [
                lsig.address(),
                newOwner,
            ]);
        });
    }
    prepareAcceptNameTransferTransactions(sender, receiver, amt) {
        return __awaiter(this, void 0, void 0, function* () {
            amt = algosdk.algosToMicroalgos(amt);
            const params = yield this.rpc.getTransactionParams().do();
            const closeToRemaninder = undefined;
            const note = undefined;
            const paymentToOwnerTxn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
            receiver = algosdk.getApplicationAddress(this.APP);
            const paymentToSmartContractTxn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, TRANSFER_FEE, closeToRemaninder, note, params);
            const lsig = yield this.getTeal(this.name);
            const appArgs = [];
            appArgs.push(toIntArray("accept_transfer"));
            const applicationTxn = algosdk.makeApplicationNoOpTxn(sender, params, this.APP, appArgs, [lsig.address()]);
            algosdk.assignGroupID([
                paymentToOwnerTxn,
                paymentToSmartContractTxn,
                applicationTxn,
            ]);
            return [paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn];
        });
    }
}
//# sourceMappingURL=transactions.js.map