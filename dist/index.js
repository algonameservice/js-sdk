var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AnsResolver: () => AnsResolver
});
module.exports = __toCommonJS(src_exports);

// src/classes/resolver.ts
var import_algosdk = __toESM(require("algosdk"));

// src/constants.ts
var APP_ID = 628095415;
var REGISTRATION_PRICE = {
  CHAR_3_AMOUNT: 15e7,
  CHAR_4_AMOUNT: 5e7,
  CHAR_5_AMOUNT: 5e6
};
var TRANSFER_FEE = 2e6;
var ASCII_CODES = {
  ASCII_A: 97,
  ASCII_Z: 122,
  ASCII_0: 48,
  ASCII_9: 57
};
var ALLOWED_SOCIALS = [
  "github",
  "twitter",
  "telegram",
  "youtube",
  "reddit",
  "discord"
];

// src/classes/errors.ts
var AddressValidationError = class extends Error {
  name;
  type;
  constructor() {
    super(`This is not a valid Algorand address`);
    this.name = "InvalidAddressError";
    this.type = "InvalidAddressError";
  }
};
var InvalidNameError = class extends Error {
  name;
  type;
  constructor() {
    super(`The name must be between 3 and 64 characters and must only contain a-z and 0-9 characters`);
    this.name = "InvalidNameError";
    this.type = "InvalidNameError";
  }
};
var NameNotRegisteredError = class extends Error {
  name;
  type;
  constructor(name) {
    super(`Name ${name} is not registered`);
    this.name = "NameNotRegisteredError";
    this.type = "NameNotRegisteredError";
  }
};
var IncorrectOwnerError = class extends Error {
  name;
  type;
  constructor(name, address) {
    super(`Name ${name}.algo is not owned by ${address}`);
    this.name = "IncorrectOwnerError";
    this.type = "IncorrectOwnerError";
  }
};

