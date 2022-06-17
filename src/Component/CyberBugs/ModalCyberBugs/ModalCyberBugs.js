/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { GET_ALL_STATUS_SAGA } from '../../../Redux/Constants/CyberBugs';
import { GET_ALL_PRIORITY_SAGA } from '../../../Redux/Constants/PriorityContants';
import { CHANGE_TASK_MODAL, GET_ALL_TASK_TYPE_SAGA } from '../../../Redux/Constants/TaskConstants';
import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser from 'react-html-parser';
import { useSelector, useDispatch } from "react-redux";
import { HANDLE_CHANGE_POST_API } from '../../../Redux/Constants/CyberBugs'
import { CHANGE_ASSIGNESS, REMOVE_USER_ASSIGNESS } from '../../../Redux/Constants/UserContants';
import Comment from '../../Comment/Comment';

export default function ModalCyberBugs(props) {

    const dispatch = useDispatch();

    const { taskDetailModal } = useSelector(state => state.TaskReducer);

    const { arrStatus } = useSelector(state => state.StatusReudcer)
    const { arrPriority } = useSelector(state => state.PriorityReudcer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { projectDetail } = useSelector(state => state.ProjectReducer);
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState(taskDetailModal?.description);

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA })
    }, []);


    const renderTimeTracking = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);

        const precent = Math.round(Number(timeTrackingSpent) / max * 100)

        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <i className="fa fa-clock" />
                    <div style={{ width: '100%' }}>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: `${precent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                            <p className="estimate-time">{Number(timeTrackingRemaining)}h estimated</p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <input name='timeTrackingSpent' value={timeTrackingSpent} type="number" min={0} className='form-control' onChange={handleChange} />
                    </div>
                    <div className='col-6'>
                        <input name='timeTrackingRemaining' type='number' value={timeTrackingRemaining} min={0} className='form-control' onChange={handleChange} />
                    </div>
                </div>
            </div>
        )
    }

    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModal?.description);
        return (
            <div>
                {
                    visible ? <div onClick={() => {
                        setVisible(!visible)
                    }}>
                        <Editor
                            name="description"
                            initialValue={taskDetailModal.description}
                            
                            init={{
                                selector: 'textarea#myTextArea',
                                resize:false,
                                height: 200,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \\ alignleft aligncenter alignright alignjustify | \bullist numlist outdent indent | removeformat | help'
                            }}
                            onClick={() => {
                                setContent(taskDetailModal.description)
                            }}
                            onEditorChange={(content, editor) => {
                                setContent(content)
                            }}
                        />
                        < button className='btn btn-primary mt-3' onClick={() => {
                            setVisible(!visible);
                        }}> Close</button >
                        <button className='btn btn-primary ms-4 mt-3    ' onClick={() => {
                            setVisible(!visible);

                            dispatch({
                                type: HANDLE_CHANGE_POST_API,
                                actionType: CHANGE_TASK_MODAL,
                                name: "description",
                                value: content

                            })
                        }}>Save</button>
                    </div>
                        : <div onClick={() => {
                            setVisible(!visible)
                        }} style={{ cursor: "pointer" }}>
                            {jsxDescription}</div>
                }
            </div>
        )
    }


    const handleChange = (e) => {
        const { value, name } = e.target;
        dispatch({
            type: HANDLE_CHANGE_POST_API,
            actionType: CHANGE_TASK_MODAL,
            name,
            value
        })
    }



    return (
        <div className="modal fade show" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-modal="true" style={{ display: 'none', paddingLeft: 17 }}>
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <select value={taskDetailModal?.typeId} name="tyepId" onChange={handleChange}>
                                {arrTaskType?.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.taskType}</option>
                                })}
                            </select>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <button type="button" className="close btn" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" style={{ fontSize: 30 }} >×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        {renderDescription()}
                                    </div>
                                    <Comment />
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select form-control" name='statusId' value={taskDetailModal?.value} onChange={(e) => {
                                            handleChange(e)
                                        }}>
                                            {arrStatus.map((status, index) => {
                                                return (
                                                    <option value={status.statusId} key={index}>{status.statusName}</option>)
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className='row' >
                                            <div className='col-12 d-flex row' >
                                                {taskDetailModal?.assigness.map((item, index) => {
                                                    return (
                                                        <div className='col-3' key={index} style={{ display: "flex" }} >
                                                            <div className="avatar" onClick={() => {
                                                                dispatch({
                                                                    type: HANDLE_CHANGE_POST_API,
                                                                    actionType: REMOVE_USER_ASSIGNESS,
                                                                    userId: item.id
                                                                })
                                                            }}>
                                                                <img src={item?.avatar} alt="" />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }} className="col-12 mt-2 mb-2">
                                                <select className='form-control' onChange={(e) => {
                                                    let { value } = e.target;

                                                    if (value == "0") {
                                                        return;
                                                    }
                                                    const userSelect = projectDetail.members.find(mem => mem.userId == value);
                                                    const userSelectd = { ...userSelect, id: userSelect.userId };
                                                    dispatch({
                                                        type: HANDLE_CHANGE_POST_API,
                                                        actionType: CHANGE_ASSIGNESS,
                                                        userSelectd
                                                    })
                                                }}>
                                                    {projectDetail.members?.filter(mem => {
                                                        let index = taskDetailModal.assigness.findIndex(us => us.id === mem.userId);

                                                        if (index !== -1) {
                                                            return false;
                                                        }

                                                        return true
                                                    }).map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.userId}>{item.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select name='priorityId' className='form-control' value={taskDetailModal?.priorityId} onChange={(e) => handleChange(e)}>
                                            {arrPriority.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" className="estimate-hours" disabled value={taskDetailModal?.originalEstimate} onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTimeTracking()}
                                    </div>  
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
