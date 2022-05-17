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
    function b64toString(data) {
      return Buffer.from(data, "base64").toString();
    }
    exports.b64toString = b64toString;
    function toIntArray2(data) {
      return new Uint8Array(Buffer.from(data));
    }
    exports.toIntArray = toIntArray2;
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
      var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = { next: verb(0), throw: verb(1), return: verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
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
                return [
                  4,
                  this.rpc.compile(util_js_1.generateTeal(name))["do"]()
                ];
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
    var AddressValidationError = function(_super) {
      __extends(AddressValidationError2, _super);
      function AddressValidationError2() {
        var _this = _super.call(this, "This is not a valid Algorand address") || this;
        _this.name = "InvalidAddressError";
        _this.type = "InvalidAddressError";
        return _this;
      }
      return AddressValidationError2;
    }(Error);
    exports.AddressValidationError = AddressValidationError;
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
        var _this = _super.call(this, "Name " + name + ".algo is not registered") || this;
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

// src/resolver.js
var require_resolver = __commonJS({
  "src/resolver.js"(exports) {
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
      var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = { next: verb(0), throw: verb(1), return: verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
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
    var cachedApi_js_1 = require_cachedApi();
    var util_js_1 = require_util();
    var Resolver = function(_super) {
      __extends(Resolver2, _super);
      function Resolver2(client, indexer, name) {
        var _this = _super.call(this, client, indexer) || this;
        _this.rpc = client;
        _this.indexer = indexer;
        _this.name = name;
        return _this;
      }
      Resolver2.prototype.resolveName = function(name) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function() {
          var found, error, _c, _d, _e, accountInfo, length_1, address, socials, metadata, i, app, kv, decodedKvPairs, err_1;
          return __generator(this, function(_f) {
            switch (_f.label) {
              case 0:
                found = false;
                if (!name) {
                  name = (_a = this.name) === null || _a === void 0 ? void 0 : _a.name;
                }
                error = {
                  found: false,
                  socials: [],
                  metadata: [],
                  address: "Not Registered"
                };
                _f.label = 1;
              case 1:
                _f.trys.push([1, 5, , 6]);
                if (!(!this.resolvedData || name !== ((_b = this.name) === null || _b === void 0 ? void 0 : _b.name)))
                  return [3, 4];
                _c = this;
                _e = (_d = this.indexer).lookupAccountByID;
                return [4, this.getTeal(name)];
              case 2:
                return [4, _e.apply(_d, [_f.sent().address()])["do"]()];
              case 3:
                _c.resolvedData = _f.sent();
                _f.label = 4;
              case 4:
                accountInfo = this.resolvedData;
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
                  return [
                    2,
                    {
                      found,
                      address,
                      socials,
                      metadata
                    }
                  ];
                }
                return [2, error];
              case 5:
                err_1 = _f.sent();
                return [2, error];
              case 6:
                return [2];
            }
          });
        });
      };
      Resolver2.prototype.getNamesOwnedByAddress = function(address, socials, metadata, limit) {
        if (socials === void 0) {
          socials = false;
        }
        if (metadata === void 0) {
          metadata = false;
        }
        if (limit === void 0) {
          limit = 10;
        }
        return __awaiter(this, void 0, void 0, function() {
          var nextToken, txnLength, txns, info, err_2, accountTxns, i, names, details, i, info, domain;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, algosdk_1["default"].isValidAddress(address)];
              case 1:
                if (!_a.sent()) {
                  throw new errors_js_1.AddressValidationError();
                }
                nextToken = "";
                txnLength = 1;
                txns = [];
                _a.label = 2;
              case 2:
                if (!(txnLength > 0))
                  return [3, 7];
                _a.label = 3;
              case 3:
                _a.trys.push([3, 5, , 6]);
                return [
                  4,
                  this.indexer.searchForTransactions().address(address).addressRole("sender").afterTime("2022-02-24").txType("appl").applicationID(constants_js_1.APP_ID).nextToken(nextToken)["do"]()
                ];
              case 4:
                info = _a.sent();
                txnLength = info.transactions.length;
                if (txnLength > 0) {
                  nextToken = info["next-token"];
                  txns.push(info.transactions);
                }
                return [3, 6];
              case 5:
                err_2 = _a.sent();
                return [2, []];
              case 6:
                return [3, 2];
              case 7:
                accountTxns = [];
                for (i = 0; i < txns.length; i++) {
                  accountTxns = accountTxns.concat(txns[i]);
                }
                txns = accountTxns;
                return [4, this.filterDomainRegistrationTxns(txns)];
              case 8:
                names = _a.sent();
                if (!(names.length > 0))
                  return [3, 13];
                details = [];
                i = 0;
                _a.label = 9;
              case 9:
                if (!(i < names.length))
                  return [3, 12];
                if (details.length && details.length >= limit) {
                  return [3, 12];
                }
                return [4, this.resolveName(names[i])];
              case 10:
                info = _a.sent();
                if (info.found && info.address === address) {
                  domain = {
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
                  return [3, 11];
                } else if (info.found === false) {
                  i--;
                }
                _a.label = 11;
              case 11:
                i++;
                return [3, 9];
              case 12:
                return [2, details];
              case 13:
                return [2, []];
            }
          });
        });
      };
      Resolver2.prototype.filterKvPairs = function(kvPairs, type) {
        var socials = [], metadata = [];
        for (var i in kvPairs) {
          var _a = kvPairs[i], key = _a.key, value = _a.value;
          var kvObj = {
            key,
            value
          };
          if (constants_js_1.ALLOWED_SOCIALS.includes(key)) {
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
      };
      Resolver2.prototype.decodeKvPairs = function(kvPairs) {
        return kvPairs.map(function(kvPair) {
          var decodedKvPair = {
            key: "",
            value: ""
          };
          var key = kvPair.key;
          var value = kvPair.value;
          key = Buffer.from(key, "base64").toString();
          decodedKvPair.key = key;
          if (key === "owner") {
            decodedKvPair.value = algosdk_1["default"].encodeAddress(new Uint8Array(Buffer.from(value.bytes, "base64")));
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
      };
      Resolver2.prototype.filterDomainRegistrationTxns = function(txns) {
        return __awaiter(this, void 0, void 0, function() {
          var names, i, txn, appArgs, decodedName, lsigAccount, accountInfo, length_2, i_1, kvPairs, domainInfo, err_3;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                names = [];
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
                decodedName = util_js_1.b64toString(appArgs[1]);
                if (!names.includes(decodedName)) {
                  names.push(decodedName);
                }
                return [3, 5];
              case 3:
                if (!(util_js_1.b64toString(appArgs[0]) === "accept_transfer"))
                  return [3, 5];
                lsigAccount = txn["application-transaction"]["accounts"][0];
                return [
                  4,
                  this.indexer.lookupAccountByID(lsigAccount)["do"]()
                ];
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
      Resolver2.prototype.owner = function() {
        return __awaiter(this, void 0, void 0, function() {
          var domainInformation;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolveName()];
              case 1:
                domainInformation = _a.sent();
                if (domainInformation.found) {
                  return [2, domainInformation.address];
                }
                throw new errors_js_1.NameNotRegisteredError(this.name.name);
            }
          });
        });
      };
      Resolver2.prototype.text = function(key) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function() {
          var domainInformation, socialRecords, metadataRecords;
          return __generator(this, function(_c) {
            switch (_c.label) {
              case 0:
                return [4, this.resolveName()];
              case 1:
                domainInformation = _c.sent();
                if (domainInformation.found) {
                  socialRecords = (_a = domainInformation.socials) === null || _a === void 0 ? void 0 : _a.filter(function(social) {
                    return social.key === key;
                  });
                  if (socialRecords && socialRecords.length > 0) {
                    return [2, socialRecords[0].value];
                  } else {
                    metadataRecords = (_b = domainInformation.metadata) === null || _b === void 0 ? void 0 : _b.filter(function(metadata) {
                      return metadata.key === key;
                    });
                    if (metadataRecords && metadataRecords.length > 0) {
                      return [2, metadataRecords[0].value];
                    } else {
                      return [2, "Property not set"];
                    }
                  }
                }
                throw new errors_js_1.NameNotRegisteredError(this.name.name);
            }
          });
        });
      };
      Resolver2.prototype.expiry = function() {
        return __awaiter(this, void 0, void 0, function() {
          var domainInformation;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolveName()];
              case 1:
                domainInformation = _a.sent();
                if (domainInformation.found) {
                  return [
                    2,
                    new Date(parseInt((domainInformation === null || domainInformation === void 0 ? void 0 : domainInformation.metadata).filter(function(data) {
                      return data.key === "expiry";
                    })[0].value) * 1e3)
                  ];
                }
                throw new errors_js_1.NameNotRegisteredError(this.name.name);
            }
          });
        });
      };
      Resolver2.prototype.content = function() {
        return __awaiter(this, void 0, void 0, function() {
          var domainInformation, contentRecords;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolveName()];
              case 1:
                domainInformation = _a.sent();
                if (domainInformation.found) {
                  contentRecords = (domainInformation === null || domainInformation === void 0 ? void 0 : domainInformation.metadata).filter(function(kv) {
                    return kv.key === "content";
                  });
                  if (contentRecords.length > 0) {
                    return [2, contentRecords[0].value];
                  }
                  return [2, "Content field is not set"];
                }
                throw new errors_js_1.NameNotRegisteredError(this._name);
            }
          });
        });
      };
      return Resolver2;
    }(cachedApi_js_1["default"]);
    exports.Resolver = Resolver;
  }
});