// src/classes/generateTeal.ts
function generateTeal(name) {
  return `#pragma version 4
    byte "${name}"
    len
    int 3
    ==
    bnz main_l22
    byte "${name}"
    len
    int 4
    ==
    bnz main_l13
    byte "${name}"
    len
    int 5
    >=
    bnz main_l4
    err
    main_l4:
    gtxn 0 Amount
    int 5000000
    >=
    assert
    byte "${name}"
    len
    int 64
    <=
    assert
    int 0
    store 0
    main_l5:
    load 0
    byte "${name}"
    len
    <
    bnz main_l12
    global GroupSize
    int 2
    ==
    global GroupSize
    int 4
    ==
    ||
    assert
    gtxn 0 Sender
    gtxn 1 Sender
    ==
    assert
    gtxn 0 Receiver
    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4
    ==
    assert
    global GroupSize
    int 2
    ==
    bnz main_l11
    global GroupSize
    int 4
    ==
    bnz main_l10
    int 0
    return
    main_l9:
    int 1
    assert
    int 1
    b main_l31
    main_l10:
    gtxn 1 Receiver
    gtxn 2 Sender
    ==
    gtxn 2 ApplicationID
    int 628095415
    ==
    &&
    gtxn 2 OnCompletion
    int OptIn
    ==
    &&
    gtxn 3 ApplicationID
    int 628095415
    ==
    &&
    gtxn 3 Sender
    gtxn 0 Sender
    ==
    &&
    gtxna 3 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 3 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l9
    main_l11:
    gtxn 1 ApplicationID
    int 628095415
    ==
    gtxna 1 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 1 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l9
    main_l12:
    byte "${name}"
    load 0
    getbyte
    int 97
    >=
    byte "${name}"
    load 0
    getbyte
    int 122
    <=
    &&
    byte "${name}"
    load 0
    getbyte
    int 48
    >=
    byte "${name}"
    load 0
    getbyte
    int 57
    <=
    &&
    ||
    assert
    load 0
    int 1
    +
    store 0
    b main_l5
    main_l13:
    gtxn 0 Amount
    int 50000000
    >=
    assert
    byte "${name}"
    len
    int 64
    <=
    assert
    int 0
    store 0
    main_l14:
    load 0
    byte "${name}"
    len
    <
    bnz main_l21
    global GroupSize
    int 2
    ==
    global GroupSize
    int 4
    ==
    ||
    assert
    gtxn 0 Sender
    gtxn 1 Sender
    ==
    assert
    gtxn 0 Receiver
    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4
    ==
    assert
    global GroupSize
    int 2
    ==
    bnz main_l20
    global GroupSize
    int 4
    ==
    bnz main_l19
    int 0
    return
    main_l18:
    int 1
    assert
    int 1
    b main_l31
    main_l19:
    gtxn 1 Receiver
    gtxn 2 Sender
    ==
    gtxn 2 ApplicationID
    int 628095415
    ==
    &&
    gtxn 2 OnCompletion
    int OptIn
    ==
    &&
    gtxn 3 ApplicationID
    int 628095415
    ==
    &&
    gtxn 3 Sender
    gtxn 0 Sender
    ==
    &&
    gtxna 3 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 3 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l18
    main_l20:
    gtxn 1 ApplicationID
    int 628095415
    ==
    gtxna 1 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 1 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l18
    main_l21:
    byte "${name}"
    load 0
    getbyte
    int 97
    >=
    byte "${name}"
    load 0
    getbyte
    int 122
    <=
    &&
    byte "${name}"
    load 0
    getbyte
    int 48
    >=
    byte "${name}"
    load 0
    getbyte
    int 57
    <=
    &&
    ||
    assert
    load 0
    int 1
    +
    store 0
    b main_l14
    main_l22:
    gtxn 0 Amount
    int 150000000
    >=
    assert
    byte "${name}"
    len
    int 64
    <=
    assert
    int 0
    store 0
    main_l23:
    load 0
    byte "${name}"
    len
    <
    bnz main_l30
    global GroupSize
    int 2
    ==
    global GroupSize
    int 4
    ==
    ||
    assert
    gtxn 0 Sender
    gtxn 1 Sender
    ==
    assert
    gtxn 0 Receiver
    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4
    ==
    assert
    global GroupSize
    int 2
    ==
    bnz main_l29
    global GroupSize
    int 4
    ==
    bnz main_l28
    int 0
    return
    main_l27:
    int 1
    assert
    int 1
    b main_l31
    main_l28:
    gtxn 1 Receiver
    gtxn 2 Sender
    ==
    gtxn 2 ApplicationID
    int 628095415
    ==
    &&
    gtxn 2 OnCompletion
    int OptIn
    ==
    &&
    gtxn 3 ApplicationID
    int 628095415
    ==
    &&
    gtxn 3 Sender
    gtxn 0 Sender
    ==
    &&
    gtxna 3 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 3 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l27
    main_l29:
    gtxn 1 ApplicationID
    int 628095415
    ==
    gtxna 1 ApplicationArgs 0
    byte "register_name"
    ==
    &&
    gtxna 1 ApplicationArgs 1
    byte "${name}"
    ==
    &&
    assert
    b main_l27
    main_l30:
    byte "${name}"
    load 0
    getbyte
    int 97
    >=
    byte "${name}"
    load 0
    getbyte
    int 122
    <=
    &&
    byte "${name}"
    load 0
    getbyte
    int 48
    >=
    byte "${name}"
    load 0
    getbyte
    int 57
    <=
    &&
    ||
    assert
    load 0
    int 1
    +
    store 0
    b main_l23
    main_l31:
    return`;
}

