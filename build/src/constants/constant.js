"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = exports.HTTP_METHODS = exports.STATUS_MSG = void 0;
exports.STATUS_MSG = {
    ERROR: {
        E400: {
            NOT_FOUND_DATA: {
                statusCode: 400,
                message: "Data Not Found",
                type: "NOT_FOUND_DATA"
            }
        },
        E401: {
            UNAUTHORIZED: {
                statusCode: 401,
                message: 'You are not authorized to perform this action',
                type: 'UNAUTHORIZED'
            }
        },
        E403: {
            USER_BLOCKED: {
                statusCode: 403,
                type: 'USER_BLOCKED',
                message: 'Your account is blocked by admin'
            }
        },
        E404: {
            DATA_NOT_FOUND: {
                statusCode: 404,
                type: 'DATA_NOT_FOUND',
                message: 'Result not found'
            },
            USER_NOT_FOUND: {
                statusCode: 404,
                message: 'User not found',
                type: 'USER_NOT_FOUND'
            },
        },
    },
    SUCCESS: {
        S200: {
            DEFAULT: {
                statusCode: 200,
                message: 'Success',
                type: 'DEFAULT',
            },
        },
        S201: {
            CREATED: {
                statusCode: 201,
                message: 'Created Successfully',
                type: 'CREATED'
            },
        },
    }
};
exports.HTTP_METHODS = {
    GET: "GET",
};
exports.URL = {
    POSTS: "https://jsonplaceholder.typicode.com/posts",
    COMMENTS: "https://jsonplaceholder.typicode.com/comments"
};
//# sourceMappingURL=constant.js.map