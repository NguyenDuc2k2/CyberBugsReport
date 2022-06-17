import { DELETE_USER_SAGA, GET_ARR_USER, GET_ARR_USER_SAGA, OPEN_FORM_EDIT_USER, SET_SUBMIT_EDIT_USER, UPDATE_USER_SAGA } from "../../Constants/ExercisesUserContans/ExercisesUserContants";

export const get_arr_user = (arrUser) => ({
    type: GET_ARR_USER,
    arrUser
});

/**======================sag============================ */
export const get_arr_user_saga = (keyWord) => ({
    type: GET_ARR_USER_SAGA,
    keyWord,
});


export const delete_user = (idUser) => ({
    type: DELETE_USER_SAGA,
    idUser
});


export const open_form_edit_user = (ComponentsContentDrawer, title) => ({
    type: OPEN_FORM_EDIT_USER,
    ComponentsContentDrawer,
    title
});

export const set_submit_edit_user = (submitFunction) => ({
    type: SET_SUBMIT_EDIT_USER,
    submitFunction

});

export const update_user_saga = (userUpdate) => ({
    type: UPDATE_USER_SAGA,
    userUpdate
});



