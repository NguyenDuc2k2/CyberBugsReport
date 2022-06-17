import { EDIT_PROJECT, PROJECT_DETAIL } from "../Constants/ProjectContants"

const initialState = {
    projectEdit: {
        "id": '1',
        "projectName": "123123",
        'creator': '12312312',
        'description': '123123123',
        'creategoryId': '2',
    },
    projectDetail:{}
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {

        case EDIT_PROJECT: {        
            state.projectEdit = action.projectEditModel
            return { ...state }
        }

        case PROJECT_DETAIL:{
            state.projectDetail = action.projectDetail
            return {...state}
        }
        default:
            return state
    }
}
