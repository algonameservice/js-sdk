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

// src/validation.js
var require_validation = __commonJS({
  "src/validation.js"(exports) {
    "use strict";
    init_cjs_shims();
    exports.__esModule = true;
    var algosdk_1 = require("algosdk");
    var constants_js_1 = require_constants();
    var constants_js_2 = require_constants();
    var errors_js_1 = require_errors();
    function isValidAddress2(address) {
      return algosdk_1["default"].isValidAddress(address);
    }
    exports.isValidAddress = isValidAddress2;
    function normalizeName2(name) {
      var tld = name.split(".").pop();
      if (constants_js_2.ALLOWED_TLDS.includes(tld)) {
        name = name.split(".")[0].toLowerCase();
      } else {
        throw new Error("TLD not supported");
      }
      var lengthOfName = name.length;
      for (var i = 0; i < lengthOfName; i++) {
        if (!(name.charCodeAt(i) >= constants_js_1.ASCII_CODES.ASCII_0 && name.charCodeAt(i) <= constants_js_1.ASCII_CODES.ASCII_9)) {
          if (!(name.charCodeAt(i) >= constants_js_1.ASCII_CODES.ASCII_A && name.charCodeAt(i) <= constants_js_1.ASCII_CODES.ASCII_Z))
            throw new errors_js_1.InvalidNameError();
        }
      }
      return name;
    }
    exports.normalizeName = normalizeName2;
  }
});

