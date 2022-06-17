import { GET_lIST_PROJECT } from "../Constants/ProjectContants"

const stateDefault = {
    projectList:[]
}

export const ProjectCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case GET_lIST_PROJECT: {
            state.projectList = action.data
            return { ...state }
        }
        default: {
            return { ...state }
        }
    }
}
