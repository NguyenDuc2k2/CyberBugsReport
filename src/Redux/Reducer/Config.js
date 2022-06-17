import { combineReducers, createStore, applyMiddleware } from 'redux';
import creaMiddleWareSaga from 'redux-saga';
import { RootSaga } from '../Saga/RootSaga';
import { HistoryReducer } from './HistoryReducer';
import { ProjectCyberBugsReducer } from './ProjectListReducer';
import { UserCyberBugs } from './UserReducer';
import { DrawerReducer } from './DawerCyberBugs';
import { ProjectReducer } from './ProjectReducer';
import { ProjectCategoryReducer } from './ProjectCategoryReducer';
import { TaskReducer } from './TaskReducer';
import {StatusReudcer} from './StatusReducer';
import { PriorityReudcer } from './PriorityReducer';
import { TaskTypeReducer } from './TaskTypeReducer';
import {CommentTaskReducer} from './ExercisesCommentReducer/CommentReducer';
import { UserReducer } from './ExercisesUserReducer/UserReducer';
const middleWareSaga = creaMiddleWareSaga();

const rootReducer = combineReducers({
    HistoryReducer,
    ProjectCyberBugsReducer,
    UserCyberBugs,
    DrawerReducer,
    ProjectReducer,
    ProjectCategoryReducer,
    TaskReducer,
    StatusReudcer,
    PriorityReudcer,
    TaskTypeReducer,
    CommentTaskReducer,
    UserReducer,
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));

middleWareSaga.run(RootSaga);

export default store;
