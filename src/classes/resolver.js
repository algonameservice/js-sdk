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
var errors_1 = require("./errors");
var generateTeal_1 = require("./generateTeal");
var resolver = /** @class */ (function () {
    function resolver(client, indexer) {
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
                        lsig = algosdk_1["default"].makeLogicSig(program);
                        return [2 /*return*/, lsig];
                }
            });
        }); };
        this.resolveName = function (name) { return __awaiter(_this, void 0, void 0, function () {
            var indexer, lsig, accountInfo, length_1, owner, found, data, i, app, kv, kvLength, j, key, value, kvObj, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(name.length === 0 || name.length > 64)) return [3 /*break*/, 1];
                        throw new errors_1.InvalidNameError();
                    case 1:
                        name = name.split('.algo')[0];
                        name = name.toLowerCase();
                        return [4 /*yield*/, this.indexerClient];
                    case 2:
                        indexer = _a.sent();
                        return [4 /*yield*/, this.generateLsig(name)];
                    case 3:
                        lsig = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, indexer.lookupAccountByID(lsig.address())["do"]()];
                    case 5:
                        accountInfo = _a.sent();
                        accountInfo = accountInfo.account['apps-local-state'];
                        length_1 = accountInfo.length;
                        owner = void 0;
                        found = false;
                        data = [];
                        for (i = 0; i < length_1; i++) {
                            app = accountInfo[i];
                            if (app.id === this.APP_ID) {
                                kv = app['key-value'];
                                kvLength = kv.length;
                                for (j = 0; j < kvLength; j++) {
                                    key = Buffer.from(kv[j].key, 'base64').toString();
                                    value = void 0;
                                    if (key === 'expiry') {
                                        value = kv[j].value.uint;
                                        value = new Date(value * 1000).toString();
                                    }
                                    else if (key === 'transfer_price') {
                                        value = kv[j].value.uint;
                                    }
                                    else if (key === 'transfer_to') {
                                        value = kv[j].value.bytes;
                                        if (value !== "")
                                            value = (algosdk_1["default"].encodeAddress(new Uint8Array(Buffer.from(value, 'base64'))));
                                    }
                                    else
                                        value = Buffer.from(kv[j].value.bytes, 'base64').toString();
                                    kvObj = {
                                        key: key,
                                        value: value
                                    };
                                    if (key !== 'owner' && value !== '' && value !== 0 && key !== 'name')
                                        data.push(kvObj);
                                    if (key === 'owner') {
                                        value = kv[j].value.bytes;
                                        value = (algosdk_1["default"].encodeAddress(new Uint8Array(Buffer.from(value, 'base64'))));
                                        owner = value;
                                        found = true;
                                    }
                                }
                            }
                        }
                        if (found) {
                            return [2 /*return*/, ({ found: true, address: owner, kvPairs: data })];
                        }
                        else
                            return [2 /*return*/, ({ found: false })];
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        return [2 /*return*/, ({ found: false })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.getNamesOwnedByAddress = function (address, limit) { return __awaiter(_this, void 0, void 0, function () {
            var isValidAddress, indexer, nextToken, txnLength, txns, count, info, err_2, accountTxns, i, names, i, txn, appArgs, lsigAccount, accountInfo, length_2, i_1, kvPairs, j, key, value, err_3, details, i, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, algosdk_1["default"].isValidAddress(address)];
                    case 1:
                        isValidAddress = _a.sent();
                        if (!!isValidAddress) return [3 /*break*/, 2];
                        throw new errors_1.AddressValidationError();
                    case 2: return [4 /*yield*/, this.indexerClient];
                    case 3:
                        indexer = _a.sent();
                        nextToken = '';
                        txnLength = 1;
                        txns = [];
                        count = 0;
                        _a.label = 4;
                    case 4:
                        if (!(txnLength > 0)) return [3 /*break*/, 9];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, indexer.lookupAccountTransactions(address).
                                limit(10000).
                                afterTime('2022-02-25').
                                nextToken(nextToken)["do"]()];
                    case 6:
                        info = _a.sent();
                        txnLength = info.transactions.length;
                        if (txnLength > 0) {
                            count++;
                            nextToken = info["next-token"];
                            txns.push(info.transactions);
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 8: return [3 /*break*/, 4];
                    case 9:
                        accountTxns = [];
                        for (i = 0; i < txns.length; i++) {
                            accountTxns = accountTxns.concat(txns[i]);
                        }
                        txns = accountTxns;
                        names = [];
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 16, , 17]);
                        i = 0;
                        _a.label = 11;
                    case 11:
                        if (!(i < txns.length)) return [3 /*break*/, 15];
                        txn = txns[i];
                        if (!(txn["tx-type"] === "appl")) return [3 /*break*/, 14];
                        if (!(txn["application-transaction"]["application-id"] === constants_1.CONSTANTS.APP_ID)) return [3 /*break*/, 14];
                        appArgs = txn["application-transaction"]["application-args"];
                        if (!(Buffer.from(appArgs[0], 'base64').toString() === "register_name")) return [3 /*break*/, 12];
                        if (!names.includes(Buffer.from(appArgs[1], 'base64').toString()))
                            names.push(Buffer.from(appArgs[1], 'base64').toString());
                        return [3 /*break*/, 14];
                    case 12:
                        if (!(Buffer.from(appArgs[0], 'base64').toString() === "accept_transfer")) return [3 /*break*/, 14];
                        lsigAccount = txn["application-transaction"]["accounts"][0];
                        return [4 /*yield*/, indexer.lookupAccountByID(lsigAccount)["do"]()];
                    case 13:
                        accountInfo = _a.sent();
                        accountInfo = accountInfo.account['apps-local-state'];
                        length_2 = accountInfo.length;
                        for (i_1 = 0; i_1 < length_2; i_1++) {
                            if (accountInfo[i_1].id === constants_1.CONSTANTS.APP_ID) {
                                kvPairs = accountInfo[i_1]["key-value"];
                                for (j = 0; j < kvPairs.length; j++) {
                                    key = Buffer.from(kvPairs[j].key, 'base64');
                                    value = Buffer.from(kvPairs[j].value.bytes, 'base64');
                                    if (key === 'name') {
                                        if (!names.includes(value))
                                            names.push(value);
                                        break;
                                    }
                                }
                            }
                        }
                        _a.label = 14;
                    case 14:
                        i++;
                        return [3 /*break*/, 11];
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        err_3 = _a.sent();
                        return [2 /*return*/, []];
                    case 17:
                        if (!(names.length > 0)) return [3 /*break*/, 22];
                        details = [];
                        i = 0;
                        _a.label = 18;
                    case 18:
                        if (!(i < names.length)) return [3 /*break*/, 21];
                        if (limit !== undefined) {
                            if (details.length >= limit)
                                return [3 /*break*/, 21];
                        }
                        return [4 /*yield*/, this.resolveName(names[i])];
                    case 19:
                        info = _a.sent();
                        if (info.found && info.address !== undefined) {
                            if (info.address === address) {
                                details.push(names[i] + '.algo');
                            }
                        }
                        else {
                            i = i - 1;
                        }
                        _a.label = 20;
                    case 20:
                        i++;
                        return [3 /*break*/, 18];
                    case 21: return [2 /*return*/, (details)];
                    case 22: return [2 /*return*/];
                }
            });
        }); };
        this.algodClient = client;
        this.indexerClient = indexer;
        this.APP_ID = constants_1.CONSTANTS.APP_ID;
    }
    return resolver;
}());
exports.resolver = resolver;
