"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapS = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = require("mongoose");
class Bootstrap {
    constructor() {
        this.mongoDbUrl = config_1.default.get('dbConfig.dbUrl');
    }
    async bootstrap(server) {
        try {
            await this.connectMongoDatabase();
            return {};
        }
        catch (error) {
            console.log(">>>bootstrap>>>>", error);
            Promise.reject(error);
        }
        return;
    }
    async connectMongoDatabase() {
        try {
            mongoose_1.set('debug', true);
            mongoose_1.connection.on('error', err => { console.error('%s', err); })
                .on('close', (error) => {
                console.log('Database connection closed.', error, false);
            });
            mongoose_1.connect(this.mongoDbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
                if (err) {
                    console.log('Database connection closed.', err);
                    return Promise.reject(err);
                }
            });
            console.log(`Connected to ${this.mongoDbUrl}`);
            return {};
        }
        catch (error) {
            Promise.reject(error);
        }
    }
}
exports.BootstrapS = new Bootstrap();
//# sourceMappingURL=bootstrap.js.map