// src/classes/resolver.ts
var Resolver = class {
  algodClient;
  indexerClient;
  constructor(client, indexer) {
    this.algodClient = client;
    this.indexerClient = indexer;
  }
  async generateLsig(name) {
    const client = this.algodClient;
    let program = await client.compile(generateTeal(name)).do();
    program = new Uint8Array(Buffer.from(program.result, "base64"));
    return new import_algosdk.default.LogicSigAccount(program);
  }
  async resolveName(name) {
    if (name.length === 0 || name.length > 64) {
      throw new InvalidNameError();
    } else {
      name = name.split(".algo")[0];
      name = name.toLowerCase();
      const indexer = await this.indexerClient;
      const lsig = await this.generateLsig(name);
      try {
        let accountInfo = await indexer.lookupAccountByID(lsig.address()).do();
        accountInfo = accountInfo.account["apps-local-state"];
        const length = accountInfo.length;
        let owner;
        let found = false;
        let socials = [], metadata = [];
        for (let i = 0; i < length; i++) {
          const app = accountInfo[i];
          if (app.id === APP_ID) {
            const kv = app["key-value"];
            const decodedKvPairs = this.decodeKvPairs(kv);
            socials = this.filterKvPairs(decodedKvPairs, "socials");
            metadata = this.filterKvPairs(decodedKvPairs, "metadata");
            found = true;
            owner = metadata.filter((kv2) => kv2.key === "owner")[0].value;
          }
        }
        if (found) {
          return {
            found: true,
            address: owner,
            socials,
            metadata
          };
        } else
          return { found: false };
      } catch (err) {
        return { found: false };
      }
    }
  }
  async getNamesOwnedByAddress(address, socials, metadata, limit) {
    const isValidAddress = await import_algosdk.default.isValidAddress(address);
    if (!isValidAddress) {
      throw new AddressValidationError();
    } else {
      const indexer = await this.indexerClient;
      let nextToken = "";
      let txnLength = 1;
      let txns = [];
      while (txnLength > 0) {
        try {
          const info = await indexer.searchForTransactions().address(address).addressRole("sender").afterTime("2022-02-24").txType("appl").applicationID(APP_ID).nextToken(nextToken).do();
          txnLength = info.transactions.length;
          if (txnLength > 0) {
            nextToken = info["next-token"];
            txns.push(info.transactions);
          }
        } catch (err) {
          return false;
        }
      }
      let accountTxns = [];
      for (let i = 0; i < txns.length; i++) {
        accountTxns = accountTxns.concat(txns[i]);
      }
      txns = accountTxns;
      const names = await this.filterDomainRegistrationTxns(txns);
      if (names.length > 0) {
        const details = [];
        for (let i = 0; i < names.length; i++) {
          if (limit !== void 0) {
            if (details.length >= limit)
              break;
          }
          const info = await this.resolveName(names[i]);
          if (info.found && info.address !== void 0) {
            if (info.address === address) {
              const domain = {
                name: ""
              };
              domain.name = names[i] + ".algo";
              if (socials)
                domain["socials"] = info.socials;
              if (metadata)
                domain["metadata"] = info.metadata;
              details.push(domain);
            }
          } else {
            i = i - 1;
          }
        }
        return details;
      }
    }
  }
  filterKvPairs(kvPairs, type) {
    const socials = [], metadata = [];
    for (const i in kvPairs) {
      const key = kvPairs[i].key;
      const value = kvPairs[i].value;
      const kvObj = {
        key,
        value
      };
      if (ALLOWED_SOCIALS.includes(key))
        socials.push(kvObj);
      else
        metadata.push(kvObj);
    }
    if (type === "socials")
      return socials;
    else if (type === "metadata")
      return metadata;
  }
  decodeKvPairs(kvPairs) {
    return kvPairs.map((kvPair) => {
      const decodedKvPair = {
        key: "",
        value: ""
      };
      let key = kvPair.key;
      key = Buffer.from(key, "base64").toString();
      decodedKvPair.key = key;
      const value = kvPair.value;
      if (key === "owner") {
        decodedKvPair.value = import_algosdk.default.encodeAddress(new Uint8Array(Buffer.from(value.bytes, "base64")));
      } else if (value.type === 1) {
        decodedKvPair.value = Buffer.from(value.bytes, "base64").toString();
      } else if (value.type === 2) {
        decodedKvPair.value = value.uint;
      }
      return decodedKvPair;
    });
  }
  async filterDomainRegistrationTxns(txns) {
    const names = [];
    const indexer = this.indexerClient;
    try {
      for (let i = 0; i < txns.length; i++) {
        const txn = txns[i];
        if (txn["tx-type"] === "appl") {
          if (txn["application-transaction"]["application-id"] === APP_ID) {
            const appArgs = txn["application-transaction"]["application-args"];
            if (Buffer.from(appArgs[0], "base64").toString() === "register_name") {
              if (!names.includes(Buffer.from(appArgs[1], "base64").toString()))
                names.push(Buffer.from(appArgs[1], "base64").toString());
            } else if (Buffer.from(appArgs[0], "base64").toString() === "accept_transfer") {
              const lsigAccount = txn["application-transaction"]["accounts"][0];
              let accountInfo = await indexer.lookupAccountByID(lsigAccount).do();
              accountInfo = accountInfo.account["apps-local-state"];
              const length = accountInfo.length;
              for (let i2 = 0; i2 < length; i2++) {
                if (accountInfo[i2].id === APP_ID) {
                  const kvPairs = accountInfo[i2]["key-value"];
                  const domainInfo = this.decodeKvPairs(kvPairs).filter((domain) => domain.key === "name");
                  if (!names.includes(domainInfo[0].value))
                    names.push(domainInfo[0].value);
                }
              }
            }
          }
        }
      }
    } catch (err) {
      return [];
    }
    return names;
  }
};

