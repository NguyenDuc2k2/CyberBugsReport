import { call, put, takeLatest } from "redux-saga/effects";
import { taskServices } from "../../../Services/TaskServices";
import { notifiFucction } from "../../../Util/Notification/Notification";
import { GET_ALL_PRIORITY } from "../../Constants/CyberBugs";
import { GET_ALL_PRIORITY_SAGA } from "../../Constants/PriorityContants";


function* getAllPrioritySaga(action) {

    try {
        const { data } = yield call(() => taskServices.getAllPriority());

        yield put({
            type: GET_ALL_PRIORITY,
            arrPriority: data.content
        })
    } catch (error) {
        notifiFucction("error",'Fail!');
    }
}

export function* theoDoiGetAllPrioritySaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}