// src/transactions.js
var require_transactions = __commonJS({
  "src/transactions.js"(exports) {
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
      var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = { next: verb(0), throw: verb(1), return: verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
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
    var cachedApi_js_1 = require_cachedApi();
    var util_js_1 = require_util();
    var name_js_1 = require_name();
    var Transactions2 = function(_super) {
      __extends(Transactions3, _super);
      function Transactions3(client, indexer, name) {
        var _this = _super.call(this, client, indexer) || this;
        if (name instanceof name_js_1.Name) {
          _this.name = name.name;
        } else {
          _this.name = name;
        }
        return _this;
      }
      Transactions3.prototype.calculatePrice = function(period) {
        var amount = 0;
        if (this.name.length === 3) {
          amount = constants_js_1.REGISTRATION_PRICE.CHAR_3_AMOUNT * period;
        } else if (this.name.length === 4) {
          amount = constants_js_1.REGISTRATION_PRICE.CHAR_4_AMOUNT * period;
        } else if (this.name.length >= 5) {
          amount = constants_js_1.REGISTRATION_PRICE.CHAR_5_AMOUNT * period;
        }
        return amount;
      };
      Transactions3.prototype.prepareNameRegistrationTransactions = function(address, period) {
        return __awaiter(this, void 0, void 0, function() {
          var algodClient, amount, lsig, params, receiver, sender, closeToRemaninder, note, txn1, groupTxns, txn2, txn3, method, appArgs, txn4, signedOptinTxn;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                algodClient = this.rpc;
                amount = 0;
                return [4, this.getTeal(this.name)];
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
                amount = this.calculatePrice(period);
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
                return [
                  4,
                  algosdk_1["default"].makeApplicationOptInTxnFromObject({
                    from: lsig.address(),
                    suggestedParams: params,
                    appIndex: constants_js_1.APP_ID
                  })
                ];
              case 3:
                txn3 = _a.sent();
                groupTxns.push(txn3);
                method = "register_name";
                appArgs = [];
                appArgs.push(util_js_1.toIntArray(method));
                appArgs.push(util_js_1.toIntArray(this.name));
                appArgs.push(algosdk_1["default"].encodeUint64(period));
                return [
                  4,
                  algosdk_1["default"].makeApplicationNoOpTxn(address, params, constants_js_1.APP_ID, appArgs, [lsig.address()])
                ];
              case 4:
                txn4 = _a.sent();
                groupTxns.push(txn4);
                algosdk_1["default"].assignGroupID(groupTxns);
                signedOptinTxn = algosdk_1["default"].signLogicSigTransaction(groupTxns[2], lsig);
                return [
                  2,
                  {
                    optinTxn: signedOptinTxn,
                    txns: groupTxns,
                    unsignedOptinTxn: groupTxns[2]
                  }
                ];
            }
          });
        });
      };
      Transactions3.prototype.prepareUpdateNamePropertyTransactions = function(address, editedHandles) {
        return __awaiter(this, void 0, void 0, function() {
          var lsig, params, method, groupTxns, _a, _b, _i, key, appArgs, network, handle, txn;
          return __generator(this, function(_c) {
            switch (_c.label) {
              case 0:
                return [4, this.getTeal(this.name)];
              case 1:
                lsig = _c.sent();
                return [4, this.rpc.getTransactionParams()["do"]()];
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
                appArgs.push(util_js_1.toIntArray(method));
                appArgs.push(util_js_1.toIntArray(network));
                appArgs.push(util_js_1.toIntArray(handle));
                return [
                  4,
                  algosdk_1["default"].makeApplicationNoOpTxn(address, params, constants_js_1.APP_ID, appArgs, [lsig.address()])
                ];
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
      Transactions3.prototype.prepareNameRenewalTxns = function(sender, years) {
        return __awaiter(this, void 0, void 0, function() {
          var params, receiver, closeToRemaninder, note, paymentTxn, lsig, appArgs, applicationTxn;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.rpc.getTransactionParams()["do"]()];
              case 1:
                params = _a.sent();
                receiver = algosdk_1["default"].getApplicationAddress(constants_js_1.APP_ID);
                closeToRemaninder = void 0;
                note = void 0;
                paymentTxn = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, this.calculatePrice(years), closeToRemaninder, note, params);
                return [4, this.getTeal(this.name)];
              case 2:
                lsig = _a.sent();
                appArgs = [];
                appArgs.push(util_js_1.toIntArray("renew_name"));
                appArgs.push(algosdk_1["default"].encodeUint64(years));
                applicationTxn = algosdk_1["default"].makeApplicationNoOpTxn(sender, params, constants_js_1.APP_ID, appArgs, [lsig.address()]);
                algosdk_1["default"].assignGroupID([paymentTxn, applicationTxn]);
                return [2, [paymentTxn, applicationTxn]];
            }
          });
        });
      };
      Transactions3.prototype.prepareInitiateNameTransferTransaction = function(sender, newOwner, price) {
        return __awaiter(this, void 0, void 0, function() {
          var params, lsig, appArgs;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                price = algosdk_1["default"].algosToMicroalgos(price);
                return [4, this.rpc.getTransactionParams()["do"]()];
              case 1:
                params = _a.sent();
                return [4, this.getTeal(this.name)];
              case 2:
                lsig = _a.sent();
                appArgs = [];
                appArgs.push(util_js_1.toIntArray("initiate_transfer"));
                appArgs.push(algosdk_1["default"].encodeUint64(price));
                return [
                  2,
                  algosdk_1["default"].makeApplicationNoOpTxn(sender, params, constants_js_1.APP_ID, appArgs, [lsig.address(), newOwner])
                ];
            }
          });
        });
      };
      Transactions3.prototype.prepareAcceptNameTransferTransactions = function(sender, receiver, amt) {
        return __awaiter(this, void 0, void 0, function() {
          var params, closeToRemaninder, note, paymentToOwnerTxn, paymentToSmartContractTxn, lsig, appArgs, applicationTxn;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                amt = algosdk_1["default"].algosToMicroalgos(amt);
                return [4, this.rpc.getTransactionParams()["do"]()];
              case 1:
                params = _a.sent();
                closeToRemaninder = void 0;
                note = void 0;
                paymentToOwnerTxn = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
                receiver = algosdk_1["default"].getApplicationAddress(constants_js_1.APP_ID);
                paymentToSmartContractTxn = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, constants_js_1.TRANSFER_FEE, closeToRemaninder, note, params);
                return [4, this.getTeal(this.name)];
              case 2:
                lsig = _a.sent();
                appArgs = [];
                appArgs.push(util_js_1.toIntArray("accept_transfer"));
                applicationTxn = algosdk_1["default"].makeApplicationNoOpTxn(sender, params, constants_js_1.APP_ID, appArgs, [lsig.address()]);
                algosdk_1["default"].assignGroupID([
                  paymentToOwnerTxn,
                  paymentToSmartContractTxn,
                  applicationTxn
                ]);
                return [
                  2,
                  [paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn]
                ];
            }
          });
        });
      };
      return Transactions3;
    }(cachedApi_js_1["default"]);
    exports.Transactions = Transactions2;
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
    var errors_js_1 = require_errors();
    function isValidAddress(address) {
      return algosdk_1["default"].isValidAddress(address);
    }
    exports.isValidAddress = isValidAddress;
    function normalizeName(name) {
      var tld = name.split(".").pop();
      if (constants_js_1.ALLOWED_TLDS.includes(tld)) {
        name = name.split(".")[0].toLowerCase();
      } else {
        throw new Error("TLD not supported");
      }
      var lengthOfName = name.length;
      if (lengthOfName > 64) {
        throw new errors_js_1.InvalidNameError();
      }
      for (var i = 0; i < lengthOfName; i++) {
        if (!(name.charCodeAt(i) >= constants_js_1.ASCII_CODES.ASCII_0 && name.charCodeAt(i) <= constants_js_1.ASCII_CODES.ASCII_9)) {
          if (!(name.charCodeAt(i) >= constants_js_1.ASCII_CODES.ASCII_A && name.charCodeAt(i) <= constants_js_1.ASCII_CODES.ASCII_Z))
            throw new errors_js_1.InvalidNameError();
        }
      }
      return name;
    }
    exports.normalizeName = normalizeName;
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
      var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = { next: verb(0), throw: verb(1), return: verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
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
        var name = options.name, rpc = options.rpc, indexer = options.indexer;
        this._name = name;
        this.resolver = new resolver_js_1.Resolver(rpc, indexer, this);
        this.transactions = new transactions_js_1.Transactions(rpc, indexer, this);
      }
      Object.defineProperty(Name3.prototype, "name", {
        get: function() {
          return this._name;
        },
        enumerable: true,
        configurable: true
      });
      Name3.prototype.isRegistered = function() {
        return __awaiter(this, void 0, void 0, function() {
          var status;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolver.resolveName()];
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
                return [4, this.resolver.owner()];
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
                return [4, this.resolver.content()];
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
                return [4, this.resolver.text(key)];
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
                return [4, this.resolver.resolveName()];
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
                return [4, this.resolver.expiry()];
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
                  throw new errors_js_1.NameNotRegisteredError(this._name);
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
                    throw new errors_js_1.IncorrectOwnerError(this._name, sender);
                  }
                } else if (sender && receiver) {
                  if (method === "initiate_transfer") {
                    if (owner !== sender) {
                      throw new errors_js_1.IncorrectOwnerError(this._name, sender);
                    }
                  } else if (method === "accept_transfer") {
                    if (owner !== receiver) {
                      throw new errors_js_1.IncorrectOwnerError(this._name, receiver);
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
                return [
                  4,
                  this.transactions.prepareNameRegistrationTransactions(address, period)
                ];
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
                return [
                  4,
                  this.transactions.prepareUpdateNamePropertyTransactions(address, editedHandles)
                ];
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
                return [
                  4,
                  this.transactions.prepareNameRenewalTxns(address, years)
                ];
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
                return [
                  4,
                  this.isValidTransaction(owner, newOwner, "initiate_transfer")
                ];
              case 1:
                _a.sent();
                return [
                  4,
                  this.transactions.prepareInitiateNameTransferTransaction(owner, newOwner, price)
                ];
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
                return [
                  4,
                  this.isValidTransaction(newOwner, owner, "accept_transfer")
                ];
              case 1:
                _a.sent();
                return [
                  4,
                  this.transactions.prepareAcceptNameTransferTransactions(newOwner, owner, price)
                ];
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

// src/transactions.ts
var transactions_exports = {};
__export(transactions_exports, {
  Transactions: () => Transactions
});
module.exports = __toCommonJS(transactions_exports);
init_cjs_shims();
var import_algosdk = __toESM(require("algosdk"));
var import_constants = __toESM(require_constants());
var import_cachedApi = __toESM(require_cachedApi());
var import_util = __toESM(require_util());
var import_name = __toESM(require_name());
var Transactions = class extends import_cachedApi.default {
  name;
  constructor(client, indexer, name) {
    super(client, indexer);
    if (name instanceof import_name.Name) {
      this.name = name.name;
    } else {
      this.name = name;
    }
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
    const algodClient = this.rpc;
    let amount = 0;
    const lsig = await this.getTeal(this.name);
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
    const method = "register_name";
    const appArgs = [];
    appArgs.push((0, import_util.toIntArray)(method));
    appArgs.push((0, import_util.toIntArray)(this.name));
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
      appArgs.push((0, import_util.toIntArray)(method));
      appArgs.push((0, import_util.toIntArray)(network));
      appArgs.push((0, import_util.toIntArray)(handle));
      const txn = await import_algosdk.default.makeApplicationNoOpTxn(address, params, import_constants.APP_ID, appArgs, [lsig.address()]);
      groupTxns.push(txn);
    }
    if (Object.keys(editedHandles).length > 1) {
      import_algosdk.default.assignGroupID(groupTxns);
    }
    return groupTxns;
  }
  async prepareNameRenewalTxns(sender, years) {
    const params = await this.rpc.getTransactionParams().do();
    const receiver = import_algosdk.default.getApplicationAddress(import_constants.APP_ID);
    const closeToRemaninder = void 0;
    const note = void 0;
    const paymentTxn = import_algosdk.default.makePaymentTxnWithSuggestedParams(sender, receiver, this.calculatePrice(years), closeToRemaninder, note, params);
    const lsig = await this.getTeal(this.name);
    const appArgs = [];
    appArgs.push((0, import_util.toIntArray)("renew_name"));
    appArgs.push(import_algosdk.default.encodeUint64(years));
    const applicationTxn = import_algosdk.default.makeApplicationNoOpTxn(sender, params, import_constants.APP_ID, appArgs, [lsig.address()]);
    import_algosdk.default.assignGroupID([paymentTxn, applicationTxn]);
    return [paymentTxn, applicationTxn];
  }
  async prepareInitiateNameTransferTransaction(sender, newOwner, price) {
    price = import_algosdk.default.algosToMicroalgos(price);
    const params = await this.rpc.getTransactionParams().do();
    const lsig = await this.getTeal(this.name);
    const appArgs = [];
    appArgs.push((0, import_util.toIntArray)("initiate_transfer"));
    appArgs.push(import_algosdk.default.encodeUint64(price));
    return import_algosdk.default.makeApplicationNoOpTxn(sender, params, import_constants.APP_ID, appArgs, [
      lsig.address(),
      newOwner
    ]);
  }
  async prepareAcceptNameTransferTransactions(sender, receiver, amt) {
    amt = import_algosdk.default.algosToMicroalgos(amt);
    const params = await this.rpc.getTransactionParams().do();
    const closeToRemaninder = void 0;
    const note = void 0;
    const paymentToOwnerTxn = import_algosdk.default.makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
    receiver = import_algosdk.default.getApplicationAddress(import_constants.APP_ID);
    const paymentToSmartContractTxn = import_algosdk.default.makePaymentTxnWithSuggestedParams(sender, receiver, import_constants.TRANSFER_FEE, closeToRemaninder, note, params);
    const lsig = await this.getTeal(this.name);
    const appArgs = [];
    appArgs.push((0, import_util.toIntArray)("accept_transfer"));
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