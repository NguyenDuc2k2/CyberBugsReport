import { all } from 'redux-saga/effects';
import { theDoiDeleteCommentSaga, theoDoiPostComment, theoDoiUpdateComment } from './ExercisesCommentSaga/CommentSaga';
import { theoDoiGetAllPrioritySaga } from './CyberBugsSaga/PrioritySaga';
import {
    theoDoiCreateProjectSaga, theoDoiDeleteProjectSaga, theoDoiGetAllProjectCategorySaga, theoDoiGetListProjectSaga,
    theoDoiGetProjectDetailSaga, theoDoiUpdateProjectSaga
} from './CyberBugsSaga/ProjectSaga';

import { theoDoiGetAllStatusSaga } from './CyberBugsSaga/StatusSaga';
import { theoDoiCreateTaskSaga, theoDoiGetAllTaskTypeSaga, theoDoiGetTaskDetailSaga, theoDoiUpdateTaskSaga, thoiDoiHandleChangePostApi } from './CyberBugsSaga/TaskSaga';
import { theoDoiAddUserprojectSaga, theoDoiDeleteUserProject, theoDoiGetUserByPorjectId, theoDoiGetUserSaga, theoDoiSigninSaga } from './CyberBugsSaga/UserCyberBugsSaga';
import { theoDoiDeleteUser, theoDoiGetUser, theoDoiSignupUser, theoDoiUpdateUser } from './ExercisesUserSaga/UserSaga';

export function* RootSaga() {
    yield all([
        theoDoiSigninSaga(),
        theoDoiGetListProjectSaga(),
        theoDoiDeleteProjectSaga(),
        theoDoiGetAllProjectCategorySaga(),
        theoDoiUpdateProjectSaga(),
        theoDoiGetAllTaskTypeSaga(),
        theoDoiGetAllPrioritySaga(),
        theoDoiGetAllStatusSaga(),
        theoDoiCreateTaskSaga(),
        theoDoiGetUserSaga(),
        theoDoiCreateProjectSaga(),
        theoDoiGetProjectDetailSaga(),
        theoDoiGetTaskDetailSaga(),
        thoiDoiHandleChangePostApi(),
        theoDoiDeleteUserProject(),
        theoDoiGetUserByPorjectId(),
        theoDoiAddUserprojectSaga(),
        theoDoiUpdateTaskSaga(),


        theoDoiUpdateComment(),
        theoDoiPostComment(),
        theDoiDeleteCommentSaga(),
        theoDoiSignupUser(),
        theoDoiGetUser(),
        theoDoiDeleteUser(),
        theoDoiUpdateUser(),
    ])
}