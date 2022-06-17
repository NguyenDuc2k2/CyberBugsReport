import { DISPLAY_LOADING, HIDE_LOADING } from "../Constants/CyberBugs";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    isLoading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {

        case DISPLAY_LOADING: {
            state.isLoading = true;
            return { ...state }
        }
        case HIDE_LOADING: {
            state.isLoading = false;
            return { ...state }
        }
        default:
            return { ...state }
    }
}
