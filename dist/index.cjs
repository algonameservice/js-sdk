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
  ANS: () => ANS,
  AddressValidationError: () => AddressValidationError,
  IncorrectOwnerError: () => IncorrectOwnerError,
  InvalidNameError: () => InvalidNameError,
  NameNotRegisteredError: () => NameNotRegisteredError,
  PropertyNotSetError: () => PropertyNotSetError,
  Resolver: () => Resolver,
  Transactions: () => Transactions
});
module.exports = __toCommonJS(src_exports);

// src/errors.ts
var AddressValidationError = class extends Error {
  constructor() {
    super(`This is not a valid Algorand address`);
    this.name = "InvalidAddressError";
    this.type = "InvalidAddressError";
  }
};
var InvalidNameError = class extends Error {
  constructor() {
    super(`The name must be between 3 and 64 characters and must only contain a-z and 0-9 characters`);
    this.name = "InvalidNameError";
    this.type = "InvalidNameError";
  }
};
var NameNotRegisteredError = class extends Error {
  constructor(name) {
    super(`Name ${name}.algo is not registered`);
    this.name = "NameNotRegisteredError";
    this.type = "NameNotRegisteredError";
  }
};
var IncorrectOwnerError = class extends Error {
  constructor(name, address) {
    super(`Name ${name}.algo is not owned by ${address}`);
    this.name = "IncorrectOwnerError";
    this.type = "IncorrectOwnerError";
  }
};
var PropertyNotSetError = class extends Error {
  constructor(property) {
    super(`Property ${property} is not set`);
    this.name = "PropertyNotSetError";
    this.type = "PropertyNotSetError";
  }
};

// src/validation.ts
var import_algosdk = __toESM(require("algosdk"), 1);

// src/constants.ts
var APP_ID = 628095415;
var TESTNET_APP_ID = 75101786;
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
var TESTNET_ESCROW = "ACFFHRILZQ6W2UDNYYTHV55YS6MZWJR4PEDVBFAL575FFK4AT4UBCO3SXE";
var MAINNET_ESCROW = "SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4";
var ALLOWED_TLDS = ["algo"];

// src/validation.ts
function isValidAddress(address) {
  return import_algosdk.default.isValidAddress(address);
}
function normalizeName(name) {
  const tld = name.split(".").pop();
  if (!ALLOWED_TLDS.includes(tld)) {
    throw new Error("TLD not supported");
  }
  name = name.split(".")[0].toLowerCase();
  const lengthOfName = name.length;
  if (lengthOfName > 64) {
    throw new InvalidNameError();
  }
  for (let i = 0; i < lengthOfName; i++) {
    if (!(name.charCodeAt(i) >= ASCII_CODES.ASCII_0 && name.charCodeAt(i) <= ASCII_CODES.ASCII_9)) {
      if (!(name.charCodeAt(i) >= ASCII_CODES.ASCII_A && name.charCodeAt(i) <= ASCII_CODES.ASCII_Z))
        throw new InvalidNameError();
    }
  }
  return name;
}

// src/resolver.ts
var import_algosdk3 = __toESM(require("algosdk"), 1);

// src/cachedApi.ts
var import_algosdk2 = __toESM(require("algosdk"), 1);

