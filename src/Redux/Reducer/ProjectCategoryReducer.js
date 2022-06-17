import { GET_ALL_PROJECT_CATEGORY } from "../Constants/ProjectContants";

const stateDefault = {
    listProjectCategory: [],
    arrProject: [],
}

export const ProjectCategoryReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case GET_ALL_PROJECT_CATEGORY: {
            state.listProjectCategory = action.data;
            return { ...state }
        }

        default: {
            return { ...state }
        }
    }
}