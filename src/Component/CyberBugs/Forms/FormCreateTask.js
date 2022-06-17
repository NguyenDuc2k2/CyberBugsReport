/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Editor } from '@tinymce/tinymce-react'
import { Select } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux';
import { CREATE_TASK_SAGA, GET_ALL_TASK_TYPE_SAGA, SET_SUBMIT_CREATE_TASK } from '../../../Redux/Constants/TaskConstants';
import { GET_LIST_PROJECT_SAGA } from '../../../Redux/Constants/ProjectContants';
import { GET_BY_USER_PROJECTID_SAGA, GET_USER_SAGA } from '../../../Redux/Constants/UserContants';
import { GET_ALL_STATUS_SAGA } from '../../../Redux/Constants/CyberBugs';
import { GET_ALL_PRIORITY_SAGA } from '../../../Redux/Constants/PriorityContants';


const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i} >{i.toString(36) + i}</Option>)
}
function FormCreateTask(props) {

    const dispatch = useDispatch();
    const { projectList } = useSelector(state => state.ProjectCyberBugsReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
    const { arrPriority } = useSelector(state => state.PriorityReudcer);
    const { arrUser } = useSelector(state => state.UserCyberBugs);
    const { arrStatus } = useSelector(state => state.StatusReudcer);

    const userOption = arrUser?.map((item, index) => {
        return { value: item.userId, label: item.name }
    });

    const {
        handleSubmit,
        handleChange,
        setFieldValue
    } = props;


    useEffect(() => {
        dispatch({ type: GET_LIST_PROJECT_SAGA, })
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA, });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_USER_SAGA, keyWord: "" });
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: SET_SUBMIT_CREATE_TASK, submitFunction: handleSubmit })
    }, [])

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })

    const handleEdiorChange = (content, editor) => {
        setFieldValue('description', content)
    }


    const renderTimeTracking = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = timeTracking;
        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const precent = Number(timeTrackingRemaining) !== 0 ? Math.round(Number(timeTrackingSpent) / max * 100) : timeTrackingSpent;
        return <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${precent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                </div>
            </div>
        </div>
    }

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='form-group'>
                <p className='mb-0 mt-3'>Project</p>
                <select name='projectId' className="form-control" onChange={(e) => {
                    let { value } = e.target;
                    dispatch({
                        type: GET_BY_USER_PROJECTID_SAGA,
                        idProject: value
                    })
                    setFieldValue('projectId', e.target.value)
                }}>
                    {projectList?.map((item, index) => {
                        return <option key={index} value={item.id}>{item.projectName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <p className='mb-0 mt-3'>Task Name</p>
                <input name='taskName' className="form-control" onChange={handleChange} />
            </div>
            <div className='form-group'>
                <p className='mb-0 mt-3'>Status Id</p>
                <select name='statusId' className="form-control" onChange={handleChange}>
                    {arrStatus?.map((item, index) => {
                        return <option key={index} value={item.statusId}>{item.statusName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p className='mb-0 mt-3'>Priority</p>
                        <select name='priorityId' className='form-control' onChange={handleChange}>
                            {arrPriority?.map((item, index) => {
                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p className='mb-0 mt-3'>Task Type</p>
                        <select name='typeId' className='form-control' onChange={handleChange}>
                            {arrTaskType?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group' mode='multiple'>
                <div className='row'>
                    <div className='col-6'>
                        <p className='mb-0 mt-3'>Assignees</p>
                        <Select
                            mode='multiple'
                            size={'default'}
                            options={userOption}
                            placeholder="Please select"
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values)
                            }}

                            optionFilterProp="lable"
                            style={{ width: "100%" }}>
                            {children}
                        </Select>
                        <div className='row'>
                            <div className='col-12'>
                                <p className='mb-0 mt-3'>Original Estimate</p>
                                <input type='number' name='originalEstimate' min="0" className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='col-6' >
                        <p style={{ marginBottom: 12 }} className='mb-0 mt-3'>Time Tracking</p>
                        {renderTimeTracking()}
                        <div className='row'>
                            <div className='col-6'>{timeTracking.timeTrackingSpent}h Logged</div>
                            <div className='col-6 text-end'>{timeTracking.timeTrackingRemaining}h Remaining</div>
                        </div>
                        <div className='row' >
                            <div className='col-6'>
                                <p className='mb-0' style={{ marginTop: '0.8rem' }}> Time spent (house)</p>
                                <input type='number' min="0" defaultValue={timeTracking.timeTrackingSpent} className='form-control' name='timeTrackingSpent' onChange={
                                    (e) => {
                                        handleChange(e);
                                        setTimeTracking({ ...timeTracking, timeTrackingSpent: e.target.value })
                                    }} />
                            </div>
                            <div className='col-6'>
                                <p className='mb-0' style={{ marginTop: '0.8rem' }}> Time reaning (house)</p>
                                <input type='number' defaultValue={timeTracking.timeTrackingRemaining} min="0" className='form-control' name='timeTrackingRemaining' onChange={
                                    (e) => {
                                        handleChange(e);
                                        setTimeTracking({ ...timeTracking, timeTrackingRemaining: e.target.value })
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <p className='mb-0 mt-3'>Derscription</p>
                <Editor
                    name="description"
                    init={{
                        selector: 'textarea#myTextArea',
                        resize: false,
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \\ alignleft aligncenter alignright alignjustify | \bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={handleEdiorChange}
                />
            </div>
        </form>
    )
}


const FromCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

        const { projectList, arrTaskType, arrPriority, arrStatus } = props;
        return {
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: projectList[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []
        }
    },
    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_TASK_SAGA,
            taskObject: values
        })
    },
    displayName: 'fromCreateTask',
})(FormCreateTask);

const mapStateToProp = (state) => {
    return {
        projectList: state.ProjectCyberBugsReducer.projectList,
        arrTaskType: state.TaskTypeReducer.arrTaskType,
        arrPriority: state.PriorityReudcer.arrPriority,
        arrStatus: state.StatusReudcer.arrStatus,
    }
}


export default connect(mapStateToProp)(FromCreateTask)