// src/classes/transactions.ts
var import_algosdk2 = __toESM(require("algosdk"));
var Transactions = class {
  algodClient;
  constructor(client) {
    this.algodClient = client;
  }
  async generateLsig(name) {
    const client = this.algodClient;
    let program = await client.compile(generateTeal(name)).do();
    program = new Uint8Array(Buffer.from(program.result, "base64"));
    return new import_algosdk2.default.LogicSigAccount(program);
  }
  async prepareNameRegistrationTransactions(name, address, period) {
    const algodClient = this.algodClient;
    let amount = 0;
    const lsig = await this.generateLsig(name);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1e3;
    params.flatFee = true;
    let receiver = import_algosdk2.default.getApplicationAddress(APP_ID);
    let sender = address;
    if (period === void 0)
      period = 0;
    else
      period--;
    if (name.length < 3)
      return;
    else if (name.length === 3)
      amount = REGISTRATION_PRICE.CHAR_3_AMOUNT + period * REGISTRATION_PRICE.CHAR_3_AMOUNT;
    else if (name.length === 4)
      amount = REGISTRATION_PRICE.CHAR_4_AMOUNT + period * REGISTRATION_PRICE.CHAR_4_AMOUNT;
    else if (name.length >= 5)
      amount = REGISTRATION_PRICE.CHAR_5_AMOUNT + period * REGISTRATION_PRICE.CHAR_5_AMOUNT;
    const closeToRemaninder = void 0;
    const note = void 0;
    const txn1 = import_algosdk2.default.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
    const groupTxns = [];
    groupTxns.push(txn1);
    sender = address;
    receiver = lsig.address();
    amount = 915e3;
    const txn2 = import_algosdk2.default.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
    groupTxns.push(txn2);
    const txn3 = await import_algosdk2.default.makeApplicationOptInTxnFromObject({
      from: lsig.address(),
      suggestedParams: params,
      appIndex: APP_ID
    });
    groupTxns.push(txn3);
    sender = lsig.address();
    receiver = address;
    amount = 0;
    const method = "register_name";
    const appArgs = [];
    period++;
    appArgs.push(new Uint8Array(Buffer.from(method)));
    appArgs.push(new Uint8Array(Buffer.from(name)));
    appArgs.push(import_algosdk2.default.encodeUint64(period));
    const txn4 = await import_algosdk2.default.makeApplicationNoOpTxn(address, params, APP_ID, appArgs, [lsig.address()]);
    groupTxns.push(txn4);
    import_algosdk2.default.assignGroupID(groupTxns);
    const signedOptinTxn = import_algosdk2.default.signLogicSigTransaction(groupTxns[2], lsig);
    return {
      optinTxn: signedOptinTxn,
      txns: groupTxns,
      unsignedOptinTxn: groupTxns[2]
    };
  }
  async prepareUpdateNamePropertyTransactions(name, address, editedHandles) {
    const algodClient = this.algodClient;
    const lsig = await this.generateLsig(name);
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
      const txn = await import_algosdk2.default.makeApplicationNoOpTxn(address, params, APP_ID, appArgs, [lsig.address()]);
      groupTxns.push(txn);
    }
    if (Object.keys(editedHandles).length > 1)
      import_algosdk2.default.assignGroupID(groupTxns);
    return groupTxns;
  }
  async preparePaymentTxn(sender, receiver, amt, note) {
    const algodClient = this.algodClient;
    const params = await algodClient.getTransactionParams().do();
    amt = import_algosdk2.default.algosToMicroalgos(amt);
    const enc = new TextEncoder();
    note = enc.encode(note);
    const closeToRemaninder = void 0;
    return import_algosdk2.default.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
  }
  async prepareNameRenewalTxns(name, sender, years, amt) {
    name = name.split(".algo")[0];
    const algodClient = this.algodClient;
    const params = await algodClient.getTransactionParams().do();
    const receiver = import_algosdk2.default.getApplicationAddress(APP_ID);
    const closeToRemaninder = void 0;
    const note = void 0;
    const paymentTxn = import_algosdk2.default.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
    const lsig = await this.generateLsig(name);
    const appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("renew_name")));
    appArgs.push(import_algosdk2.default.encodeUint64(years));
    const applicationTxn = import_algosdk2.default.makeApplicationNoOpTxn(sender, params, APP_ID, appArgs, [lsig.address()]);
    import_algosdk2.default.assignGroupID([paymentTxn, applicationTxn]);
    return [paymentTxn, applicationTxn];
  }
  async prepareInitiateNameTransferTransaction(name, sender, newOwner, price) {
    const algodClient = this.algodClient;
    price = import_algosdk2.default.algosToMicroalgos(price);
    const params = await algodClient.getTransactionParams().do();
    name = name.split(".algo")[0];
    const lsig = await this.generateLsig(name);
    const appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("initiate_transfer")));
    appArgs.push(import_algosdk2.default.encodeUint64(price));
    return import_algosdk2.default.makeApplicationNoOpTxn(sender, params, APP_ID, appArgs, [lsig.address(), newOwner]);
  }
  async prepareAcceptNameTransferTransactions(name, sender, receiver, amt) {
    amt = import_algosdk2.default.algosToMicroalgos(amt);
    const algodClient = this.algodClient;
    const params = await algodClient.getTransactionParams().do();
    const closeToRemaninder = void 0;
    const note = void 0;
    const paymentToOwnerTxn = import_algosdk2.default.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
    receiver = import_algosdk2.default.getApplicationAddress(APP_ID);
    const paymentToSmartContractTxn = import_algosdk2.default.makePaymentTxnWithSuggestedParams(sender, receiver, TRANSFER_FEE, closeToRemaninder, note, params);
    name = name.split(".algo")[0];
    const lsig = await this.generateLsig(name);
    const appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("accept_transfer")));
    const applicationTxn = import_algosdk2.default.makeApplicationNoOpTxn(sender, params, APP_ID, appArgs, [lsig.address()]);
    import_algosdk2.default.assignGroupID([
      paymentToOwnerTxn,
      paymentToSmartContractTxn,
      applicationTxn
    ]);
    return [
      paymentToOwnerTxn,
      paymentToSmartContractTxn,
      applicationTxn
    ];
  }
};

