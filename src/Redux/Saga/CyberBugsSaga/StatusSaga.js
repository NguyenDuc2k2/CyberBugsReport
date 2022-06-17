import { call, put, takeLatest } from "redux-saga/effects"
import { taskServices } from "../../../Services/TaskServices";
import { STATUS_CODE } from "../../../Util/Contants/SettingSystem";
import { notifiFucction } from "../../../Util/Notification/Notification";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../../Constants/CyberBugs";

function* getAllStatusSaga(action) {
    try {

        const { data, status } = yield call(() => taskServices.getAllStatus());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_STATUS,
                arrStatus: data.content
            })
        }
    } catch (error) {
        notifiFucction("error",'Fail!');
    }

}

export function* theoDoiGetAllStatusSaga() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga)
}