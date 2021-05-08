"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readParams = void 0;
const joi_1 = __importDefault(require("joi"));
exports.readParams = joi_1.default.object({
    limit: joi_1.default.number().min(1).required(),
    name: joi_1.default.string().min(2),
    email: joi_1.default.string().min(8)
});
//# sourceMappingURL=read_write_validation_schema.js.map