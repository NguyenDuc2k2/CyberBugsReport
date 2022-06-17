import { DELETE_COMMENT_SAGA, POST_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "../../Constants/ExercisesCommentContants/CommentContants";
import { GET_TASK_DETAIL_SAGA } from "../../Constants/TaskConstants";

/**==============================reducer======================== */

/**================================saga============================ */

export const updateCommentSaga = (values) => ({
    type: UPDATE_COMMENT_SAGA,
    values,
});

export const postCommentSaga = (comment) => ({
    type: POST_COMMENT_SAGA,
    comment,
})

export const deleteCommentSaga = (commentId, taskId) => ({
    type: DELETE_COMMENT_SAGA,
    commentId,
    taskId
});

/**======================Task detail modal ==========================*/


export const getStakDetailSaga = (taskId) => ({
    type: GET_TASK_DETAIL_SAGA,
    taskId
})