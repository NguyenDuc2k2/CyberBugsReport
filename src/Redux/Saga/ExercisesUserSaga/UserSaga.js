import { call, put, select, takeLatest } from "redux-saga/effects"
import { exercisesUser } from "../../../Services/ExercisesUserService/UserServices"
import { STATUS_CODE } from "../../../Util/Contants/SettingSystem";
import { notifiFucction } from "../../../Util/Notification/Notification";
import { get_arr_user, get_arr_user_saga } from "../../Action/ExercisesUserAction/UserAction";
import { CLOSE_DRAWER } from "../../Constants/CyberBugs";
import { DELETE_USER_SAGA, GET_ARR_USER_SAGA, UPDATE_USER_SAGA, USER_SIGNUP_SAGA } from "../../Constants/ExercisesUserContans/ExercisesUserContants";

function* signupUser(action) {
    try {
        const { status } = yield call(() => exercisesUser.signupUser(action.newUser));

        if (status === STATUS_CODE.SUCCESS) {

            let history = yield select(state => state.HistoryReducer.history);

            history.push("/login");

            notifiFucction('success', "Successful account registration");
        }

    } catch (error) {
        notifiFucction('error', error.response.data.message);
    }
}

export function* theoDoiSignupUser() {
    yield takeLatest(USER_SIGNUP_SAGA, signupUser)
}



function* getUserSaga(action) {
    try {
        const { data, status } = yield call(() => exercisesUser.getUser(action.keyWord));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(get_arr_user(data.content));
        }
    } catch (error) {
        notifiFucction("error",'Fail!');
    }
}


export function* theoDoiGetUser() {
    yield takeLatest(GET_ARR_USER_SAGA, getUserSaga)
}


function* deleteUserSaga(action) {
    try {
        const { status } = yield call(() => exercisesUser.deleteUser(action.idUser))
        if (status === STATUS_CODE.SUCCESS) {
            yield put(get_arr_user_saga(''));
            notifiFucction('success', 'Delete User Success!');
        }
    } catch (error) {
        notifiFucction('error', "Delete User fail!")
    }
}

export function* theoDoiDeleteUser() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}

function* updateUserSaga(action) {
    try {
        const { status } = yield call(() => exercisesUser.updateUser(action.userUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            notifiFucction('success', 'Update User Success!');
            yield put({
                type: CLOSE_DRAWER,
            })
            yield put(get_arr_user_saga(''))
        }
    } catch (error) {
        notifiFucction('error', 'Update User fail!');
    }
}

export function* theoDoiUpdateUser() {
    yield takeLatest(UPDATE_USER_SAGA, updateUserSaga)
}