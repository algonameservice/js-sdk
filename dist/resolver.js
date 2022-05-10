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

// src/errors.js
var require_errors = __commonJS({
  "src/errors.js"(exports) {
    "use strict";
    init_cjs_shims();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    exports.__esModule = true;
    var AddressValidationError2 = function(_super) {
      __extends(AddressValidationError3, _super);
      function AddressValidationError3() {
        var _this = _super.call(this, "This is not a valid Algorand address") || this;
        _this.name = "InvalidAddressError";
        _this.type = "InvalidAddressError";
        return _this;
      }
      return AddressValidationError3;
    }(Error);
    exports.AddressValidationError = AddressValidationError2;
    var InvalidNameError = function(_super) {
      __extends(InvalidNameError2, _super);
      function InvalidNameError2() {
        var _this = _super.call(this, "The name must be between 3 and 64 characters and must only contain a-z and 0-9 characters") || this;
        _this.name = "InvalidNameError";
        _this.type = "InvalidNameError";
        return _this;
      }
      return InvalidNameError2;
    }(Error);
    exports.InvalidNameError = InvalidNameError;
    var NameNotRegisteredError = function(_super) {
      __extends(NameNotRegisteredError2, _super);
      function NameNotRegisteredError2(name) {
        var _this = _super.call(this, "Name " + name + " is not registered") || this;
        _this.name = "NameNotRegisteredError";
        _this.type = "NameNotRegisteredError";
        return _this;
      }
      return NameNotRegisteredError2;
    }(Error);
    exports.NameNotRegisteredError = NameNotRegisteredError;
    var IncorrectOwnerError = function(_super) {
      __extends(IncorrectOwnerError2, _super);
      function IncorrectOwnerError2(name, address) {
        var _this = _super.call(this, "Name " + name + ".algo is not owned by " + address) || this;
        _this.name = "IncorrectOwnerError";
        _this.type = "IncorrectOwnerError";
        return _this;
      }
      return IncorrectOwnerError2;
    }(Error);
    exports.IncorrectOwnerError = IncorrectOwnerError;
  }
});