// src/generateTeal.js
var require_generateTeal = __commonJS({
  "src/generateTeal.js"(exports) {
    "use strict";
    init_cjs_shims();
    exports.__esModule = true;
    function generateTeal(name) {
      return '#pragma version 4\n    byte "' + name + '"\n    len\n    int 3\n    ==\n    bnz main_l22\n    byte "' + name + '"\n    len\n    int 4\n    ==\n    bnz main_l13\n    byte "' + name + '"\n    len\n    int 5\n    >=\n    bnz main_l4\n    err\n    main_l4:\n    gtxn 0 Amount\n    int 5000000\n    >=\n    assert\n    byte "' + name + '"\n    len\n    int 64\n    <=\n    assert\n    int 0\n    store 0\n    main_l5:\n    load 0\n    byte "' + name + '"\n    len\n    <\n    bnz main_l12\n    global GroupSize\n    int 2\n    ==\n    global GroupSize\n    int 4\n    ==\n    ||\n    assert\n    gtxn 0 Sender\n    gtxn 1 Sender\n    ==\n    assert\n    gtxn 0 Receiver\n    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4\n    ==\n    assert\n    global GroupSize\n    int 2\n    ==\n    bnz main_l11\n    global GroupSize\n    int 4\n    ==\n    bnz main_l10\n    int 0\n    return\n    main_l9:\n    int 1\n    assert\n    int 1\n    b main_l31\n    main_l10:\n    gtxn 1 Receiver\n    gtxn 2 Sender\n    ==\n    gtxn 2 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 2 OnCompletion\n    int OptIn\n    ==\n    &&\n    gtxn 3 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 3 Sender\n    gtxn 0 Sender\n    ==\n    &&\n    gtxna 3 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 3 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l9\n    main_l11:\n    gtxn 1 ApplicationID\n    int 628095415\n    ==\n    gtxna 1 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 1 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l9\n    main_l12:\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 97\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 122\n    <=\n    &&\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 48\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 57\n    <=\n    &&\n    ||\n    assert\n    load 0\n    int 1\n    +\n    store 0\n    b main_l5\n    main_l13:\n    gtxn 0 Amount\n    int 50000000\n    >=\n    assert\n    byte "' + name + '"\n    len\n    int 64\n    <=\n    assert\n    int 0\n    store 0\n    main_l14:\n    load 0\n    byte "' + name + '"\n    len\n    <\n    bnz main_l21\n    global GroupSize\n    int 2\n    ==\n    global GroupSize\n    int 4\n    ==\n    ||\n    assert\n    gtxn 0 Sender\n    gtxn 1 Sender\n    ==\n    assert\n    gtxn 0 Receiver\n    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4\n    ==\n    assert\n    global GroupSize\n    int 2\n    ==\n    bnz main_l20\n    global GroupSize\n    int 4\n    ==\n    bnz main_l19\n    int 0\n    return\n    main_l18:\n    int 1\n    assert\n    int 1\n    b main_l31\n    main_l19:\n    gtxn 1 Receiver\n    gtxn 2 Sender\n    ==\n    gtxn 2 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 2 OnCompletion\n    int OptIn\n    ==\n    &&\n    gtxn 3 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 3 Sender\n    gtxn 0 Sender\n    ==\n    &&\n    gtxna 3 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 3 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l18\n    main_l20:\n    gtxn 1 ApplicationID\n    int 628095415\n    ==\n    gtxna 1 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 1 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l18\n    main_l21:\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 97\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 122\n    <=\n    &&\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 48\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 57\n    <=\n    &&\n    ||\n    assert\n    load 0\n    int 1\n    +\n    store 0\n    b main_l14\n    main_l22:\n    gtxn 0 Amount\n    int 150000000\n    >=\n    assert\n    byte "' + name + '"\n    len\n    int 64\n    <=\n    assert\n    int 0\n    store 0\n    main_l23:\n    load 0\n    byte "' + name + '"\n    len\n    <\n    bnz main_l30\n    global GroupSize\n    int 2\n    ==\n    global GroupSize\n    int 4\n    ==\n    ||\n    assert\n    gtxn 0 Sender\n    gtxn 1 Sender\n    ==\n    assert\n    gtxn 0 Receiver\n    addr SYGCDTWGBXKV4ZL5YAWSYAVOUC25U2XDB6SMQHLRCTYVF566TQZ3EOABH4\n    ==\n    assert\n    global GroupSize\n    int 2\n    ==\n    bnz main_l29\n    global GroupSize\n    int 4\n    ==\n    bnz main_l28\n    int 0\n    return\n    main_l27:\n    int 1\n    assert\n    int 1\n    b main_l31\n    main_l28:\n    gtxn 1 Receiver\n    gtxn 2 Sender\n    ==\n    gtxn 2 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 2 OnCompletion\n    int OptIn\n    ==\n    &&\n    gtxn 3 ApplicationID\n    int 628095415\n    ==\n    &&\n    gtxn 3 Sender\n    gtxn 0 Sender\n    ==\n    &&\n    gtxna 3 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 3 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l27\n    main_l29:\n    gtxn 1 ApplicationID\n    int 628095415\n    ==\n    gtxna 1 ApplicationArgs 0\n    byte "register_name"\n    ==\n    &&\n    gtxna 1 ApplicationArgs 1\n    byte "' + name + '"\n    ==\n    &&\n    assert\n    b main_l27\n    main_l30:\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 97\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 122\n    <=\n    &&\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 48\n    >=\n    byte "' + name + '"\n    load 0\n    getbyte\n    int 57\n    <=\n    &&\n    ||\n    assert\n    load 0\n    int 1\n    +\n    store 0\n    b main_l23\n    main_l31:\n    return';
    }
    exports.generateTeal = generateTeal;
  }
});

