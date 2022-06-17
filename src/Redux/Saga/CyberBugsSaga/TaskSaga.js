/* eslint-disable default-case */
import { call, put, select, takeLatest } from "redux-saga/effects"
import { taskServices } from "../../../Services/TaskServices"
import { STATUS_CODE } from "../../../Util/Contants/SettingSystem";
import { notifiFucction } from '../../../Util/Notification/Notification'
import { CLOSE_DRAWER, HANDLE_CHANGE_POST_API } from "../../Constants/CyberBugs";
import { GET_PROJECT_DETAIL_SAGA } from "../../Constants/ProjectContants";
import { CHANGE_TASK_MODAL, CREATE_TASK_SAGA, GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from "../../Constants/TaskConstants";
import { CHANGE_ASSIGNESS, REMOVE_USER_ASSIGNESS } from '../../Constants/UserContants'

function* getAllTaskType(action) {
    try {

        const { data, status } = yield call(() => taskServices.getAllTaskType())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_TASK_TYPE,
                arrTaskType: data.content,
            });
        }
    } catch (error) {
        notifiFucction("error", 'Fail!');
    }
}


export function* theoDoiGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskType)
}


function* createTaskSaga(action) {
    try {
        const { status } = yield call(() => taskServices.createTask(action.taskObject));

        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: CLOSE_DRAWER
            })
            notifiFucction('success', "more Success")
        }
    } catch (error) {
        notifiFucction('error', 'Fail!');
    }

}

export function* theoDoiCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}


function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(() => taskServices.getTaskDetail(action.taskId));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content
            })
        }
    } catch (error) {
        notifiFucction('error', "Fail!")
    }

}

export function* theoDoiGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}



export function* handleChangePostApi(action) {

    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const { value, name } = action;
            yield put({
                type: "CHANGE_TASK_MODAL",
                name,
                value
            });
            break;
        }
        case CHANGE_ASSIGNESS: {
            const { userSelectd } = action;
            yield put({
                type: CHANGE_ASSIGNESS,
                userSelectd
            })
            break;
        }

        case REMOVE_USER_ASSIGNESS: {
            const { userId } = action;
            yield put({
                type: REMOVE_USER_ASSIGNESS,
                userId
            })
            break;
        }
    }

    const { taskDetailModal } = yield select(state => state.TaskReducer);

    const listUserAsign = taskDetailModal.assigness?.map((item, index) => {
        return item.id;
    })
    const taskUserAssigness = { ...taskDetailModal, listUserAsign };
    try {
        const { status } = yield call(() => taskServices.updateTask(taskUserAssigness));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskUserAssigness.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUserAssigness.taskId
            })

        }
    } catch (error) {
        notifiFucction("error", 'Fail!');
    }
}

export function* thoiDoiHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API, handleChangePostApi)
}

function* updateTaskStatus(action) {
    const { taskUpdateStatus } = action;
    try {
        const { status } = yield call(() => taskServices.updateStatusTask(taskUpdateStatus));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskUpdateStatus.projectId
            });

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateStatus.taskId
            })
        }
    } catch (error) {
        notifiFucction("error", 'Fail!');
    }
}

export function* theoDoiUpdateTaskSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatus)
}
