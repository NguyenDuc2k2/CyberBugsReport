/* eslint-disable require-yield */
import { call, put, takeLatest } from "redux-saga/effects";
import { commentService } from "../../../Services/ExercisesCommentServices/CommentService";
import { STATUS_CODE } from '../../../Util/Contants/SettingSystem'
import { notifiFucction } from "../../../Util/Notification/Notification";
import { getStakDetailSaga } from "../../Action/ExercisesCommentAction/CommentAction";
import { DELETE_COMMENT_SAGA, POST_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "../../Constants/ExercisesCommentContants/CommentContants";



function* postComment(action) {

    try {
        const { status } = yield call(() => commentService.postComment(action.comment));

        if (status === STATUS_CODE.SUCCESS) {
            yield put(getStakDetailSaga(action.comment.taskId))
        }
    } catch (error) {
        notifiFucction("error", 'Post Comment Fail!');
    }
}

export function* theoDoiPostComment() {
    yield takeLatest(POST_COMMENT_SAGA, postComment)
}

function* updateComment(action) {
    const { id, contentComment, taskId } = action.values;

    try {
        const { status } = yield call(() => commentService.updateComment(id, contentComment));

        if (status === STATUS_CODE.SUCCESS) {
            yield put(getStakDetailSaga(taskId))
        }
    } catch (error) {
        notifiFucction("error", 'Edit Commnet Fail!');
    }
}

export function* theoDoiUpdateComment() {
    yield takeLatest(UPDATE_COMMENT_SAGA, updateComment)
}

function* deleteCommentSaga(action) {
    const { commentId } = action;

    try {
        const { status } = yield call(() => commentService.deleteComment(commentId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getStakDetailSaga(action.taskId))
        }
    } catch (error) {
        notifiFucction("error", 'Fail!');
    }
}

export function* theDoiDeleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}

