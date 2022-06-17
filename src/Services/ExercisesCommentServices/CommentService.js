/* eslint-disable no-useless-constructor */
import { BaseServices } from '../BaseServices'

export class CommentService extends BaseServices {
    constructor() {
        super();
    };

    postComment = (comment) => {
        return this.post(`Comment/insertComment`, comment)
    }

    deleteComment = (idComment) => {
        return this.delete(`Comment/deleteComment?idComment=${idComment}`)
    }

    updateComment = (id, contentComment) => {
        return this.put(`Comment/updateComment?id=${id}&contentComment=${contentComment}`)
    }
}


export const commentService = new CommentService();