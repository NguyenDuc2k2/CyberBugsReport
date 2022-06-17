
import { USER_SIGNUP_SAGA } from "../../Constants/ExercisesUserContans/ExercisesUserContants";
/**========================reducer========================= */


/**=================================saga==================== */


export const userSignup = (newUser) => ({
    type: USER_SIGNUP_SAGA,
    newUser
});

