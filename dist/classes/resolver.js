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

// src/classes/resolver.ts
var resolver_exports = {};
__export(resolver_exports, {
  Resolver: () => Resolver
});
module.exports = __toCommonJS(resolver_exports);
var import_algosdk = __toESM(require("algosdk"));

// src/constants.ts
var APP_ID = 628095415;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Resolver
});
