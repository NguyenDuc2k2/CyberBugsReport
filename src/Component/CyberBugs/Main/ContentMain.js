import React from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from '../../../Redux/Constants/TaskConstants';
import { DISPATCH_TASK_ID } from '../../../Redux/Constants/ExercisesCommentContants/CommentContants';

export default function ContentMain(props) {
    const dispatch = useDispatch();

    const { projectDetail } = props;

    const handleGragEnd = (reuslt) => {

        let { projectId, taskId } = JSON.parse(reuslt.draggableId);

        const { destination, source } = reuslt;

        if (!destination) {
            return;
        }

        if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }

        dispatch({
            type: UPDATE_STATUS_TASK_SAGA,
            taskUpdateStatus: {
                taskId: taskId,
                statusId: destination.droppableId,
                projectId: projectId
            }
        })
    }

    const renderCardTaskList = () => {
        return (<DragDropContext onDragEnd={handleGragEnd}>
            {projectDetail.lstTask?.map((item, index) => {
                return <Droppable key={index} droppableId={item.statusId}>
                    {(provided) => {
                        return (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="card" style={{ width: '17rem', height: 'auto' }} key={index} >
                                <div className="card-header">{item.statusName}</div>
                                <div className="list-group list-group-flush">
                                    {item.lstTaskDeTail.map((task, index) => {
                                        return (
                                            <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({ projectId: task.projectId, taskId: task.taskId })}>
                                                {(provided) => {
                                                    return <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}

                                                        key={index}
                                                        className="list-group-item" data-bs-toggle="modal" data-bs-target="#infoModal" onClick={() => {
                                                            dispatch({ type: GET_TASK_DETAIL_SAGA, taskId: task.taskId });
                                                            dispatch({ type: DISPATCH_TASK_ID, taskId: task.taskId })
                                                        }}>
                                                        <p>{task.taskName}</p>
                                                        <div className="block" style={{ display: 'flex' }} >
                                                            <div className="block-left">
                                                                <i className="fa fa-bookmark" />
                                                                <i className="fa fa-arrow-up" />
                                                            </div>
                                                            <div className="block-right">
                                                                <div className="avatar-group" style={{ display: 'flex' }}>
                                                                    {task.assigness.map((assign, index) => {
                                                                        return (
                                                                            <div className="avatar" key={index}>
                                                                                <img src={assign.avatar} alt="" />
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }}

                                            </Draggable>
                                        )
                                    })}
                                </div>
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            })}
        </DragDropContext>)
    }
    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}
        </div>

    )
}
