import { GET_ALL_STATUS } from "../Constants/CyberBugs"


const initialState = {
    arrStatus: []
}

export const StatusReudcer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_STATUS:{
            return{...state,arrStatus:action.arrStatus}
        }
        default:
            return { ...state }
    }
}
