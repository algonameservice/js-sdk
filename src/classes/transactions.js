"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var algosdk_1 = require("algosdk");
var constants_1 = require("../constants");
var generateTeal_1 = require("./generateTeal");
var Transactions = /** @class */ (function () {
    function Transactions(client) {
        var _this = this;
        this.generateLsig = function (name) { return __awaiter(_this, void 0, void 0, function () {
            var client, program, lsig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.algodClient;
                        return [4 /*yield*/, client.compile(generateTeal_1.generateTeal(name))["do"]()];
                    case 1:
                        program = _a.sent();
                        program = new Uint8Array(Buffer.from(program.result, "base64"));
                        lsig = new algosdk_1["default"].LogicSigAccount(program);
                        return [2 /*return*/, lsig];
                }
            });
        }); };
        this.prepareNameRegistrationTransactions = function (name, address, period) { return __awaiter(_this, void 0, void 0, function () {
            var algodClient, amount, lsig, params, receiver, sender, closeToRemaninder, note, txn1, groupTxns, txn2, txn3, method, appArgs, txn4, signedOptinTxn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        algodClient = this.algodClient;
                        amount = 0;
                        return [4 /*yield*/, this.generateLsig(name)];
                    case 1:
                        lsig = _a.sent();
                        return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                    case 2:
                        params = _a.sent();
                        params.fee = 1000;
                        params.flatFee = true;
                        receiver = algosdk_1["default"].getApplicationAddress(constants_1.CONSTANTS.APP_ID);
                        sender = address;
                        if (period === undefined)
                            period = 0;
                        else
                            period = period - 1;
                        if (name.length < 3)
                            return [2 /*return*/];
                        else if (name.length === 3)
                            amount = constants_1.CONSTANTS.CHAR_3_AMOUNT + period * constants_1.CONSTANTS.CHAR_3_AMOUNT;
                        else if (name.length === 4)
                            amount = constants_1.CONSTANTS.CHAR_4_AMOUNT + period * constants_1.CONSTANTS.CHAR_4_AMOUNT;
                        else if (name.length >= 5)
                            amount = constants_1.CONSTANTS.CHAR_5_AMOUNT + period * constants_1.CONSTANTS.CHAR_5_AMOUNT;
                        closeToRemaninder = undefined;
                        note = undefined;
                        txn1 = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
                        groupTxns = [];
                        groupTxns.push(txn1);
                        /* 2nd Txn - Funding Lsig */
                        sender = address;
                        receiver = lsig.address();
                        amount = 915000;
                        txn2 = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);
                        groupTxns.push(txn2);
                        return [4 /*yield*/, algosdk_1["default"].makeApplicationOptInTxnFromObject({
                                from: lsig.address(),
                                suggestedParams: params,
                                appIndex: this.APP_ID
                            })];
                    case 3:
                        txn3 = _a.sent();
                        groupTxns.push(txn3);
                        sender = lsig.address();
                        receiver = address;
                        amount = 0;
                        method = "register_name";
                        appArgs = [];
                        period = period + 1;
                        appArgs.push(new Uint8Array(Buffer.from(method)));
                        appArgs.push(new Uint8Array(Buffer.from(name)));
                        appArgs.push(algosdk_1["default"].encodeUint64(period));
                        return [4 /*yield*/, algosdk_1["default"].makeApplicationNoOpTxn(address, params, this.APP_ID, appArgs, [lsig.address()])];
                    case 4:
                        txn4 = _a.sent();
                        groupTxns.push(txn4);
                        algosdk_1["default"].assignGroupID(groupTxns);
                        signedOptinTxn = algosdk_1["default"].signLogicSigTransaction(groupTxns[2], lsig);
                        return [2 /*return*/, ({ optinTxn: signedOptinTxn, txns: groupTxns, unsignedOptinTxn: groupTxns[2] })];
                }
            });
        }); };
        this.prepareUpdateNamePropertyTransactions = function (name, address, editedHandles) { return __awaiter(_this, void 0, void 0, function () {
            var algodClient, lsig, params, method, txns, groupTxns, _a, _b, _i, key, appArgs, network, handle, txn;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        algodClient = this.algodClient;
                        return [4 /*yield*/, this.generateLsig(name)];
                    case 1:
                        lsig = _c.sent();
                        return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                    case 2:
                        params = _c.sent();
                        params.fee = 1000;
                        params.flatFee = true;
                        method = "update_name";
                        txns = [];
                        groupTxns = [];
                        _a = [];
                        for (_b in editedHandles)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        key = _a[_i];
                        appArgs = [];
                        network = key;
                        handle = editedHandles[key];
                        appArgs.push(new Uint8Array(Buffer.from(method)));
                        appArgs.push(new Uint8Array(Buffer.from(network)));
                        appArgs.push(new Uint8Array(Buffer.from(handle)));
                        return [4 /*yield*/, algosdk_1["default"].makeApplicationNoOpTxn(address, params, this.APP_ID, appArgs, [lsig.address()])];
                    case 4:
                        txn = _c.sent();
                        groupTxns.push(txn);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, groupTxns];
                }
            });
        }); };
        this.preparePaymentTxn = function (sender, receiver, amt, note) { return __awaiter(_this, void 0, void 0, function () {
            var algodClient, params, enc, closeToRemaninder, txn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        algodClient = this.algodClient;
                        return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                    case 1:
                        params = _a.sent();
                        amt = algosdk_1["default"].algosToMicroalgos(amt);
                        enc = new TextEncoder();
                        note = enc.encode(note);
                        closeToRemaninder = undefined;
                        txn = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
                        return [2 /*return*/, txn];
                }
            });
        }); };
        this.prepareNameRenewalTxns = function (name, sender, years, amt) { return __awaiter(_this, void 0, void 0, function () {
            var algodClient, params, receiver, closeToRemaninder, note, paymentTxn, lsig, appArgs, applicationTxn, groupTxns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        algodClient = this.algodClient;
                        amt = algosdk_1["default"].algosToMicroalgos(amt);
                        return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                    case 1:
                        params = _a.sent();
                        receiver = algosdk_1["default"].getApplicationAddress(constants_1.CONSTANTS.APP_ID);
                        closeToRemaninder = undefined;
                        note = undefined;
                        paymentTxn = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
                        name = name.split('.algo')[0];
                        return [4 /*yield*/, this.generateLsig(name)];
                    case 2:
                        lsig = _a.sent();
                        appArgs = [];
                        appArgs.push(new Uint8Array(Buffer.from("renew_name")));
                        appArgs.push(algosdk_1["default"].encodeUint64(years));
                        applicationTxn = algosdk_1["default"].makeApplicationNoOpTxn(sender, params, constants_1.CONSTANTS.APP_ID, appArgs, [lsig.address()]);
                        algosdk_1["default"].assignGroupID([paymentTxn, applicationTxn]);
                        groupTxns = [paymentTxn, applicationTxn];
                        return [2 /*return*/, groupTxns];
                }
            });
        }); };
        this.prepareInitiateNameTransferTransaction = function (name, sender, newOwner, price) { return __awaiter(_this, void 0, void 0, function () {
            var algodClient, params, lsig, appArgs, applicationTxn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        algodClient = this.algodClient;
                        price = algosdk_1["default"].algosToMicroalgos(price);
                        return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                    case 1:
                        params = _a.sent();
                        name = name.split('.algo')[0];
                        return [4 /*yield*/, this.generateLsig(name)];
                    case 2:
                        lsig = _a.sent();
                        appArgs = [];
                        appArgs.push(new Uint8Array(Buffer.from("initiate_transfer")));
                        appArgs.push(algosdk_1["default"].encodeUint64(price));
                        applicationTxn = algosdk_1["default"].makeApplicationNoOpTxn(sender, params, constants_1.CONSTANTS.APP_ID, appArgs, [lsig.address(), newOwner]);
                        return [2 /*return*/, applicationTxn];
                }
            });
        }); };
        this.prepareAcceptNameTransferTransactions = function (name, sender, receiver, amt) { return __awaiter(_this, void 0, void 0, function () {
            var algodClient, params, closeToRemaninder, note, paymentToOwnerTxn, paymentToSmartContractTxn, lsig, appArgs, applicationTxn, groupTxns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amt = algosdk_1["default"].algosToMicroalgos(amt);
                        algodClient = this.algodClient;
                        return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                    case 1:
                        params = _a.sent();
                        closeToRemaninder = undefined;
                        note = undefined;
                        paymentToOwnerTxn = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, amt, closeToRemaninder, note, params);
                        receiver = algosdk_1["default"].getApplicationAddress(constants_1.CONSTANTS.APP_ID);
                        paymentToSmartContractTxn = algosdk_1["default"].makePaymentTxnWithSuggestedParams(sender, receiver, constants_1.CONSTANTS.TRANSFER_FEE, closeToRemaninder, note, params);
                        name = name.split('.algo')[0];
                        return [4 /*yield*/, this.generateLsig(name)];
                    case 2:
                        lsig = _a.sent();
                        appArgs = [];
                        appArgs.push(new Uint8Array(Buffer.from("accept_transfer")));
                        applicationTxn = algosdk_1["default"].makeApplicationNoOpTxn(sender, params, constants_1.CONSTANTS.APP_ID, appArgs, [lsig.address()]);
                        algosdk_1["default"].assignGroupID([paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn]);
                        groupTxns = [paymentToOwnerTxn, paymentToSmartContractTxn, applicationTxn];
                        return [2 /*return*/, groupTxns];
                }
            });
        }); };
        this.algodClient = client;
        this.APP_ID = constants_1.CONSTANTS.APP_ID;
    }
    return Transactions;
}());
exports.Transactions = Transactions;