// src/resolver.js
var require_resolver = __commonJS({
  "src/resolver.js"(exports) {
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
    var constants_js_1 = require_constants();
    var errors_js_1 = require_errors();
    var generateTeal_js_1 = require_generateTeal();
    var Resolver = function() {
      function Resolver2(client, indexer) {
        this.algodClient = client;
        this.indexerClient = indexer;
      }
      Resolver2.prototype.generateLsig = function(name) {
        return __awaiter(this, void 0, void 0, function() {
          var program;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.algodClient.compile(generateTeal_js_1.generateTeal(name))["do"]()];
              case 1:
                program = _a.sent();
                program = new Uint8Array(Buffer.from(program.result, "base64"));
                return [2, new algosdk_1["default"].LogicSigAccount(program)];
            }
          });
        });
      };
      Resolver2.prototype.resolveName = function(name) {
        return __awaiter(this, void 0, void 0, function() {
          var indexer, lsig, found, accountInfo, length_1, address, socials, metadata, i, app, kv, decodedKvPairs, err_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (!(name.length === 0 || name.length > 64))
                  return [3, 1];
                throw new errors_js_1.InvalidNameError();
              case 1:
                return [4, this.indexerClient];
              case 2:
                indexer = _a.sent();
                return [4, this.generateLsig(name)];
              case 3:
                lsig = _a.sent();
                found = false;
                _a.label = 4;
              case 4:
                _a.trys.push([4, 6, , 7]);
                return [4, indexer.lookupAccountByID(lsig.address())["do"]()];
              case 5:
                accountInfo = _a.sent();
                accountInfo = accountInfo.account["apps-local-state"];
                length_1 = accountInfo.length;
                address = void 0;
                socials = [], metadata = [];
                for (i = 0; i < length_1; i++) {
                  app = accountInfo[i];
                  if (app.id === constants_js_1.APP_ID) {
                    kv = app["key-value"];
                    decodedKvPairs = this.decodeKvPairs(kv);
                    socials = this.filterKvPairs(decodedKvPairs, "socials");
                    metadata = this.filterKvPairs(decodedKvPairs, "metadata");
                    found = true;
                    address = metadata.filter(function(kv2) {
                      return kv2.key === "owner";
                    })[0].value;
                  }
                }
                if (found) {
                  return [2, {
                    found,
                    address,
                    socials,
                    metadata
                  }];
                } else
                  return [2, { found }];
                return [3, 7];
              case 6:
                err_1 = _a.sent();
                return [2, { found }];
              case 7:
                return [2];
            }
          });
        });
      };
      Resolver2.prototype.getNamesOwnedByAddress = function(address, socials, metadata, limit) {
        return __awaiter(this, void 0, void 0, function() {
          var isValidAddress2, indexer, nextToken, txnLength, txns, info, err_2, accountTxns, i, names, details, i, info, domain;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, algosdk_1["default"].isValidAddress(address)];
              case 1:
                isValidAddress2 = _a.sent();
                if (!!isValidAddress2)
                  return [3, 2];
                throw new errors_js_1.AddressValidationError();
              case 2:
                return [4, this.indexerClient];
              case 3:
                indexer = _a.sent();
                nextToken = "";
                txnLength = 1;
                txns = [];
                _a.label = 4;
              case 4:
                if (!(txnLength > 0))
                  return [3, 9];
                _a.label = 5;
              case 5:
                _a.trys.push([5, 7, , 8]);
                return [4, indexer.searchForTransactions().address(address).addressRole("sender").afterTime("2022-02-24").txType("appl").applicationID(constants_js_1.APP_ID).nextToken(nextToken)["do"]()];
              case 6:
                info = _a.sent();
                txnLength = info.transactions.length;
                if (txnLength > 0) {
                  nextToken = info["next-token"];
                  txns.push(info.transactions);
                }
                return [3, 8];
              case 7:
                err_2 = _a.sent();
                return [2, false];
              case 8:
                return [3, 4];
              case 9:
                accountTxns = [];
                for (i = 0; i < txns.length; i++) {
                  accountTxns = accountTxns.concat(txns[i]);
                }
                txns = accountTxns;
                return [4, this.filterDomainRegistrationTxns(txns)];
              case 10:
                names = _a.sent();
                if (!(names.length > 0))
                  return [3, 15];
                details = [];
                i = 0;
                _a.label = 11;
              case 11:
                if (!(i < names.length))
                  return [3, 14];
                if (limit !== void 0) {
                  if (details.length >= limit)
                    return [3, 14];
                }
                return [4, this.resolveName(names[i])];
              case 12:
                info = _a.sent();
                if (info.found && info.address !== void 0) {
                  if (info.address === address) {
                    domain = {
                      name: ""
                    };
                    domain.name = names[i] + ".algo";
                    if (socials) {
                      domain["socials"] = info.socials;
                    }
                    if (metadata) {
                      domain["metadata"] = info.metadata;
                    }
                    details.push(domain);
                  }
                } else {
                  i = i - 1;
                }
                _a.label = 13;
              case 13:
                i++;
                return [3, 11];
              case 14:
                return [2, details];
              case 15:
                return [2];
            }
          });
        });
      };
      Resolver2.prototype.filterKvPairs = function(kvPairs, type) {
        var socials = [], metadata = [];
        for (var i in kvPairs) {
          var key = kvPairs[i].key;
          var value = kvPairs[i].value;
          var kvObj = {
            key,
            value
          };
          if (constants_js_1.ALLOWED_SOCIALS.includes(key)) {
            socials.push(kvObj);
          } else {
            metadata.push(kvObj);
          }
        }
        if (type === "socials") {
          return socials;
        } else if (type === "metadata") {
          return metadata;
        }
      };
      Resolver2.prototype.decodeKvPairs = function(kvPairs) {
        return kvPairs.map(function(kvPair) {
          var decodedKvPair = {
            key: "",
            value: ""
          };
          var key = kvPair.key;
          key = Buffer.from(key, "base64").toString();
          decodedKvPair.key = key;
          var value = kvPair.value;
          if (key === "owner") {
            decodedKvPair.value = algosdk_1["default"].encodeAddress(new Uint8Array(Buffer.from(value.bytes, "base64")));
          } else if (value.type === 1) {
            decodedKvPair.value = Buffer.from(value.bytes, "base64").toString();
          } else if (value.type === 2) {
            decodedKvPair.value = value.uint;
          }
          return decodedKvPair;
        });
      };
      Resolver2.prototype.filterDomainRegistrationTxns = function(txns) {
        return __awaiter(this, void 0, void 0, function() {
          var names, indexer, i, txn, appArgs, lsigAccount, accountInfo, length_2, i_1, kvPairs, domainInfo, err_3;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                names = [];
                indexer = this.indexerClient;
                _a.label = 1;
              case 1:
                _a.trys.push([1, 7, , 8]);
                i = 0;
                _a.label = 2;
              case 2:
                if (!(i < txns.length))
                  return [3, 6];
                txn = txns[i];
                if (!(txn["tx-type"] === "appl"))
                  return [3, 5];
                if (!(txn["application-transaction"]["application-id"] === constants_js_1.APP_ID))
                  return [3, 5];
                appArgs = txn["application-transaction"]["application-args"];
                if (!(Buffer.from(appArgs[0], "base64").toString() === "register_name"))
                  return [3, 3];
                if (!names.includes(Buffer.from(appArgs[1], "base64").toString()))
                  names.push(Buffer.from(appArgs[1], "base64").toString());
                return [3, 5];
              case 3:
                if (!(Buffer.from(appArgs[0], "base64").toString() === "accept_transfer"))
                  return [3, 5];
                lsigAccount = txn["application-transaction"]["accounts"][0];
                return [4, indexer.lookupAccountByID(lsigAccount)["do"]()];
              case 4:
                accountInfo = _a.sent();
                accountInfo = accountInfo.account["apps-local-state"];
                length_2 = accountInfo.length;
                for (i_1 = 0; i_1 < length_2; i_1++) {
                  if (accountInfo[i_1].id === constants_js_1.APP_ID) {
                    kvPairs = accountInfo[i_1]["key-value"];
                    domainInfo = this.decodeKvPairs(kvPairs).filter(function(domain) {
                      return domain.key === "name";
                    });
                    if (!names.includes(domainInfo[0].value)) {
                      names.push(domainInfo[0].value);
                    }
                  }
                }
                _a.label = 5;
              case 5:
                i++;
                return [3, 2];
              case 6:
                return [3, 8];
              case 7:
                err_3 = _a.sent();
                return [2, []];
              case 8:
                return [2, names];
            }
          });
        });
      };
      Resolver2.prototype.owner = function(name) {
        return __awaiter(this, void 0, void 0, function() {
          var domainInformation;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolveName(name)];
              case 1:
                domainInformation = _a.sent();
                if (domainInformation.found === true) {
                  return [2, domainInformation.address];
                } else
                  return [2, "Not Registered"];
                return [2];
            }
          });
        });
      };
      Resolver2.prototype.text = function(name, key) {
        return __awaiter(this, void 0, void 0, function() {
          var domainInformation, socialRecords, metadataRecords;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolveName(name)];
              case 1:
                domainInformation = _a.sent();
                if (domainInformation.found === true) {
                  socialRecords = domainInformation.socials.filter(function(social) {
                    return social.key === key;
                  });
                  if (socialRecords.length > 0) {
                    return [2, socialRecords[0].value];
                  } else {
                    metadataRecords = domainInformation.metadata.filter(function(metadata) {
                      return metadata.key === key;
                    });
                    if (metadataRecords.length > 0) {
                      return [2, metadataRecords[0].value];
                    } else {
                      return [2, "Property not set"];
                    }
                  }
                } else {
                  return [2, "Not Registered"];
                }
                return [2];
            }
          });
        });
      };
      Resolver2.prototype.expiry = function(name) {
        return __awaiter(this, void 0, void 0, function() {
          var domainInformation;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolveName(name)];
              case 1:
                domainInformation = _a.sent();
                if (domainInformation.found === true) {
                  return [2, new Date(domainInformation.metadata.filter(function(data) {
                    return data.key === "expiry";
                  })[0].value * 1e3)];
                } else
                  return [2, "Not Registered"];
                return [2];
            }
          });
        });
      };
      Resolver2.prototype.content = function(name) {
        return __awaiter(this, void 0, void 0, function() {
          var domainInformation, contentRecords;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolveName(name)];
              case 1:
                domainInformation = _a.sent();
                if (domainInformation.found === true) {
                  contentRecords = domainInformation.metadata.filter(function(kv) {
                    return kv.key === "content";
                  });
                  if (contentRecords.length > 0) {
                    return [2, contentRecords[0].value];
                  } else {
                    return [2, "Content field is not set"];
                  }
                } else {
                  return [2, "Domain not registered"];
                }
                return [2];
            }
          });
        });
      };
      return Resolver2;
    }();
    exports.Resolver = Resolver;
  }
});

