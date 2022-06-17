import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { cyberBugsSevicer } from '../../../Services/CyberBugsServices';
import { projectServies } from '../../../Services/ProjectServies';
import { userServices } from '../../../Services/UserServices';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../Util/Contants/SettingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../Constants/CyberBugs';
import { DELETE_USER_PROJECT_SAGA, GET_LIST_PROJECT_SAGA } from '../../Constants/ProjectContants';
import { notifiFucction } from '../../../Util/Notification/Notification';
import { ADD_USER_PROJECT_SAGA, GET_BY_USER_PROJECTID_SAGA, GET_USER_BY_PROJECTID, GET_USER_SAGA, GET_USER_SREACH, LOGIN_USER_SAGA, USER_LOGIN_REDUCER } from '../../Constants/UserContants';


function* signinSaga(action) {
    yield delay(500);
    yield put({
        type: DISPLAY_LOADING,
    })
    try {
        const { data } = yield cyberBugsSevicer.signinCyberBugs(action.userLogin);
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

        yield put({
            type: USER_LOGIN_REDUCER,
            userLogin: data.content
        });

        let history = yield select(state => state.HistoryReducer.history);

        history.push("/projectmanagement");

    } catch (error) {
        notifiFucction("error", error.response.data.message);
    }

    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiSigninSaga() {
    yield takeLatest(LOGIN_USER_SAGA, signinSaga)
}

function* addUserProjectSaga(action) {

    try {
        const { status } = yield userServices.assidnUserProject(action.userProject);

        if (status === STATUS_CODE.SUCCESS) {

            notifiFucction('success', "Get Porject Success!");

            yield put({
                type: GET_LIST_PROJECT_SAGA,
            });


        }

    } catch (error) {
        notifiFucction("error", 'Fail!');
    }
}

export function* theoDoiAddUserprojectSaga() {
    yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProjectSaga)
}

function* getUserSaga(action) {
    try {
        const { data, status } = yield userServices.getUserSearch(action.keyWord);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_SREACH,
                listUserSreach: data.content
            })
        }
    } catch (error) {
        notifiFucction("error", 'Fail!');
    }
}

export function* theoDoiGetUserSaga() {
    yield takeLatest(GET_USER_SAGA, getUserSaga)
}


function* deleteUserProjectSaga(action) {

    try {
        const { status } = yield call(() => projectServies.deleteUserProject(action.userProject));

        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_LIST_PROJECT_SAGA,
            });

        }
    } catch (error) {
        notifiFucction("error", 'Fail!');
    }
}

export function* theoDoiDeleteUserProject() {
    yield takeLatest(DELETE_USER_PROJECT_SAGA, deleteUserProjectSaga);
}



function* getUserByProjectId(action) {
    const { idProject } = action;

    try {
        const { data, status } = yield call(() => userServices.getUserByProjectId(idProject));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECTID,
                arrUser: data.content,
            })
        }

    } catch (error) {
        if (error.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield ({
                type: GET_USER_BY_PROJECTID,
                arrUser: []
            })
        }
    }
}

export function* theoDoiGetUserByPorjectId() {
    yield takeLatest(GET_BY_USER_PROJECTID_SAGA, getUserByProjectId);
}