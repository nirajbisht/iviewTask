"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLib = void 0;
const axios_1 = __importDefault(require("axios"));
class HttpManager {
    constructor() { }
    async httpRequest(path, method) {
        try {
            switch (method) {
                case 'GET': {
                    return (await axios_1.default.get(path)).data;
                }
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
exports.requestLib = new HttpManager();
//# sourceMappingURL=httpManager.js.map