// src/transactions.js
var require_transactions = __commonJS({
  "src/transactions.js"(exports) {
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
    var constants_js_1 = require_constants();
    var generateTeal_js_1 = require_generateTeal();
    var Transactions = function() {
      function Transactions2(client) {
        this.algodClient = client;
      }
      Transactions2.prototype.generateLsig = function(name) {
        return __awaiter(this, void 0, void 0, function() {
          var program;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.algodClient.compile(generateTeal_js_1.generateTeal(name))["do"]()];
              case 1:
                program = _a.sent();
                program = new Uint8Array(Buffer.from(program.result, "base64"));
                return [2, new algosdk_1["default"].LogicSigAccount(program)];
            }
          });
        });
      };
      Transactions2.prototype.calculatePrice = function(name, period) {
        var amount = 0;
        if (name.length === 3) {
          amount = constants_js_1.REGISTRATION_PRICE.CHAR_3_AMOUNT * period;
        } else if (name.length === 4) {
          amount = constants_js_1.REGISTRATION_PRICE.CHAR_4_AMOUNT * period;
        } else if (name.length >= 5) {
          amount = constants_js_1.REGISTRATION_PRICE.CHAR_5_AMOUNT * period;
        }
        return amount;
      };
      Transactions2.prototype.prepareNameRegistrationTransactions = function(name, address, period) {
        return __awaiter(this, void 0, void 0, function() {
          var algodClient, amount, lsig, params, receiver, sender, closeToRemaninder, note, txn1, groupTxns, txn2, txn3, method, appArgs, txn4, signedOptinTxn;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                algodClient = this.algodClient;
                amount = 0;
                return [4, this.generateLsig(name)];
              case 1:
                lsig = _a.sent();
                return [4, algodClient.getTransactionParams()["do"]()];
              case 2:
                params = _a.sent();
                params.fee = 1e3;
                params.flatFee = true;
                receiver = algosdk_1["default"].getApplicationAddress(constants_js_1.APP_ID);
                sender = address;
                if (period === void 0) {
                  period = 1;
                }
                amount = this.calculatePrice(name, period);
                closeToRemaninder = void 0;
                note = void 0;
                txn1 = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
                groupTxns = [];
                groupTxns.push(txn1);
                sender = address;
                receiver = lsig.address();
                amount = 915e3;
                txn2 = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
                groupTxns.push(txn2);
                return [4, algosdk_1["default"].makeApplicationOptInTxnFromObject({
                  from: lsig.address(),
                  suggestedParams: params,
                  appIndex: constants_js_1.APP_ID
                })];
              case 3:
                txn3 = _a.sent();
                groupTxns.push(txn3);
                sender = lsig.address();
                receiver = address;
                amount = 0;
                method = "register_name";
                appArgs = [];
                period++;
                appArgs.push(new Uint8Array(Buffer.from(method)));
                appArgs.push(new Uint8Array(Buffer.from(name)));
                appArgs.push(algosdk_1["default"].encodeUint64(period));
                return [4, algosdk_1["default"].makeApplicationNoOpTxn(address, params, constants_js_1.APP_ID, appArgs, [lsig.address()])];
              case 4:
                txn4 = _a.sent();
                groupTxns.push(txn4);
                algosdk_1["default"].assignGroupID(groupTxns);
                signedOptinTxn = algosdk_1["default"].signLogicSigTransaction(groupTxns[2], lsig);
                return [2, {
                  optinTxn: signedOptinTxn,
                  txns: groupTxns,
                  unsignedOptinTxn: groupTxns[2]
                }];
            }
          });
        });
      };
      Transactions2.prototype.prepareUpdateNamePropertyTransactions = function(name, address, editedHandles) {
        return __awaiter(this, void 0, void 0, function() {
          var algodClient, lsig, params, method, groupTxns, _a, _b, _i, key, appArgs, network, handle, txn;
          return __generator(this, function(_c) {
            switch (_c.label) {
              case 0:
                algodClient = this.algodClient;
                return [4, this.generateLsig(name)];
              case 1:
                lsig = _c.sent();
                return [4, algodClient.getTransactionParams()["do"]()];
              case 2:
                params = _c.sent();
                params.fee = 1e3;
                params.flatFee = true;
                method = "update_name";
                groupTxns = [];
                _a = [];
                for (_b in editedHandles)
                  _a.push(_b);
                _i = 0;
                _c.label = 3;
              case 3:
                if (!(_i < _a.length))
                  return [3, 6];
                key = _a[_i];
                appArgs = [];
                network = key;
                handle = editedHandles[key];
                appArgs.push(new Uint8Array(Buffer.from(method)));
                appArgs.push(new Uint8Array(Buffer.from(network)));
                appArgs.push(new Uint8Array(Buffer.from(handle)));
                return [4, algosdk_1["default"].makeApplicationNoOpTxn(address, params, constants_js_1.APP_ID, appArgs, [lsig.address()])];
              case 4:
                txn = _c.sent();
                groupTxns.push(txn);
                _c.label = 5;
              case 5:
                _i++;
                return [3, 3];
              case 6:
                if (Object.keys(editedHandles).length > 1) {
                  algosdk_1["default"].assignGroupID(groupTxns);
                }
                return [2, groupTxns];
            }
          });
        });
      };
      Transactions2.prototype.preparePaymentTxn = function(sender, receiver, amt, note) {
        return __awaiter(this, void 0, void 0, function() {
          var algodClient, params, enc, closeToRemaninder;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                algodClient = this.algodClient;
                return [4, algodClient.getTransactionParams()["do"]()];
              case 1:
                params = _a.sent();
                amt = algosdk_1["default"].algosToMicroalgos(amt);
                enc = new TextEncoder();
                note = enc.encode(note);
                closeToRemaninder = void 0;
                return [2, algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params)];
            }
          });
        });
      };
      Transactions2.prototype.prepareNameRenewalTxns = function(name, sender, years) {
        return __awaiter(this, void 0, void 0, function() {
          var algodClient, params, receiver, closeToRemaninder, note, paymentTxn, lsig, appArgs, applicationTxn;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                algodClient = this.algodClient;
                return [4, algodClient.getTransactionParams()["do"]()];
              case 1:
                params = _a.sent();
                receiver = algosdk_1["default"].getApplicationAddress(constants_js_1.APP_ID);
                closeToRemaninder = void 0;
                note = void 0;
                paymentTxn = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, this.calculatePrice(name, years), closeToRemaninder, note, params);
                return [4, this.generateLsig(name)];
              case 2:
                lsig = _a.sent();
                appArgs = [];
                appArgs.push(new Uint8Array(Buffer.from("renew_name")));
                appArgs.push(algosdk_1["default"].encodeUint64(years));
                applicationTxn = algosdk_1["default"].makeApplicationNoOpTxn(sender, params, constants_js_1.APP_ID, appArgs, [lsig.address()]);
                algosdk_1["default"].assignGroupID([paymentTxn, applicationTxn]);
                return [2, [paymentTxn, applicationTxn]];
            }
          });
        });
      };
      Transactions2.prototype.prepareInitiateNameTransferTransaction = function(name, sender, newOwner, price) {
        return __awaiter(this, void 0, void 0, function() {
          var algodClient, params, lsig, appArgs;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                algodClient = this.algodClient;
                price = algosdk_1["default"].algosToMicroalgos(price);
                return [4, algodClient.getTransactionParams()["do"]()];
              case 1:
                params = _a.sent();
                return [4, this.generateLsig(name)];
              case 2:
                lsig = _a.sent();
                appArgs = [];
                appArgs.push(new Uint8Array(Buffer.from("initiate_transfer")));
                appArgs.push(algosdk_1["default"].encodeUint64(price));
                return [2, algosdk_1["default"].makeApplicationNoOpTxn(sender, params, constants_js_1.APP_ID, appArgs, [
                  lsig.address(),
                  newOwner
                ])];
            }
          });
        });
      };
      Transactions2.prototype.prepareAcceptNameTransferTransactions = function(name, sender, receiver, amt) {
        return __awaiter(this, void 0, void 0, function() {
          var algodClient, params, closeToRemaninder, note, paymentToOwnerTxn, paymentToSmartContractTxn, lsig, appArgs, applicationTxn;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                amt = algosdk_1["default"].algosToMicroalgos(amt);
                algodClient = this.algodClient;
                return [4, algodClient.getTransactionParams()["do"]()];
              case 1:
                params = _a.sent();
                closeToRemaninder = void 0;
                note = void 0;
                paymentToOwnerTxn = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
                receiver = algosdk_1["default"].getApplicationAddress(constants_js_1.APP_ID);
                paymentToSmartContractTxn = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, constants_js_1.TRANSFER_FEE, closeToRemaninder, note, params);
                return [4, this.generateLsig(name)];
              case 2:
                lsig = _a.sent();
                appArgs = [];
                appArgs.push(new Uint8Array(Buffer.from("accept_transfer")));
                applicationTxn = algosdk_1["default"].makeApplicationNoOpTxn(sender, params, constants_js_1.APP_ID, appArgs, [lsig.address()]);
                algosdk_1["default"].assignGroupID([
                  paymentToOwnerTxn,
                  paymentToSmartContractTxn,
                  applicationTxn
                ]);
                return [2, [paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn]];
            }
          });
        });
      };
      return Transactions2;
    }();
    exports.Transactions = Transactions;
  }
});

