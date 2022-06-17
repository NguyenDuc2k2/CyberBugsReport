import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM_CREATE_TASK, SET_SUBMIT_CREATE_TASK } from "../Constants/CyberBugs"
import { OPEN_FORM_EDIT_USER, SET_SUBMIT_EDIT_USER } from "../Constants/ExercisesUserContans/ExercisesUserContants"
import { OPEN_FROM_EDIT_PROJECT, SET_SUBMIT_EDIT_PROJECT } from "../Constants/ProjectContants"


const initialState = {
    visible: false,
    title: '',
    ComponentsContentDrawer: <p>default content</p>,
    callBackSubmit: (propsValue) => { alert("demo thoi") }
}

export const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER: {
            return { ...state, visible: true }
        }
        case CLOSE_DRAWER: {
            return { ...state, visible: false }
        }
        case OPEN_FROM_EDIT_PROJECT: {
            return { ...state, visible: true, ComponentsContentDrawer: action.Component, title: action.title }
        }

        case SET_SUBMIT_EDIT_PROJECT: {
            state.callBackSubmit = action.submitFunction;
            return { ...state }
        }

        case OPEN_FORM_CREATE_TASK: {
            return { ...state, visible: true, ComponentsContentDrawer: action.ComponentsContentDrawer, title: action.title }
        }

        case SET_SUBMIT_CREATE_TASK: {
            return { ...state, callBackSubmit: action.submitFunction }
        }

        case OPEN_FORM_EDIT_USER: {
            return { ...state, visible: true, ComponentsContentDrawer: action.ComponentsContentDrawer, title: action.title }
        }

        case SET_SUBMIT_EDIT_USER: {
            return { ...state, callBackSubmit: action.submitFunction }
        }
        default:
            { return { ...state } }
    }
}
