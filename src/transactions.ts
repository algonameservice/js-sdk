import algosdk, { Transaction } from "algosdk";
import { REGISTRATION_PRICE, TRANSFER_FEE } from "./constants.js";
import CachedApi from "./cachedApi.js";
import { toIntArray } from "./util.js";
import { RegistrationTxns } from "./interfaces.js";
import { Record } from "./interfaces.js";
import { Name } from "./name.js";

export class Transactions extends CachedApi {
  private name: string;

  constructor(
    client: algosdk.Algodv2,
    indexer: algosdk.Indexer,
    name: Name | string,
    network?: string,
    app?: number
  ) {
    super(client, indexer, network, app);
    if (name instanceof Name) {
      this.name = name.name;
    } else {
      this.name = name;
    }
  }

  calculatePrice(period: number): number {
    const amounts: { [len: number]: number } = {
      3: REGISTRATION_PRICE.CHAR_3_AMOUNT,
      4: REGISTRATION_PRICE.CHAR_4_AMOUNT,
      5: REGISTRATION_PRICE.CHAR_5_AMOUNT,
    };
    const len = this.name.length >= 5 ? 5 : this.name.length;

    return amounts[len] * period;
  }

  async prepareNameRegistrationTransactions(
    address: string,
    period: number
  ): Promise<RegistrationTxns> {
    const algodClient = this.rpc;
    /* 1st Txn - Payment to Smart Contract */
    let amount = 0;
    const lsig = await this.getTeal(this.name);
    const params = await algodClient.getTransactionParams().do();

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

    const txn1 = algosdk.makePaymentTxnWithSuggestedParams(
      sender,
      receiver,
      amount,
      closeToRemaninder,
      note,
      params
    );

    const groupTxns = [];
    groupTxns.push(txn1);

    /* 2nd Txn - Funding Lsig */

    sender = address;
    receiver = lsig.address();
    amount = 915000;

    const txn2 = algosdk.makePaymentTxnWithSuggestedParams(
      sender,
      receiver,
      amount,
      closeToRemaninder,
      note,
      params
    );

    groupTxns.push(txn2);

    /* 3rd Txn - Optin to App from Lsig */

    const txn3 = await algosdk.makeApplicationOptInTxnFromObject({
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
    const txn4 = await algosdk.makeApplicationNoOpTxn(
      address,
      params,
      this.APP,
      appArgs,
      [lsig.address()]
    );
    groupTxns.push(txn4);

    algosdk.assignGroupID(groupTxns);

    const signedOptinTxn = algosdk.signLogicSigTransaction(groupTxns[2], lsig);

    return {
      optinTxn: signedOptinTxn,
      txns: groupTxns,
      unsignedOptinTxn: groupTxns[2],
    };
  }

  async prepareUpdateNamePropertyTransactions(
    address: string,
    editedHandles: Record
  ): Promise<Transaction[]> {
    const lsig = await this.getTeal(this.name);
    const params = await this.rpc.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;

    const method = "update_name";

    const groupTxns = [];

    for (const key in editedHandles) {
      const appArgs = [];
      const network = key;
      const handle: string = editedHandles[key as keyof Record];

      appArgs.push(toIntArray(method));
      appArgs.push(toIntArray(network as string));
      appArgs.push(toIntArray(handle as string));

      const txn = await algosdk.makeApplicationNoOpTxn(
        address,
        params,
        this.APP,
        appArgs,
        [lsig.address()]
      );
      groupTxns.push(txn);
    }

    if (Object.keys(editedHandles).length > 1) {
      algosdk.assignGroupID(groupTxns);
    }

    return groupTxns;
  }

  async prepareNameRenewalTxns(
    sender: string,
    years: number
  ): Promise<Transaction[]> {
    const params = await this.rpc.getTransactionParams().do();
    const receiver = algosdk.getApplicationAddress(this.APP);
    const closeToRemaninder = undefined;
    const note = undefined;
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParams(
      sender,
      receiver,
      this.calculatePrice(years),
      closeToRemaninder,
      note,
      params
    );

    const lsig = await this.getTeal(this.name);

    const appArgs = [];
    appArgs.push(toIntArray("renew_name"));
    appArgs.push(algosdk.encodeUint64(years));

    const applicationTxn = algosdk.makeApplicationNoOpTxn(
      sender,
      params,
      this.APP,
      appArgs,
      [lsig.address()]
    );

    algosdk.assignGroupID([paymentTxn, applicationTxn]);

    return [paymentTxn, applicationTxn];
  }

  async prepareUpdateValueTxn(address: string, value: string) {
    const params = await this.rpc.getTransactionParams().do();

    const lsig = await this.getTeal(this.name);

    const appArgs = [];
    appArgs.push(toIntArray("set_default_account"));

    return algosdk.makeApplicationNoOpTxn(address, params, this.APP, appArgs, [
      lsig.address(),
      value,
    ]);
  }

  async prepareSetDefaultDomainTxn(address: string) {
    const params = await this.rpc.getTransactionParams().do();

    const lsig = await this.getTeal(this.name);

    const appArgs = [];
    appArgs.push(toIntArray("set_default_account"));

    return algosdk.makeApplicationNoOpTxn(address, params, this.APP, appArgs, [
      lsig.address(),
    ]);
  }

  async prepareInitiateNameTransferTransaction(
    sender: string,
    newOwner: string,
    price: number
  ): Promise<Transaction> {
    price = algosdk.algosToMicroalgos(price);
    const params = await this.rpc.getTransactionParams().do();

    const lsig = await this.getTeal(this.name);

    const appArgs = [];
    appArgs.push(toIntArray("initiate_transfer"));
    appArgs.push(algosdk.encodeUint64(price));

    return algosdk.makeApplicationNoOpTxn(sender, params, this.APP, appArgs, [
      lsig.address(),
      newOwner,
    ]);
  }

  async prepareAcceptNameTransferTransactions(
    sender: string,
    receiver: string,
    amt: number
  ): Promise<Transaction[]> {
    amt = algosdk.algosToMicroalgos(amt);
    const params = await this.rpc.getTransactionParams().do();

    const closeToRemaninder = undefined;
    const note = undefined;
    const paymentToOwnerTxn = algosdk.makePaymentTxnWithSuggestedParams(
      sender,
      receiver,
      amt,
      closeToRemaninder,
      note,
      params
    );

    receiver = algosdk.getApplicationAddress(this.APP);

    const paymentToSmartContractTxn = algosdk.makePaymentTxnWithSuggestedParams(
      sender,
      receiver,
      TRANSFER_FEE,
      closeToRemaninder,
      note,
      params
    );
    const lsig = await this.getTeal(this.name);

    const appArgs = [];
    appArgs.push(toIntArray("accept_transfer"));

    const applicationTxn = algosdk.makeApplicationNoOpTxn(
      sender,
      params,
      this.APP,
      appArgs,
      [lsig.address()]
    );

    algosdk.assignGroupID([
      paymentToOwnerTxn,
      paymentToSmartContractTxn,
      applicationTxn,
    ]);

    return [paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn];
  }
}