// src/name.js
var require_name = __commonJS({
  "src/name.js"(exports) {
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
    var resolver_js_1 = require_resolver();
    var transactions_js_1 = require_transactions();
    var errors_js_1 = require_errors();
    var validation_js_1 = require_validation();
    var Name2 = function() {
      function Name3(options) {
        this.name = "";
        var name = options.name, client = options.client, indexer = options.indexer;
        this.name = name;
        this.resolver = new resolver_js_1.Resolver(client, indexer);
        this.transactions = new transactions_js_1.Transactions(client);
      }
      Name3.prototype.isRegistered = function() {
        return __awaiter(this, void 0, void 0, function() {
          var status;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolver.resolveName(this.name)];
              case 1:
                status = _a.sent();
                return [2, status.found];
            }
          });
        });
      };
      Name3.prototype.getOwner = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolver.owner(this.name)];
              case 1:
                return [2, _a.sent()];
            }
          });
        });
      };
      Name3.prototype.getContent = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolver.content(this.name)];
              case 1:
                return [2, _a.sent()];
            }
          });
        });
      };
      Name3.prototype.getText = function(key) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolver.text(this.name, key)];
              case 1:
                return [2, _a.sent()];
            }
          });
        });
      };
      Name3.prototype.getAllInformation = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolver.resolveName(this.name)];
              case 1:
                return [2, _a.sent()];
            }
          });
        });
      };
      Name3.prototype.getExpiry = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolver.expiry(this.name)];
              case 1:
                return [2, _a.sent()];
            }
          });
        });
      };
      Name3.prototype.isValidTransaction = function(sender, receiver, method) {
        return __awaiter(this, void 0, void 0, function() {
          var owner;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.isRegistered()];
              case 1:
                if (!_a.sent()) {
                  throw new errors_js_1.NameNotRegisteredError(this.name);
                }
                if (!validation_js_1.isValidAddress(sender)) {
                  throw new errors_js_1.AddressValidationError();
                }
                if (receiver) {
                  if (!validation_js_1.isValidAddress(receiver))
                    throw new errors_js_1.AddressValidationError();
                }
                return [4, this.getOwner()];
              case 2:
                owner = _a.sent();
                return [4, validation_js_1.isValidAddress(sender)];
              case 3:
                if (!_a.sent()) {
                  throw new errors_js_1.AddressValidationError();
                }
                if (!receiver && !method) {
                  if (owner !== sender) {
                    throw new errors_js_1.IncorrectOwnerError(this.name, sender);
                  }
                } else if (sender && receiver) {
                  if (method === "initiate_transfer") {
                    if (owner !== sender) {
                      throw new errors_js_1.IncorrectOwnerError(this.name, sender);
                    }
                  } else if (method === "accept_transfer") {
                    if (owner !== receiver) {
                      throw new errors_js_1.IncorrectOwnerError(this.name, receiver);
                    }
                  }
                }
                return [2, true];
            }
          });
        });
      };
      Name3.prototype.register = function(address, period) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.isRegistered()];
              case 1:
                if (_a.sent()) {
                  throw new Error("Name already registered");
                }
                if (!!validation_js_1.isValidAddress(address))
                  return [3, 2];
                throw new errors_js_1.AddressValidationError();
              case 2:
                return [4, this.transactions.prepareNameRegistrationTransactions(this.name, address, period)];
              case 3:
                return [2, _a.sent()];
            }
          });
        });
      };
      Name3.prototype.update = function(address, editedHandles) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.isValidTransaction(address)];
              case 1:
                _a.sent();
                return [4, this.transactions.prepareUpdateNamePropertyTransactions(this.name, address, editedHandles)];
              case 2:
                return [2, _a.sent()];
            }
          });
        });
      };
      Name3.prototype.renew = function(address, years) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.isValidTransaction(address)];
              case 1:
                _a.sent();
                return [4, this.transactions.prepareNameRenewalTxns(this.name, address, years)];
              case 2:
                return [2, _a.sent()];
            }
          });
        });
      };
      Name3.prototype.initTransfer = function(owner, newOwner, price) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.isValidTransaction(owner, newOwner, "initiate_transfer")];
              case 1:
                _a.sent();
                return [4, this.transactions.prepareInitiateNameTransferTransaction(this.name, owner, newOwner, price)];
              case 2:
                return [2, _a.sent()];
            }
          });
        });
      };
      Name3.prototype.acceptTransfer = function(newOwner, owner, price) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.isValidTransaction(newOwner, owner, "accept_transfer")];
              case 1:
                _a.sent();
                return [4, this.transactions.prepareAcceptNameTransferTransactions(this.name, newOwner, owner, price)];
              case 2:
                return [2, _a.sent()];
            }
          });
        });
      };
      return Name3;
    }();
    exports.Name = Name2;
  }
});