// src/util.ts
function generateTeal(name, escrow, app) {
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
    addr ${escrow}
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
    int ${app}
    ==
    &&
    gtxn 2 OnCompletion
    int OptIn
    ==
    &&
    gtxn 3 ApplicationID
    int ${app}
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
    int ${app}
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
    addr ${escrow}
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
    int ${app}
    ==
    &&
    gtxn 2 OnCompletion
    int OptIn
    ==
    &&
    gtxn 3 ApplicationID
    int ${app}
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
    int ${app}
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
    addr ${escrow}
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
    int ${app}
    ==
    &&
    gtxn 2 OnCompletion
    int OptIn
    ==
    &&
    gtxn 3 ApplicationID
    int ${app}
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
    int ${app}
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
function b64toString(data) {
  return Buffer.from(data, "base64").toString();
}
function toIntArray(data) {
  return new Uint8Array(Buffer.from(data));
}

// src/cachedApi.ts
var CachedApi = class {
  constructor(client, indexer, network, appId) {
    this.cache = {};
    this.ESCROW = MAINNET_ESCROW;
    this.APP = APP_ID;
    var _a;
    this.rpc = client;
    this.indexer = indexer;
    if (network === "testnet") {
      this.ESCROW = (_a = import_algosdk2.default.getApplicationAddress(appId != null ? appId : TESTNET_APP_ID)) != null ? _a : TESTNET_ESCROW;
      this.APP = appId != null ? appId : TESTNET_APP_ID;
    }
  }
  async getTeal(name) {
    if (name in this.cache) {
      return this.cache[name];
    }
    let program = await this.rpc.compile(generateTeal(name, this.ESCROW, this.APP)).do();
    program = new Uint8Array(Buffer.from(program.result, "base64"));
    this.cache[name] = new import_algosdk2.default.LogicSigAccount(program);
    return this.cache[name];
  }
};

// src/resolver.ts
var Resolver = class extends CachedApi {
  constructor(client, indexer, name, network, app) {
    super(client, indexer, network, app);
    this.name = name;
  }
  checkName(name) {
    if (!name) {
      name = this == null ? void 0 : this.name.name;
    }
    if (!name) {
      throw new Error("A name must be provided");
    }
    return name;
  }
  async resolveName(name) {
    var _a;
    name = this.checkName(name);
    let found = false;
    const error = {
      found: false,
      socials: [],
      metadata: [],
      address: "Not Registered",
      value: "Not Registered"
    };
    try {
      if (!this.resolvedData || name !== ((_a = this.name) == null ? void 0 : _a.name)) {
        this.resolvedData = await this.indexer.lookupAccountByID((await this.getTeal(name)).address()).do();
      }
      let accountInfo = this.resolvedData;
      accountInfo = accountInfo.account["apps-local-state"];
      const length = accountInfo.length;
      let address, value;
      let socials = [], metadata = [];
      for (let i = 0; i < length; i++) {
        const app = accountInfo[i];
        if (app.id === this.APP) {
          const kv = app["key-value"];
          const decodedKvPairs = this.decodeKvPairs(kv);
          socials = this.filterKvPairs(decodedKvPairs, "socials");
          metadata = this.filterKvPairs(decodedKvPairs, "metadata");
          found = true;
          address = metadata.filter((kv2) => kv2.key === "owner")[0].value;
          value = metadata.filter((kv2) => kv2.key === "account" || kv2.key === "value");
          if (value.length > 0) {
            value = value[0].value;
          } else {
            value = address;
          }
        }
      }
      if (found) {
        return {
          found,
          address,
          socials,
          metadata,
          value
        };
      }
      return error;
    } catch (err) {
      return error;
    }
  }
  async getNamesOwnedByAddress(address, socials = false, metadata = false, limit = 10) {
    if (!await import_algosdk3.default.isValidAddress(address)) {
      throw new AddressValidationError();
    }
    let nextToken = "";
    let txnLength = 1;
    let txns = [];
    while (txnLength > 0) {
      try {
        const info = await this.indexer.searchForTransactions().address(address).addressRole("sender").afterTime("2022-02-24").txType("appl").applicationID(this.APP).nextToken(nextToken).do();
        txnLength = info.transactions.length;
        if (txnLength > 0) {
          nextToken = info["next-token"];
          txns.push(info.transactions);
        }
      } catch (err) {
        return [];
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
        if (details.length && details.length >= limit) {
          break;
        }
        const info = await this.resolveName(names[i]);
        if (!info.found) {
          i--;
          continue;
        }
        if (info.found && info.address === address) {
          const domain = {
            address: "",
            found: true,
            name: ""
          };
          domain.name = names[i] + ".algo";
          domain.address = info.address;
          if (socials) {
            domain.socials = info.socials;
          }
          if (metadata) {
            domain.metadata = info.metadata;
          }
          details.push(domain);
        }
      }
      return details;
    }
    return [];
  }
  filterKvPairs(kvPairs, type) {
    const socials = [], metadata = [];
    for (const i in kvPairs) {
      const { key, value } = kvPairs[i];
      const kvObj = {
        key,
        value
      };
      if (ALLOWED_SOCIALS.includes(key)) {
        socials.push(kvObj);
        continue;
      }
      metadata.push(kvObj);
    }
    if (type === "socials") {
      return socials;
    }
    if (type === "metadata") {
      return metadata;
    }
    return [];
  }
  decodeKvPairs(kvPairs) {
    return kvPairs.map((kvPair) => {
      const decodedKvPair = {
        key: "",
        value: ""
      };
      let { key } = kvPair;
      const { value } = kvPair;
      key = Buffer.from(key, "base64").toString();
      decodedKvPair.key = key;
      if (key === "owner" || key === "transfer_to" || key === "account" || key === "value") {
        decodedKvPair.value = import_algosdk3.default.encodeAddress(new Uint8Array(Buffer.from(value.bytes, "base64")));
        return decodedKvPair;
      }
      if (value.type === 1) {
        decodedKvPair.value = Buffer.from(value.bytes, "base64").toString();
      }
      if (value.type === 2) {
        decodedKvPair.value = value.uint;
      }
      return decodedKvPair;
    });
  }
  async filterDomainRegistrationTxns(txns) {
    const names = [];
    try {
      for (let i = 0; i < txns.length; i++) {
        const txn = txns[i];
        if (txn["tx-type"] === "appl") {
          if (txn["application-transaction"]["application-id"] === this.APP) {
            const appArgs = txn["application-transaction"]["application-args"];
            if (Buffer.from(appArgs[0], "base64").toString() === "register_name") {
              const decodedName = b64toString(appArgs[1]);
              if (!names.includes(decodedName)) {
                names.push(decodedName);
              }
            } else if (b64toString(appArgs[0]) === "accept_transfer") {
              const lsigAccount = txn["application-transaction"]["accounts"][0];
              let accountInfo = await this.indexer.lookupAccountByID(lsigAccount).do();
              accountInfo = accountInfo.account["apps-local-state"];
              const length = accountInfo.length;
              for (let i2 = 0; i2 < length; i2++) {
                if (accountInfo[i2].id === this.APP) {
                  const kvPairs = accountInfo[i2]["key-value"];
                  const domainInfo = this.decodeKvPairs(kvPairs).filter((domain) => domain.key === "name");
                  if (!names.includes(domainInfo[0].value)) {
                    names.push(domainInfo[0].value);
                  }
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
  async getDefaultDomain(address) {
    let nextToken = "";
    let txnLength = 1;
    let txns = [];
    while (txnLength > 0) {
      try {
        const info = await this.indexer.searchForTransactions().address(address).addressRole("sender").afterTime("2022-02-24").txType("appl").applicationID(this.APP).nextToken(nextToken).do();
        txnLength = info.transactions.length;
        if (txnLength > 0) {
          nextToken = info["next-token"];
          txns.push(info.transactions);
        }
      } catch (err) {
        throw Error("No transactions found");
      }
    }
    let accountTxns = [];
    for (let i = 0; i < txns.length; i++) {
      accountTxns = accountTxns.concat(txns[i]);
    }
    txns = accountTxns;
    const appArgs = txns.map((txn) => txn["application-transaction"]["application-args"][0]);
    const appAccounts = txns.map((txn) => txn["application-transaction"]["accounts"]);
    for (const i in appArgs) {
      if (Buffer.from(appArgs[i], "base64").toString() === "set_default_account") {
        const account = appAccounts[i];
        let accountInfo = await this.indexer.lookupAccountByID(account).do();
        accountInfo = accountInfo["account"]["apps-local-state"];
        for (const i2 in accountInfo) {
          if (accountInfo[i2].id === this.APP) {
            const domain = this.decodeKvPairs(accountInfo[i2]["key-value"]).filter((kv) => kv.key === "name");
            if (domain.length > 0) {
              return domain[0].value + ".algo";
            } else {
              throw Error("Default domain not set");
            }
          }
        }
      }
    }
    const domains = await this.getNamesOwnedByAddress(address, false, false, 1);
    if (domains.length > 0) {
      return domains[0].name;
    }
    throw Error("No domains owned by this address");
  }
  async owner() {
    const domainInformation = await this.resolveName();
    if (domainInformation.found) {
      return domainInformation.address;
    }
    throw new NameNotRegisteredError(this.name.name);
  }
  async value() {
    const domainInformation = await this.resolveName();
    if (domainInformation.found) {
      return domainInformation.value;
    }
    throw new NameNotRegisteredError(this.name.name);
  }
  async text(key) {
    var _a, _b;
    const domainInformation = await this.resolveName();
    if (domainInformation.found) {
      const socialRecords = (_a = domainInformation.socials) == null ? void 0 : _a.filter((social) => social.key === key);
      if (socialRecords && socialRecords.length > 0) {
        return socialRecords[0].value;
      }
      const metadataRecords = (_b = domainInformation.metadata) == null ? void 0 : _b.filter((metadata) => metadata.key === key);
      if (metadataRecords && metadataRecords.length > 0) {
        return metadataRecords[0].value;
      }
      throw new PropertyNotSetError(key);
    }
    throw new NameNotRegisteredError(this.name.name);
  }
  async expiry() {
    const domainInformation = await this.resolveName();
    if (domainInformation.found) {
      return new Date(parseInt(domainInformation == null ? void 0 : domainInformation.metadata.filter((data) => data.key === "expiry")[0].value) * 1e3);
    }
    throw new NameNotRegisteredError(this.name.name);
  }
  async content() {
    const domainInformation = await this.resolveName();
    if (domainInformation.found) {
      const contentRecords = domainInformation == null ? void 0 : domainInformation.metadata.filter((kv) => kv.key === "content");
      if (contentRecords.length > 0) {
        return contentRecords[0].value;
      }
      return "Content field is not set";
    }
    throw new NameNotRegisteredError(this._name);
  }
};

// src/transactions.ts
var import_algosdk4 = __toESM(require("algosdk"), 1);
var Transactions = class extends CachedApi {
  constructor(client, indexer, name, network, app) {
    super(client, indexer, network, app);
    if (name instanceof Name) {
      this.name = name.name;
    } else {
      this.name = name;
    }
  }
  calculatePrice(period) {
    const amounts = {
      3: REGISTRATION_PRICE.CHAR_3_AMOUNT,
      4: REGISTRATION_PRICE.CHAR_4_AMOUNT,
      5: REGISTRATION_PRICE.CHAR_5_AMOUNT
    };
    const len = this.name.length >= 5 ? 5 : this.name.length;
    return amounts[len] * period;
  }
  async prepareNameRegistrationTransactions(address, period) {
    const algodClient = this.rpc;
    let amount = 0;
    const lsig = await this.getTeal(this.name);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1e3;
    params.flatFee = true;
    let receiver = import_algosdk4.default.getApplicationAddress(this.APP);
    let sender = address;
    if (period === void 0) {
      period = 1;
    }
    amount = this.calculatePrice(period);
    const closeToRemaninder = void 0;
    const note = void 0;
    const txn1 = import_algosdk4.default.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
    const groupTxns = [];
    groupTxns.push(txn1);
    sender = address;
    receiver = lsig.address();
    amount = 915e3;
    const txn2 = import_algosdk4.default.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
    groupTxns.push(txn2);
    const txn3 = await import_algosdk4.default.makeApplicationOptInTxnFromObject({
      from: lsig.address(),
      suggestedParams: params,
      appIndex: this.APP
    });
    groupTxns.push(txn3);
    const method = "register_name";
    const appArgs = [];
    appArgs.push(toIntArray(method));
    appArgs.push(toIntArray(this.name));
    appArgs.push(import_algosdk4.default.encodeUint64(period));
    const txn4 = await import_algosdk4.default.makeApplicationNoOpTxn(address, params, this.APP, appArgs, [lsig.address()]);
    groupTxns.push(txn4);
    import_algosdk4.default.assignGroupID(groupTxns);
    const signedOptinTxn = import_algosdk4.default.signLogicSigTransaction(groupTxns[2], lsig);
    return {
      optinTxn: signedOptinTxn,
      txns: groupTxns,
      unsignedOptinTxn: groupTxns[2]
    };
  }
  async prepareUpdateNamePropertyTransactions(address, editedHandles) {
    const lsig = await this.getTeal(this.name);
    const params = await this.rpc.getTransactionParams().do();
    params.fee = 1e3;
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
      const txn = await import_algosdk4.default.makeApplicationNoOpTxn(address, params, this.APP, appArgs, [lsig.address()]);
      groupTxns.push(txn);
    }
    if (Object.keys(editedHandles).length > 1) {
      import_algosdk4.default.assignGroupID(groupTxns);
    }
    return groupTxns;
  }
  async prepareNameRenewalTxns(sender, years) {
    const params = await this.rpc.getTransactionParams().do();
    const receiver = import_algosdk4.default.getApplicationAddress(this.APP);
    const closeToRemaninder = void 0;
    const note = void 0;
    const paymentTxn = import_algosdk4.default.makePaymentTxnWithSuggestedParams(sender, receiver, this.calculatePrice(years), closeToRemaninder, note, params);
    const lsig = await this.getTeal(this.name);
    const appArgs = [];
    appArgs.push(toIntArray("renew_name"));
    appArgs.push(import_algosdk4.default.encodeUint64(years));
    const applicationTxn = import_algosdk4.default.makeApplicationNoOpTxn(sender, params, this.APP, appArgs, [lsig.address()]);
    import_algosdk4.default.assignGroupID([paymentTxn, applicationTxn]);
    return [paymentTxn, applicationTxn];
  }
  async prepareUpdateValueTxn(address, value) {
    const params = await this.rpc.getTransactionParams().do();
    const lsig = await this.getTeal(this.name);
    const appArgs = [];
    appArgs.push(toIntArray("set_default_account"));
    return import_algosdk4.default.makeApplicationNoOpTxn(address, params, this.APP, appArgs, [
      lsig.address(),
      value
    ]);
  }
  async prepareSetDefaultDomainTxn(address) {
    const params = await this.rpc.getTransactionParams().do();
    const lsig = await this.getTeal(this.name);
    const appArgs = [];
    appArgs.push(toIntArray("set_default_account"));
    return import_algosdk4.default.makeApplicationNoOpTxn(address, params, this.APP, appArgs, [
      lsig.address()
    ]);
  }
  async prepareInitiateNameTransferTransaction(sender, newOwner, price) {
    price = import_algosdk4.default.algosToMicroalgos(price);
    const params = await this.rpc.getTransactionParams().do();
    const lsig = await this.getTeal(this.name);
    const appArgs = [];
    appArgs.push(toIntArray("initiate_transfer"));
    appArgs.push(import_algosdk4.default.encodeUint64(price));
    return import_algosdk4.default.makeApplicationNoOpTxn(sender, params, this.APP, appArgs, [
      lsig.address(),
      newOwner
    ]);
  }
  async prepareAcceptNameTransferTransactions(sender, receiver, amt) {
    amt = import_algosdk4.default.algosToMicroalgos(amt);
    const params = await this.rpc.getTransactionParams().do();
    const closeToRemaninder = void 0;
    const note = void 0;
    const paymentToOwnerTxn = import_algosdk4.default.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
    receiver = import_algosdk4.default.getApplicationAddress(this.APP);
    const paymentToSmartContractTxn = import_algosdk4.default.makePaymentTxnWithSuggestedParams(sender, receiver, TRANSFER_FEE, closeToRemaninder, note, params);
    const lsig = await this.getTeal(this.name);
    const appArgs = [];
    appArgs.push(toIntArray("accept_transfer"));
    const applicationTxn = import_algosdk4.default.makeApplicationNoOpTxn(sender, params, this.APP, appArgs, [lsig.address()]);
    import_algosdk4.default.assignGroupID([
      paymentToOwnerTxn,
      paymentToSmartContractTxn,
      applicationTxn
    ]);
    return [paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn];
  }
};

// src/name.ts
var Name = class {
  constructor(options) {
    const { name, rpc, indexer, network, app } = options;
    this._name = name;
    this.resolver = new Resolver(rpc, indexer, this, network, app);
    this.transactions = new Transactions(rpc, indexer, this, network, app);
  }
  get name() {
    return this._name;
  }
  async isRegistered() {
    const status = await this.resolver.resolveName();
    return status.found;
  }
  async getOwner() {
    return await this.resolver.owner();
  }
  async getValue() {
    return await this.resolver.value();
  }
  async getContent() {
    return await this.resolver.content();
  }
  async getText(key) {
    return await this.resolver.text(key);
  }
  async getAllInformation() {
    return await this.resolver.resolveName();
  }
  async getExpiry() {
    return await this.resolver.expiry();
  }
  async isValidTransaction(sender, receiver, method) {
    if (!await this.isRegistered()) {
      throw new NameNotRegisteredError(this._name);
    }
    if (!isValidAddress(sender)) {
      throw new AddressValidationError();
    }
    if (receiver) {
      if (!isValidAddress(receiver))
        throw new AddressValidationError();
    }
    const owner = await this.getOwner();
    if (!await isValidAddress(sender)) {
      throw new AddressValidationError();
    }
    if (!receiver && !method) {
      if (owner !== sender) {
        throw new IncorrectOwnerError(this._name, sender);
      }
    } else if (sender && receiver) {
      if (method === "initiate_transfer") {
        if (owner !== sender) {
          throw new IncorrectOwnerError(this._name, sender);
        }
      } else if (method === "accept_transfer") {
        if (owner !== receiver) {
          throw new IncorrectOwnerError(this._name, receiver);
        }
      }
    }
    return true;
  }
  async register(address, period) {
    if (await this.isRegistered()) {
      throw new Error("Name already registered");
    }
    if (!isValidAddress(address)) {
      throw new AddressValidationError();
    }
    return await this.transactions.prepareNameRegistrationTransactions(address, period);
  }
  async update(address, editedHandles) {
    await this.isValidTransaction(address);
    return await this.transactions.prepareUpdateNamePropertyTransactions(address, editedHandles);
  }
  async renew(address, years) {
    await this.isValidTransaction(address);
    return await this.transactions.prepareNameRenewalTxns(address, years);
  }
  async setValue(address, value) {
    await this.isValidTransaction(address);
    return await this.transactions.prepareUpdateValueTxn(address, value);
  }
  async setDefaultDomain(address) {
    await this.isValidTransaction(address);
    return await this.transactions.prepareSetDefaultDomainTxn(address);
  }
  async initTransfer(owner, newOwner, price) {
    await this.isValidTransaction(owner, newOwner, "initiate_transfer");
    return await this.transactions.prepareInitiateNameTransferTransaction(owner, newOwner, price);
  }
  async acceptTransfer(newOwner, owner, price) {
    await this.isValidTransaction(newOwner, owner, "accept_transfer");
    return await this.transactions.prepareAcceptNameTransferTransactions(newOwner, owner, price);
  }
};

// src/address.ts
var Address = class {
  constructor(options) {
    const { address, rpc, indexer, network, app } = options;
    this.address = address;
    this.resolver = new Resolver(rpc, indexer, void 0, network, app);
  }
  async getNames(options) {
    return await this.resolver.getNamesOwnedByAddress(this.address, options == null ? void 0 : options.socials, options == null ? void 0 : options.metadata, options == null ? void 0 : options.limit);
  }
  async getDefaultDomain() {
    return await this.resolver.getDefaultDomain(this.address);
  }
};

// src/index.ts
var ANS = class extends CachedApi {
  constructor(client, indexer, network, appId) {
    super(client, indexer, network, appId);
    this.network = "mainnet";
    if (network === "testnet") {
      this.network = "testnet";
    }
  }
  name(name) {
    name = normalizeName(name);
    return new Name({
      rpc: this.rpc,
      indexer: this.indexer,
      name,
      network: this.network,
      app: this.APP
    });
  }
  address(address) {
    if (!isValidAddress(address)) {
      throw new AddressValidationError();
    }
    return new Address({
      rpc: this.rpc,
      indexer: this.indexer,
      address,
      network: this.network,
      app: this.APP
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ANS,
  AddressValidationError,
  IncorrectOwnerError,
  InvalidNameError,
  NameNotRegisteredError,
  PropertyNotSetError,
  Resolver,
  Transactions
});
//# sourceMappingURL=index.cjs.map