// src/util.js
var require_util = __commonJS({
  "src/util.js"(exports) {
    "use strict";
    init_cjs_shims();
    exports.__esModule = true;
    function generateTeal(name) {
      return '#pragma version 4\n    byte "' + name + '"\n    len\n    int 3\n    ==\n    bnz main_l22\n    byte "' + name + '"\n    len\n    int 4\n    ==\n    bnz main_l13\n    byte "' + name + '"\n    len\n    int 5\n    >=\n    bnz main_l4\n    err\n    main_l4:\n    gtxn 0 Amount\n    int 5000000\n    >=\n    assert\n    byte "' + name + '"\n    len\n    int 64\n    <=\n    assert\n    int 0\n    store 0\n    main_l5:\n    load 0\n    byte "' + name + '"\n    len\n    <\n    bnz main_l12\n    global GroupSize\n    int 2\n    ==\n    global GroupSize\n    int 4\n    ==\n    ||\n    assert\n    gtxn 0 Sender\n    gtxn 1 Sender\n    ==\n    assert\n    gtxn 0 Receiver\n    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4\n    ==\n    assert\n    global GroupSize\n    int 2\n    ==\n    bnz main_l11\n    global GroupSize\n    int 4\n    ==\n    bnz main_l10\n    int 0\n    return\n    main_l9:\n    int 1\n    assert\n    int 1\n    b main_l31\n    main_l10:\n    gtxn 1 Receiver\n    gtxn 2 Sender\n    ==\n    gtxn 2 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 2 OnCompletion\n    int OptIn\n    ==\n    &&\n    gtxn 3 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 3 Sender\n    gtxn 0 Sender\n    ==\n    &&\n    gtxna 3 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 3 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l9\n    main_l11:\n    gtxn 1 ApplicationID\n    int 628095415\n    ==\n    gtxna 1 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 1 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l9\n    main_l12:\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 97\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 122\n    <=\n    &&\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 48\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 57\n    <=\n    &&\n    ||\n    assert\n    load 0\n    int 1\n    +\n    store 0\n    b main_l5\n    main_l13:\n    gtxn 0 Amount\n    int 50000000\n    >=\n    assert\n    byte "' + name + '"\n    len\n    int 64\n    <=\n    assert\n    int 0\n    store 0\n    main_l14:\n    load 0\n    byte "' + name + '"\n    len\n    <\n    bnz main_l21\n    global GroupSize\n    int 2\n    ==\n    global GroupSize\n    int 4\n    ==\n    ||\n    assert\n    gtxn 0 Sender\n    gtxn 1 Sender\n    ==\n    assert\n    gtxn 0 Receiver\n    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4\n    ==\n    assert\n    global GroupSize\n    int 2\n    ==\n    bnz main_l20\n    global GroupSize\n    int 4\n    ==\n    bnz main_l19\n    int 0\n    return\n    main_l18:\n    int 1\n    assert\n    int 1\n    b main_l31\n    main_l19:\n    gtxn 1 Receiver\n    gtxn 2 Sender\n    ==\n    gtxn 2 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 2 OnCompletion\n    int OptIn\n    ==\n    &&\n    gtxn 3 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 3 Sender\n    gtxn 0 Sender\n    ==\n    &&\n    gtxna 3 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 3 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l18\n    main_l20:\n    gtxn 1 ApplicationID\n    int 628095415\n    ==\n    gtxna 1 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 1 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l18\n    main_l21:\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 97\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 122\n    <=\n    &&\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 48\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 57\n    <=\n    &&\n    ||\n    assert\n    load 0\n    int 1\n    +\n    store 0\n    b main_l14\n    main_l22:\n    gtxn 0 Amount\n    int 150000000\n    >=\n    assert\n    byte "' + name + '"\n    len\n    int 64\n    <=\n    assert\n    int 0\n    store 0\n    main_l23:\n    load 0\n    byte "' + name + '"\n    len\n    <\n    bnz main_l30\n    global GroupSize\n    int 2\n    ==\n    global GroupSize\n    int 4\n    ==\n    ||\n    assert\n    gtxn 0 Sender\n    gtxn 1 Sender\n    ==\n    assert\n    gtxn 0 Receiver\n    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4\n    ==\n    assert\n    global GroupSize\n    int 2\n    ==\n    bnz main_l29\n    global GroupSize\n    int 4\n    ==\n    bnz main_l28\n    int 0\n    return\n    main_l27:\n    int 1\n    assert\n    int 1\n    b main_l31\n    main_l28:\n    gtxn 1 Receiver\n    gtxn 2 Sender\n    ==\n    gtxn 2 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 2 OnCompletion\n    int OptIn\n    ==\n    &&\n    gtxn 3 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 3 Sender\n    gtxn 0 Sender\n    ==\n    &&\n    gtxna 3 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 3 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l27\n    main_l29:\n    gtxn 1 ApplicationID\n    int 628095415\n    ==\n    gtxna 1 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 1 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l27\n    main_l30:\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 97\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 122\n    <=\n    &&\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 48\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 57\n    <=\n    &&\n    ||\n    assert\n    load 0\n    int 1\n    +\n    store 0\n    b main_l23\n    main_l31:\n    return';
    }
    exports.generateTeal = generateTeal;
    function b64toString2(data) {
      return Buffer.from(data, "base64").toString();
    }
    exports.b64toString = b64toString2;
    function toIntArray(data) {
      return new Uint8Array(Buffer.from(data));
    }
    exports.toIntArray = toIntArray;
  }
});

// src/cachedApi.js
var require_cachedApi = __commonJS({
  "src/cachedApi.js"(exports) {
    "use strict";
    init_cjs_shims();
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    exports.__esModule = true;
    var algosdk_1 = require("algosdk");
    var util_js_1 = require_util();
    var CachedApi2 = function() {
      function CachedApi3(client, indexer) {
        this.cache = {};
        this.rpc = client;
        this.indexer = indexer;
      }
      CachedApi3.prototype.getTeal = function(name) {
        return __awaiter(this, void 0, void 0, function() {
          var program;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (name in this.cache) {
                  return [2, this.cache[name]];
                }
                return [4, this.rpc.compile(util_js_1.generateTeal(name))["do"]()];
              case 1:
                program = _a.sent();
                program = new Uint8Array(Buffer.from(program.result, "base64"));
                this.cache[name] = new algosdk_1["default"].LogicSigAccount(program);
                return [2, this.cache[name]];
            }
          });
        });
      };
      return CachedApi3;
    }();
    exports["default"] = CachedApi2;
  }
});