// src/address.js
var require_address = __commonJS({
  "src/address.js"(exports) {
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
    var resolver_js_1 = require_resolver();
    var Address2 = function() {
      function Address3(options) {
        this.address = "";
        var address = options.address, client = options.client, indexer = options.indexer;
        this.address = address;
        this.resolver = new resolver_js_1.Resolver(client, indexer);
      }
      Address3.prototype.getNames = function(options) {
        return __awaiter(this, void 0, void 0, function() {
          var socials, metadata, limit;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                socials = (options === null || options === void 0 ? void 0 : options.socials) || false, metadata = (options === null || options === void 0 ? void 0 : options.metadata) || false, limit = options === null || options === void 0 ? void 0 : options.metadata;
                return [4, this.resolver.getNamesOwnedByAddress(this.address, socials, metadata, limit)];
              case 1:
                return [2, _a.sent()];
            }
          });
        });
      };
      return Address3;
    }();
    exports.Address = Address2;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ANS: () => ANS
});
module.exports = __toCommonJS(src_exports);
init_cjs_shims();
var import_errors = __toESM(require_errors());
var import_validation = __toESM(require_validation());
var import_name = __toESM(require_name());
var import_address = __toESM(require_address());
var import_validation2 = __toESM(require_validation());
var ANS = class {
  client;
  indexer;
  constructor(client, indexer) {
    this.client = client;
    this.indexer = indexer;
  }
  name(name) {
    name = (0, import_validation2.normalizeName)(name);
    return new import_name.Name({
      client: this.client,
      indexer: this.indexer,
      name
    });
  }
  address(address) {
    if (!(0, import_validation.isValidAddress)(address)) {
      throw new import_errors.AddressValidationError();
    }
    return new import_address.Address({
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