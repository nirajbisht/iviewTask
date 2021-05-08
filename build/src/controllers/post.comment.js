"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCommentService = void 0;
const CONSTANTS = __importStar(require("../constants"));
const utils_1 = require("../utils");
class PostComment {
    constructor() { }
    async filterCommentAndPost(post, comment) {
        try {
            let commentObj = {};
            let postAndComment = [];
            comment.filter((element) => {
                if (commentObj[element['postId']]) {
                    commentObj[element['postId']].push(element);
                }
                else {
                    commentObj[element['postId']] = [element];
                }
            });
            post.forEach((ele) => {
                if (commentObj[ele['id']]) {
                    postAndComment.push(Object.assign(Object.assign({}, ele), { comment: commentObj[ele['id']] }));
                }
                else {
                    postAndComment.push(Object.assign(Object.assign({}, ele), { comment: [] }));
                }
            });
            return postAndComment;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async getPostAndComment() {
        try {
            let promise = [];
            promise.push(utils_1.requestLib.httpRequest(CONSTANTS.URL.POSTS, CONSTANTS.HTTP_METHODS.GET));
            promise.push(utils_1.requestLib.httpRequest(CONSTANTS.URL.COMMENTS, CONSTANTS.HTTP_METHODS.GET));
            let response = await Promise.all(promise);
            let post = response[0];
            let comments = response[1];
            if (post && post.length > 0) {
                let filterData = await this.filterCommentAndPost(post, comments);
                return filterData;
            }
            else
                return Promise.reject(CONSTANTS.STATUS_MSG.ERROR.E400.NOT_FOUND_DATA);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
exports.postCommentService = new PostComment();
//# sourceMappingURL=post.comment.js.map