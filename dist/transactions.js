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
var Transactions = class extends import_cachedApi.default {
  name;
  constructor(client, indexer, name) {
    super(client, indexer);
    this.name = name;
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
    period++;
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