import { USER_LOGIN } from "../../Util/Contants/SettingSystem";
import { GET_USER_BY_PROJECTID, GET_USER_SREACH, USER_LOGIN_REDUCER } from "../Constants/UserContants";


let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin: usLogin,
    userSreach: [],
    arrUser: []
}

export const UserCyberBugs = (state = stateDefault, action) => {
    switch (action.type) {
        case USER_LOGIN_REDUCER: {
            state.userLogin = action.userLogin
            return { ...state }
        }

        case GET_USER_SREACH: {
            state.userSreach = action.listUserSreach;
            return { ...state }
        }


        case GET_USER_BY_PROJECTID: {
            return { ...state, arrUser: action.arrUser }
        }
        default: {
            return { ...state }
        }
    }
}