// src/resolver.ts
var resolver_exports = {};
__export(resolver_exports, {
  Resolver: () => Resolver
});
module.exports = __toCommonJS(resolver_exports);
init_cjs_shims();
var import_algosdk = __toESM(require("algosdk"));
var import_constants = __toESM(require_constants());
var import_errors = __toESM(require_errors());
var import_cachedApi = __toESM(require_cachedApi());
var import_util = __toESM(require_util());
var Resolver = class extends import_cachedApi.default {
  name;
  constructor(client, indexer, name) {
    super(client, indexer);
    this.rpc = client;
    this.indexer = indexer;
    this.name = name;
  }
  async resolveName(name) {
    let found = false;
    if (!name) {
      name = this.name;
    }
    const error = {
      address: "",
      metadata: [],
      socials: [],
      found: false
    };
    try {
      let accountInfo = await this.indexer.lookupAccountByID((await this.getTeal(name)).address()).do();
      accountInfo = accountInfo.account["apps-local-state"];
      const length = accountInfo.length;
      let address;
      let socials = [], metadata = [];
      for (let i = 0; i < length; i++) {
        const app = accountInfo[i];
        if (app.id === import_constants.APP_ID) {
          const kv = app["key-value"];
          const decodedKvPairs = this.decodeKvPairs(kv);
          socials = this.filterKvPairs(decodedKvPairs, "socials");
          metadata = this.filterKvPairs(decodedKvPairs, "metadata");
          found = true;
          address = metadata.filter((kv2) => kv2.key === "owner")[0].value;
        }
      }
      if (found) {
        return {
          found,
          address,
          socials,
          metadata
        };
      }
      return error;
    } catch (err) {
      return error;
    }
  }
  async getNamesOwnedByAddress(address, socials = false, metadata = false, limit = 10) {
    if (!await import_algosdk.default.isValidAddress(address)) {
      throw new import_errors.AddressValidationError();
    }
    let nextToken = "";
    let txnLength = 1;
    let txns = [];
    while (txnLength > 0) {
      try {
        const info = await this.indexer.searchForTransactions().address(address).addressRole("sender").afterTime("2022-02-24").txType("appl").applicationID(import_constants.APP_ID).nextToken(nextToken).do();
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
        if (info.found && info.address === address) {
          const domain = {
            address: "",
            found: true,
            name: ""
          };
          domain.name = names[i] + ".algo";
          if (socials) {
            domain.socials = info.socials;
          }
          if (metadata) {
            domain.metadata = info.metadata;
          }
          details.push(domain);
          continue;
        }
        i--;
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
      if (import_constants.ALLOWED_SOCIALS.includes(key)) {
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
      if (key === "owner") {
        decodedKvPair.value = import_algosdk.default.encodeAddress(new Uint8Array(Buffer.from(value.bytes, "base64")));
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
          if (txn["application-transaction"]["application-id"] === import_constants.APP_ID) {
            const appArgs = txn["application-transaction"]["application-args"];
            if (Buffer.from(appArgs[0], "base64").toString() === "register_name") {
              const decodedName = (0, import_util.b64toString)(appArgs[1]);
              if (!names.includes(decodedName)) {
                names.push(decodedName);
              }
            } else if ((0, import_util.b64toString)(appArgs[0]) === "accept_transfer") {
              const lsigAccount = txn["application-transaction"]["accounts"][0];
              let accountInfo = await this.indexer.lookupAccountByID(lsigAccount).do();
              accountInfo = accountInfo.account["apps-local-state"];
              const length = accountInfo.length;
              for (let i2 = 0; i2 < length; i2++) {
                if (accountInfo[i2].id === import_constants.APP_ID) {
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
  async owner() {
    const domainInformation = await this.resolveName();
    if (domainInformation.found) {
      return domainInformation.address;
    }
    return "Not Registered";
  }
  async text(key) {
    var _a, _b;
    const domainInformation = await this.resolveName();
    if (domainInformation.found) {
      const socialRecords = (_a = domainInformation.socials) == null ? void 0 : _a.filter((social) => social.key === key);
      if (socialRecords && socialRecords.length > 0) {
        return socialRecords[0].value;
      } else {
        const metadataRecords = (_b = domainInformation.metadata) == null ? void 0 : _b.filter((metadata) => metadata.key === key);
        if (metadataRecords && metadataRecords.length > 0) {
          return metadataRecords[0].value;
        } else {
          return "Property not set";
        }
      }
    }
    return "Not Registered";
  }
  async expiry() {
    const domainInformation = await this.resolveName();
    if (domainInformation.found) {
      return new Date(parseInt(domainInformation == null ? void 0 : domainInformation.metadata.filter((data) => data.key === "expiry")[0].value) * 1e3);
    }
    return "Not Registered";
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
    return "Domain not registered";
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Resolver
});
//# sourceMappingURL=resolver.js.map