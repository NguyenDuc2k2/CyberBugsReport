import {  DISPATCH_TASK_ID } from "../../Constants/ExercisesCommentContants/CommentContants"

const initialState = {
    taskId: 0,
  }
  
  export const CommentTaskReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case DISPATCH_TASK_ID: {
        return { ...state, taskId: action.taskId }
      }
  
      default:
        return { ...state }
    }
  }
  