import { STATUS_CODE } from '../../../Util/Contants/SettingSystem';
import { call, put, select, takeLatest } from "redux-saga/effects";
import { DELETE_PROJECT_SAGA, GET_lIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY, UPDATE_PROJECT_SAGA, GET_PORJECT_CATEGORY_SAGA, CREATE_PROJECT_SAGA, PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA } from '../../Constants/ProjectContants';
import { cyberBugsSevicer } from '../../../Services/CyberBugsServices';
import { projectServies } from '../../../Services/ProjectServies';
import { notifiFucction } from '../../../Util/Notification/Notification';
import { CLOSE_DRAWER } from '../../Constants/CyberBugs'

function* getListProjectSaga(action) {
    try {
        const { data, status } = yield call(() => cyberBugsSevicer.getListProject());

        if (status === STATUS_CODE.SUCCESS) {
            yield put({

                type: GET_lIST_PROJECT,
                data: data.content
            });
        }

    } catch (error) {
        notifiFucction("error", 'Fail!');
    }
}

export function* theoDoiGetListProjectSaga() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga)
}


function* deleteProjectSaga(action) {

    try {
        const { status } = yield call(() => projectServies.deleteProject(action.idProject))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT_SAGA,
            });
            notifiFucction('success', "Delete project is successfly!")
        } else {
            notifiFucction('error', "Delete project is fail!")
        }

    } catch (error) {
        notifiFucction('error', "Delete project is fail!")
    }
}

export function* theoDoiDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}


function* getAllProjectCategory(action) {
    try {
        const { status, data } = yield call(() => cyberBugsSevicer.getAllProjectCategory());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            })
        }
    } catch (error) {
        notifiFucction("error", 'Fail!');
    }
}


export function* theoDoiGetAllProjectCategorySaga() {
    yield takeLatest(GET_PORJECT_CATEGORY_SAGA, getAllProjectCategory)
}


function* updateProjectSaga(action) {
    try {
        const { status } = yield call(() => projectServies.updateProject(action.projectUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            notifiFucction('success', "Update Project Successful!");

            yield put({
                type: GET_LIST_PROJECT_SAGA
            })

            yield put({
                type: CLOSE_DRAWER
            })
        }
    } catch (error) {
        notifiFucction('error', "Update Project fail!");
    }
}

export function* theoDoiUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga)
}


function* createProjectSaga(action) {
    try {
        const { status } = yield call(() => projectServies.createProject(action.newProject));
        if (status === STATUS_CODE.SUCCESS) {
            let history = yield select(state => state.HistoryReducer.history);

            history.push("/projectmanagement")
            notifiFucction('success', "Create Project Successful!");
        }
    } catch (error) {
        notifiFucction('error', "Create Project fail!");
    }
}


export function* theoDoiCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}


function* getPorjectDetailSaga(action) {
    try {
        const { data, status } = yield call(() => projectServies.getProjectDetail(action.projectId));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: PROJECT_DETAIL,
                projectDetail: data.content
            })
        }
    } catch (error) {
        notifiFucction('error', "Get Porject Fail!");
    }
}


export function* theoDoiGetProjectDetailSaga() {

    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getPorjectDetailSaga)
}
