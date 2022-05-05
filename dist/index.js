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
  ANS: () => ANS
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
    const isValidAddress2 = await import_algosdk.default.isValidAddress(address);
    if (!isValidAddress2) {
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
  async owner(name) {
    const domainInformation = await this.resolveName(name.split(".algo")[0]);
    if (domainInformation.found === true) {
      return domainInformation.address;
    } else
      return "Not Registered";
  }
  async text(name, key) {
    const domainInformation = await this.resolveName(name);
    if (domainInformation.found === true) {
      const textRecords = domainInformation.socials.filter((social) => social.key === key);
      if (textRecords.length > 0)
        return domainInformation.socials.filter((social) => social.key === key)[0].value;
      else
        return "Property Not Set";
    } else
      return "Not Registered";
  }
  async expiry(name) {
    const domainInformation = await this.resolveName(name.split(".algo")[0]);
    if (domainInformation.found === true) {
      return new Date(domainInformation.metadata.filter((data) => data.key === "expiry")[0].value * 1e3);
    } else
      return "Not Registered";
  }
  async content() {
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
    return import_algosdk2.default.makeApplicationNoOpTxn(sender, params, APP_ID, appArgs, [
      lsig.address(),
      newOwner
    ]);
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
    return [paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn];
  }
};

// src/utility/common.ts
var import_algosdk3 = __toESM(require("algosdk"));
function isValidAddress(address) {
  return import_algosdk3.default.isValidAddress(address);
}
function isValidName(name) {
  name = name.split(".algo")[0];
  const lengthOfName = name.length;
  for (let i = 0; i < lengthOfName; i++) {
    if (!(name.charCodeAt(i) >= ASCII_CODES.ASCII_0 && name.charCodeAt(i) <= ASCII_CODES.ASCII_9)) {
      if (!(name.charCodeAt(i) >= ASCII_CODES.ASCII_A && name.charCodeAt(i) <= ASCII_CODES.ASCII_Z))
        return false;
    }
  }
  return true;
}

// src/index.ts
var Name = class {
  name = "";
  resolver;
  transactions;
  constructor(options) {
    const { name, client, indexer } = options;
    this.name = name;
    this.resolver = new Resolver(client, indexer);
    this.transactions = new Transactions(client);
  }
  async isRegistered() {
    const status = await this.resolver.resolveName(this.name);
    return status.found;
  }
  async getOwner() {
    return await this.resolver.owner(this.name);
  }
  async getContent() {
    return await this.resolver.content(this.name);
  }
  async getText(key) {
    return await this.resolver.text(this.name, key);
  }
  async getAllInformation() {
    return await this.resolver.resolveName(this.name);
  }
  async getExpiry() {
    return await this.resolver.expiry(this.name);
  }
  async isValidTransaction(sender, receiver, method) {
    if (!await this.isRegistered())
      throw new NameNotRegisteredError(this.name);
    if (!isValidAddress(sender))
      throw new AddressValidationError();
    if (receiver) {
      if (!isValidAddress(receiver))
        throw new AddressValidationError();
    }
    const owner = await this.getOwner();
    if (!await isValidName(this.name))
      throw new InvalidNameError();
    if (!await isValidAddress(sender))
      throw new AddressValidationError();
    if (!receiver && !method) {
      if (owner !== sender) {
        throw new IncorrectOwnerError(this.name, sender);
      }
    } else if (sender && receiver) {
      if (method === "initiate_transfer") {
        if (owner !== sender) {
          throw new IncorrectOwnerError(this.name, sender);
        }
      } else if (method === "accept_transfer") {
        if (owner !== receiver) {
          throw new IncorrectOwnerError(this.name, receiver);
        }
      }
    }
    return true;
  }
  async register(address, period) {
    if (await this.isRegistered())
      throw new Error("Name already registered");
    if (!isValidAddress(address))
      throw new AddressValidationError();
    else {
      return await this.transactions.prepareNameRegistrationTransactions(this.name, address, period);
    }
  }
  async update(address, editedHandles) {
    await this.isValidTransaction(address);
    return await this.transactions.prepareUpdateNamePropertyTransactions(this.name, address, editedHandles);
  }
  async renew(address, years) {
    await this.isValidTransaction(address);
    return await this.transactions.prepareNameRenewalTxns(this.name, address, years);
  }
  async initTransfer(owner, newOwner, price) {
    await this.isValidTransaction(owner, newOwner, "initiate_transfer");
    return await this.transactions.prepareInitiateNameTransferTransaction(this.name, owner, newOwner, price);
  }
  async acceptTransfer(newOwner, owner, price) {
    await this.isValidTransaction(newOwner, owner, "accept_transfer");
    return await this.transactions.prepareAcceptNameTransferTransactions(this.name, newOwner, owner, price);
  }
};
var Address = class {
  address = "";
  resolver;
  constructor(options) {
    const { address, client, indexer } = options;
    this.address = address;
    this.resolver = new Resolver(client, indexer);
  }
  async getNames(options) {
    const socials = (options == null ? void 0 : options.socials) || false, metadata = (options == null ? void 0 : options.metadata) || false, limit = options == null ? void 0 : options.metadata;
    return await this.resolver.getNamesOwnedByAddress(this.address, socials, metadata, limit);
  }
};
var ANS = class {
  client;
  indexer;
  constructor(client, indexer) {
    this.client = client;
    this.indexer = indexer;
  }
  name(name) {
    if (name.length > 0)
      name = name.toLowerCase();
    name = name.split(".algo")[0];
    if (!isValidName(name))
      throw new InvalidNameError();
    return new Name({
      client: this.client,
      indexer: this.indexer,
      name
    });
  }
  address(address) {
    if (!isValidAddress(address))
      throw new AddressValidationError();
    return new Address({
      client: this.client,
      indexer: this.indexer,
      address
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ANS
});
//# sourceMappingURL=index.js.map