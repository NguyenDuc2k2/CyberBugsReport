import {LOGIN_USER_SAGA} from '../Constants/UserContants'
export const action_signin_cyberBugs = (email, password) => {
    return {
        type: LOGIN_USER_SAGA,
        userLogin: {
            email:email,
            password:password
        }
    }
}