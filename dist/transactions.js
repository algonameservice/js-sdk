var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/tsup/assets/cjs_shims.js"() {
  }
});

// src/constants.js
var require_constants = __commonJS({
  "src/constants.js"(exports) {
    "use strict";
    init_cjs_shims();
    exports.__esModule = true;
    exports.APP_ID = 628095415;
    exports.REGISTRATION_PRICE = {
      CHAR_3_AMOUNT: 15e7,
      CHAR_4_AMOUNT: 5e7,
      CHAR_5_AMOUNT: 5e6
    };
    exports.TRANSFER_FEE = 2e6;
    exports.IPFS_LINK = "https://ipfs.infura.io/ipfs/";
    exports.ASCII_CODES = {
      ASCII_A: 97,
      ASCII_Z: 122,
      ASCII_0: 48,
      ASCII_9: 57
    };
    exports.ALLOWED_SOCIALS = [
      "github",
      "twitter",
      "telegram",
      "youtube",
      "reddit",
      "discord"
    ];
    exports.ALLOWED_TLDS = ["algo"];
  }
});

// src/generateTeal.js
var require_generateTeal = __commonJS({
  "src/generateTeal.js"(exports) {
    "use strict";
    init_cjs_shims();
    exports.__esModule = true;
    function generateTeal2(name) {
      return '#pragma version 4\n    byte "' + name + '"\n    len\n    int 3\n    ==\n    bnz main_l22\n    byte "' + name + '"\n    len\n    int 4\n    ==\n    bnz main_l13\n    byte "' + name + '"\n    len\n    int 5\n    >=\n    bnz main_l4\n    err\n    main_l4:\n    gtxn 0 Amount\n    int 5000000\n    >=\n    assert\n    byte "' + name + '"\n    len\n    int 64\n    <=\n    assert\n    int 0\n    store 0\n    main_l5:\n    load 0\n    byte "' + name + '"\n    len\n    <\n    bnz main_l12\n    global GroupSize\n    int 2\n    ==\n    global GroupSize\n    int 4\n    ==\n    ||\n    assert\n    gtxn 0 Sender\n    gtxn 1 Sender\n    ==\n    assert\n    gtxn 0 Receiver\n    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4\n    ==\n    assert\n    global GroupSize\n    int 2\n    ==\n    bnz main_l11\n    global GroupSize\n    int 4\n    ==\n    bnz main_l10\n    int 0\n    return\n    main_l9:\n    int 1\n    assert\n    int 1\n    b main_l31\n    main_l10:\n    gtxn 1 Receiver\n    gtxn 2 Sender\n    ==\n    gtxn 2 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 2 OnCompletion\n    int OptIn\n    ==\n    &&\n    gtxn 3 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 3 Sender\n    gtxn 0 Sender\n    ==\n    &&\n    gtxna 3 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 3 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l9\n    main_l11:\n    gtxn 1 ApplicationID\n    int 628095415\n    ==\n    gtxna 1 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 1 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l9\n    main_l12:\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 97\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 122\n    <=\n    &&\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 48\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 57\n    <=\n    &&\n    ||\n    assert\n    load 0\n    int 1\n    +\n    store 0\n    b main_l5\n    main_l13:\n    gtxn 0 Amount\n    int 50000000\n    >=\n    assert\n    byte "' + name + '"\n    len\n    int 64\n    <=\n    assert\n    int 0\n    store 0\n    main_l14:\n    load 0\n    byte "' + name + '"\n    len\n    <\n    bnz main_l21\n    global GroupSize\n    int 2\n    ==\n    global GroupSize\n    int 4\n    ==\n    ||\n    assert\n    gtxn 0 Sender\n    gtxn 1 Sender\n    ==\n    assert\n    gtxn 0 Receiver\n    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4\n    ==\n    assert\n    global GroupSize\n    int 2\n    ==\n    bnz main_l20\n    global GroupSize\n    int 4\n    ==\n    bnz main_l19\n    int 0\n    return\n    main_l18:\n    int 1\n    assert\n    int 1\n    b main_l31\n    main_l19:\n    gtxn 1 Receiver\n    gtxn 2 Sender\n    ==\n    gtxn 2 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 2 OnCompletion\n    int OptIn\n    ==\n    &&\n    gtxn 3 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 3 Sender\n    gtxn 0 Sender\n    ==\n    &&\n    gtxna 3 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 3 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l18\n    main_l20:\n    gtxn 1 ApplicationID\n    int 628095415\n    ==\n    gtxna 1 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 1 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l18\n    main_l21:\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 97\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 122\n    <=\n    &&\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 48\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 57\n    <=\n    &&\n    ||\n    assert\n    load 0\n    int 1\n    +\n    store 0\n    b main_l14\n    main_l22:\n    gtxn 0 Amount\n    int 150000000\n    >=\n    assert\n    byte "' + name + '"\n    len\n    int 64\n    <=\n    assert\n    int 0\n    store 0\n    main_l23:\n    load 0\n    byte "' + name + '"\n    len\n    <\n    bnz main_l30\n    global GroupSize\n    int 2\n    ==\n    global GroupSize\n    int 4\n    ==\n    ||\n    assert\n    gtxn 0 Sender\n    gtxn 1 Sender\n    ==\n    assert\n    gtxn 0 Receiver\n    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4\n    ==\n    assert\n    global GroupSize\n    int 2\n    ==\n    bnz main_l29\n    global GroupSize\n    int 4\n    ==\n    bnz main_l28\n    int 0\n    return\n    main_l27:\n    int 1\n    assert\n    int 1\n    b main_l31\n    main_l28:\n    gtxn 1 Receiver\n    gtxn 2 Sender\n    ==\n    gtxn 2 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 2 OnCompletion\n    int OptIn\n    ==\n    &&\n    gtxn 3 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 3 Sender\n    gtxn 0 Sender\n    ==\n    &&\n    gtxna 3 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 3 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l27\n    main_l29:\n    gtxn 1 ApplicationID\n    int 628095415\n    ==\n    gtxna 1 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 1 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l27\n    main_l30:\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 97\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 122\n    <=\n    &&\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 48\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 57\n    <=\n    &&\n    ||\n    assert\n    load 0\n    int 1\n    +\n    store 0\n    b main_l23\n    main_l31:\n    return';
    }
    exports.generateTeal = generateTeal2;
  }
});

