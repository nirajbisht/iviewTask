'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const controllers_1 = require("./src/controllers");
const app = express_1.default();
const init = async () => {
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const port = config_1.default.get('host.node.port');
        const server = app.listen(port);
        console.log(`Listening to http://localhost:${port}`);
        app.get('/post-comment', async (req, res) => {
            let postData = await controllers_1.postCommentService.getPostAndComment();
            res.send(postData);
        });
        process.on('warning', e => console.warn("-------  process warning  -------", e.stack));
        process.on('unhandledRejection', (reason, promise) => {
            console.log('Unhandled Rejection at:', promise, 'reason:', reason);
        });
    }
    catch (err) {
        console.log("error in init fucntion app js", err);
    }
};
init();
//# sourceMappingURL=app.js.map