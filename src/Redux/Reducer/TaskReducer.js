import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER_ASSIGNESS } from "../Constants/StatusContants";

const initialState = {
    taskDetailModal: {
        'priorityTask': [{
            "priorityId": 1,
            "priority": "Hight"
        },
        {
            "priorityId": 2,
            "priority": "Moon"
        }
        ],

        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [{
            "id": 40,
            "avatar": "https://ui-avatars.com/api/?name=Supper Hoàng",
            "name": "thoa",
            "alias": "tho"
        },
        {
            "id": 40,
            "avatar": "https://ui-avatars.com/api/?name=Supper Hoàng",
            "name": "thoa",
            "alias": "tho"
        }],
        'lstComment': [],
        "taskId": 41,
        "taskName": 'task 1',
        'alias': "task-1",
        "description": "<p>Task 1</p>",
        "statusId": "1",
        "originalEstimate": "0",
        "timeTrackingSpent": "10",
        "timeTrackingRemaining": "10"

    }
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {


        case GET_TASK_DETAIL: {
            return { ...state, taskDetailModal: action.taskDetailModal }
        }

        case CHANGE_TASK_MODAL: {
            const { value, name } = action;
            state.taskDetailModal = { ...state.taskDetailModal };
            state.taskDetailModal[name] = value;
            return { ...state, [name]: value }
        }


        case CHANGE_ASSIGNESS: {

            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelectd]
            return { ...state, }
        }

        case REMOVE_USER_ASSIGNESS: {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)];
            return { ...state }
        }
        default:
            return { ...state }
    }
}
