"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const read_write_validation_schema_1 = require("./read_write_validation_schema");
const express_joi_validation_1 = require("express-joi-validation");
const validator = express_joi_validation_1.createValidator();
express_1.router.get('/:article/comments', validator.query(read_write_validation_schema_1.readParams), function (req, res, next) {
    console.log(">>>>>>>>>>>>REQUEST VALIDTE>>>");
});
//# sourceMappingURL=read_write_csv.routes.js.map