// src/transactions.ts
var transactions_exports = {};
__export(transactions_exports, {
  Transactions: () => Transactions
});
module.exports = __toCommonJS(transactions_exports);
init_cjs_shims();
var import_algosdk = __toESM(require("algosdk"));
var import_constants = __toESM(require_constants());
var import_generateTeal = __toESM(require_generateTeal());
var Transactions = class {
  algodClient;
  name;
  constructor(client, name) {
    this.algodClient = client;
    this.name = name;
  }
  async generateLsig() {
    let program = await this.algodClient.compile((0, import_generateTeal.generateTeal)(this.name)).do();
    program = new Uint8Array(Buffer.from(program.result, "base64"));
    return new import_algosdk.default.LogicSigAccount(program);
  }
  calculatePrice(period) {
    let amount = 0;
    if (this.name.length === 3) {
      amount = import_constants.REGISTRATION_PRICE.CHAR_3_AMOUNT * period;
    } else if (this.name.length === 4) {
      amount = import_constants.REGISTRATION_PRICE.CHAR_4_AMOUNT * period;
    } else if (this.name.length >= 5) {
      amount = import_constants.REGISTRATION_PRICE.CHAR_5_AMOUNT * period;
    }
    return amount;
  }
  async prepareNameRegistrationTransactions(address, period) {
    const algodClient = this.algodClient;
    let amount = 0;
    const lsig = await this.generateLsig();
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1e3;
    params.flatFee = true;
    let receiver = import_algosdk.default.getApplicationAddress(import_constants.APP_ID);
    let sender = address;
    if (period === void 0) {
      period = 1;
    }
    amount = this.calculatePrice(period);
    const closeToRemaninder = void 0;
    const note = void 0;
    const txn1 = import_algosdk.default.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
    const groupTxns = [];
    groupTxns.push(txn1);
    sender = address;
    receiver = lsig.address();
    amount = 915e3;
    const txn2 = import_algosdk.default.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
    groupTxns.push(txn2);
    const txn3 = await import_algosdk.default.makeApplicationOptInTxnFromObject({
      from: lsig.address(),
      suggestedParams: params,
      appIndex: import_constants.APP_ID
    });
    groupTxns.push(txn3);
    sender = lsig.address();
    receiver = address;
    amount = 0;
    const method = "register_name";
    const appArgs = [];
    period++;
    appArgs.push(new Uint8Array(Buffer.from(method)));
    appArgs.push(new Uint8Array(Buffer.from(this.name)));
    appArgs.push(import_algosdk.default.encodeUint64(period));
    const txn4 = await import_algosdk.default.makeApplicationNoOpTxn(address, params, import_constants.APP_ID, appArgs, [lsig.address()]);
    groupTxns.push(txn4);
    import_algosdk.default.assignGroupID(groupTxns);
    const signedOptinTxn = import_algosdk.default.signLogicSigTransaction(groupTxns[2], lsig);
    return {
      optinTxn: signedOptinTxn,
      txns: groupTxns,
      unsignedOptinTxn: groupTxns[2]
    };
  }
  async prepareUpdateNamePropertyTransactions(address, editedHandles) {
    const algodClient = this.algodClient;
    const lsig = await this.generateLsig();
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1e3;
    params.flatFee = true;
    const method = "update_name";
    const groupTxns = [];
    for (const key in editedHandles) {
      const appArgs = [];
      const network = key;
      const handle = editedHandles[key];
      appArgs.push(new Uint8Array(Buffer.from(method)));
      appArgs.push(new Uint8Array(Buffer.from(network)));
      appArgs.push(new Uint8Array(Buffer.from(handle)));
      const txn = await import_algosdk.default.makeApplicationNoOpTxn(address, params, import_constants.APP_ID, appArgs, [lsig.address()]);
      groupTxns.push(txn);
    }
    if (Object.keys(editedHandles).length > 1) {
      import_algosdk.default.assignGroupID(groupTxns);
    }
    return groupTxns;
  }
  async preparePaymentTxn(sender, receiver, amt, note) {
    const algodClient = this.algodClient;
    const params = await algodClient.getTransactionParams().do();
    amt = import_algosdk.default.algosToMicroalgos(amt);
    const enc = new TextEncoder();
    note = enc.encode(note);
    const closeToRemaninder = void 0;
    return import_algosdk.default.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
  }
  async prepareNameRenewalTxns(sender, years) {
    const algodClient = this.algodClient;
    const params = await algodClient.getTransactionParams().do();
    const receiver = import_algosdk.default.getApplicationAddress(import_constants.APP_ID);
    const closeToRemaninder = void 0;
    const note = void 0;
    const paymentTxn = import_algosdk.default.makePaymentTxnWithSuggestedParams(sender, receiver, this.calculatePrice(years), closeToRemaninder, note, params);
    const lsig = await this.generateLsig();
    const appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("renew_name")));
    appArgs.push(import_algosdk.default.encodeUint64(years));
    const applicationTxn = import_algosdk.default.makeApplicationNoOpTxn(sender, params, import_constants.APP_ID, appArgs, [lsig.address()]);
    import_algosdk.default.assignGroupID([paymentTxn, applicationTxn]);
    return [paymentTxn, applicationTxn];
  }
  async prepareInitiateNameTransferTransaction(sender, newOwner, price) {
    const algodClient = this.algodClient;
    price = import_algosdk.default.algosToMicroalgos(price);
    const params = await algodClient.getTransactionParams().do();
    const lsig = await this.generateLsig();
    const appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("initiate_transfer")));
    appArgs.push(import_algosdk.default.encodeUint64(price));
    return import_algosdk.default.makeApplicationNoOpTxn(sender, params, import_constants.APP_ID, appArgs, [
      lsig.address(),
      newOwner
    ]);
  }
  async prepareAcceptNameTransferTransactions(sender, receiver, amt) {
    amt = import_algosdk.default.algosToMicroalgos(amt);
    const algodClient = this.algodClient;
    const params = await algodClient.getTransactionParams().do();
    const closeToRemaninder = void 0;
    const note = void 0;
    const paymentToOwnerTxn = import_algosdk.default.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
    receiver = import_algosdk.default.getApplicationAddress(import_constants.APP_ID);
    const paymentToSmartContractTxn = import_algosdk.default.makePaymentTxnWithSuggestedParams(sender, receiver, import_constants.TRANSFER_FEE, closeToRemaninder, note, params);
    const lsig = await this.generateLsig();
    const appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("accept_transfer")));
    const applicationTxn = import_algosdk.default.makeApplicationNoOpTxn(sender, params, import_constants.APP_ID, appArgs, [lsig.address()]);
    import_algosdk.default.assignGroupID([
      paymentToOwnerTxn,
      paymentToSmartContractTxn,
      applicationTxn
    ]);
    return [paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn];
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Transactions
});
//# sourceMappingURL=transactions.js.map