// src/index.ts
var import_algosdk3 = __toESM(require("algosdk"));
var AnsResolver = class {
  resolverInstance;
  transactionsInstance;
  constructor(client, indexer) {
    this.resolverInstance = new Resolver(client, indexer);
    this.transactionsInstance = new Transactions(client);
  }
  async isValidAddress(address) {
    return import_algosdk3.default.isValidAddress(address);
  }
  async isValidName(name) {
    name = name.split(".algo")[0];
    const lengthOfName = name.length;
    for (let i = 0; i < lengthOfName; i++) {
      if (!(name.charCodeAt(i) >= ASCII_CODES.ASCII_0 && name.charCodeAt(i) <= ASCII_CODES.ASCII_9)) {
        if (!(name.charCodeAt(i) >= ASCII_CODES.ASCII_A && name.charCodeAt(i) <= ASCII_CODES.ASCII_Z))
          throw new InvalidNameError();
      }
    }
    return true;
  }
  async isValidTransaction(name, sender, receiver, method) {
    name = name.split(".algo")[0];
    if (!await this.isValidName(name))
      return;
    if (!await this.isValidAddress(sender))
      throw new AddressValidationError();
    if (!receiver && !method) {
      const nameInfo = await this.resolveName(name);
      if (nameInfo["found"]) {
        if (nameInfo["address"] !== sender)
          throw new IncorrectOwnerError(name, sender);
      }
    } else if (sender && receiver) {
      if (method === "initiate_transfer") {
        const nameInfo = await this.resolveName(name);
        if (nameInfo["found"]) {
          if (nameInfo["address"] !== sender)
            throw new IncorrectOwnerError(name, sender);
        }
      } else if (method === "accept_transfer") {
        const nameInfo = await this.resolveName(name);
        if (nameInfo["found"]) {
          if (nameInfo["address"] !== receiver)
            throw new IncorrectOwnerError(name, sender);
        }
      }
    }
    return true;
  }
  async resolveName(name) {
    if (!await this.isValidName(name))
      return;
    return await this.resolverInstance.resolveName(name);
  }
  async getNamesOwnedByAddress(account, socials, metadata, limit) {
    if (!await this.isValidAddress(account))
      throw new AddressValidationError();
    return await this.resolverInstance.getNamesOwnedByAddress(account, socials, metadata, limit);
  }
  async prepareNameRegistrationTransactions(name, address, period) {
    await this.isValidName(name);
    if (!await this.isValidAddress(address))
      throw new AddressValidationError();
    const nameInfo = await this.resolveName(name);
    if (nameInfo["found"])
      throw new Error("Name already registered");
    try {
      return await this.transactionsInstance.prepareNameRegistrationTransactions(name, address, period);
    } catch (err) {
      return err.message;
    }
  }
  async prepareUpdateNamePropertyTransactions(name, address, editedHandles) {
    await this.isValidTransaction(name, address);
    const nameInfo = await this.resolveName(name);
    if (!nameInfo["found"])
      throw new NameNotRegisteredError(name);
    try {
      return await this.transactionsInstance.prepareUpdateNamePropertyTransactions(name, address, editedHandles);
    } catch (err) {
      return err.message;
    }
  }
  async preparePaymentTxn(sender, receiver, amt, note) {
    try {
      return await this.transactionsInstance.preparePaymentTxn(sender, receiver, amt, note);
    } catch (err) {
      return err.message;
    }
  }
  async prepareNameRenewalTransactions(name, sender, years) {
    await this.isValidTransaction(name, sender);
    const nameInfo = await this.resolveName(name);
    if (!nameInfo["found"])
      throw new NameNotRegisteredError(name);
    try {
      let amt = 0;
      name = name.split(".algo")[0];
      if (name.length < 3)
        return;
      if (name.length === 3)
        amt = REGISTRATION_PRICE.CHAR_3_AMOUNT * years;
      else if (name.length === 4)
        amt = REGISTRATION_PRICE.CHAR_4_AMOUNT * years;
      else if (name.length >= 5)
        amt = REGISTRATION_PRICE.CHAR_5_AMOUNT * years;
      return await this.transactionsInstance.prepareNameRenewalTxns(name, sender, years, amt);
    } catch (err) {
      return err.message;
    }
  }
  async prepareInitiateNameTransferTransaction(name, sender, newOwner, price) {
    await this.isValidTransaction(name, sender, newOwner, "initiate_transfer");
    const nameInfo = await this.resolveName(name);
    if (!nameInfo["found"])
      throw new NameNotRegisteredError(name);
    try {
      return await this.transactionsInstance.prepareInitiateNameTransferTransaction(name, sender, newOwner, price);
    } catch (err) {
      return err.message;
    }
  }
  async prepareAcceptNameTransferTransactions(name, sender, receiver, amt) {
    await this.isValidTransaction(name, sender, receiver, "accept_transfer");
    const nameInfo = await this.resolveName(name);
    if (!nameInfo["found"])
      throw new NameNotRegisteredError(name);
    try {
      return await this.transactionsInstance.prepareAcceptNameTransferTransactions(name, sender, receiver, amt);
    } catch (err) {
      return err.message;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnsResolver
});
