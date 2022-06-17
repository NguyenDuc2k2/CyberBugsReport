import { GET_ARR_USER } from "../../Constants/ExercisesUserContans/ExercisesUserContants"

const initialState = {
    arrUser: [
    ],
    userEdit: {},
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARR_USER: {
            return { ...state, arrUser: action.arrUser }
        }
        
        default:
            return state
    }
}
