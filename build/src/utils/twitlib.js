"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twit_1 = __importDefault(require("twit"));
const config_1 = __importDefault(require("config"));
const querystring_1 = __importDefault(require("querystring"));
const request_1 = __importDefault(require("request"));
const util_1 = __importDefault(require("util"));
class Twit {
    constructor() {
        this.client = new twit_1.default({
            consumer_key: config_1.default.get('consumer_key'),
            consumer_secret: config_1.default.get('consumer_secret'),
            access_token: config_1.default.get('access_token'),
            access_token_secret: config_1.default.get('access_token_secret'),
        });
        this.readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.get = util_1.default.promisify(request_1.default.get);
        this.post = util_1.default.promisify(request_1.default.post);
    }
}
var consumer_key = config_1.default.get('consumer_key');
var consumer_secret = config_1.default.get('consumer_secret');
const requestTokenURL = new URL('https://api.twitter.com/oauth/request_token');
const accessTokenURL = new URL('https://api.twitter.com/oauth/access_token');
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const endpointURL = new URL('https://api.twitter.com/labs/2/tweets');
const params = {
    ids: '1138505981460193280',
    'tweet.fields': 'created_at',
};
async function input(prompt) {
    return new Promise(async (resolve, reject) => {
        readline.question(prompt, (out) => {
            readline.close();
            resolve(out);
        });
    });
}
async function requestToken() {
    const oAuthConfig = {
        callback: 'oob',
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
    };
    const req = await post({ url: requestTokenURL, oauth: oAuthConfig });
    if (req.body) {
        return querystring_1.default.parse(req.body);
    }
    else {
        throw new Error('Cannot get an OAuth request token');
    }
}
async function accessToken({ oauth_token, oauth_token_secret }, verifier) {
    const oAuthConfig = {
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
        token: oauth_token,
        token_secret: oauth_token_secret,
        verifier: verifier,
    };
    const req = await post({ url: accessTokenURL, oauth: oAuthConfig });
    if (req.body) {
        return querystring_1.default.parse(req.body);
    }
    else {
        throw new Error('Cannot get an OAuth request token');
    }
}
async function getRequest({ oauth_token, oauth_token_secret }) {
    const oAuthConfig = {
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
        token: oauth_token,
        token_secret: oauth_token_secret,
    };
    const req = await get({ url: endpointURL, oauth: oAuthConfig, qs: params, json: true });
    if (req.body) {
        return req.body;
    }
    else {
        throw new Error('Cannot get an OAuth request token');
    }
}
(async () => {
    try {
        const oAuthRequestToken = await requestToken();
        authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);
        console.log('Please go here and authorize:', authorizeURL.href);
        const pin = await input('Paste the PIN here: ');
        const oAuthAccessToken = await accessToken(oAuthRequestToken, pin.trim());
        const response = await getRequest(oAuthAccessToken);
        console.log(response);
    }
    catch (e) {
        console.error(e);
        process.exit(-1);
    }
    process.exit();
})();
//# sourceMappingURL=twitlib.js.map