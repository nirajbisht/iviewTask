import * as CONSTANTS from '../constants'
import { requestLib } from '../utils'

class PostComment {
    constructor() { }

    async filterCommentAndPost(post: Array<Object>, comment: Array<Object>) {
        try {
            let commentObj = {}
            let postAndComment = []
            comment.filter((element) => {
                if (commentObj[element['postId']]) {
                    commentObj[element['postId']].push(element)
                }
                else {
                    commentObj[element['postId']] = [element]
                }
            })
            post.forEach((ele) => {
                if (commentObj[ele['id']]) {
                    postAndComment.push({
                        ...ele,
                        comment: commentObj[ele['id']]
                    })
                }
                else {
                    postAndComment.push({
                        ...ele,
                        comment: []
                    })
                }
            })
            return postAndComment

        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getPostAndComment() {
        try {
            let promise = []
            promise.push(requestLib.httpRequest(CONSTANTS.URL.POSTS, CONSTANTS.HTTP_METHODS.GET))
            promise.push(requestLib.httpRequest(CONSTANTS.URL.COMMENTS, CONSTANTS.HTTP_METHODS.GET))

            let response = await Promise.all(promise)
            let post = response[0]
            let comments = response[1]
            if (post && post.length > 0) {
                let filterData = await this.filterCommentAndPost(post, comments)
                return filterData
            }
            else return Promise.reject(CONSTANTS.STATUS_MSG.ERROR.E400.NOT_FOUND_DATA)

        } catch (error) {
            return Promise.reject(error)
        }
    }

}

export let postCommentService = new PostComment()