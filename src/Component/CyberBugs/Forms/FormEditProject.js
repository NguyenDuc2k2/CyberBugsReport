/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-multi-str */
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import {  GET_PORJECT_CATEGORY_SAGA, SET_SUBMIT_EDIT_PROJECT, UPDATE_PROJECT_SAGA } from '../../../Redux/Constants/ProjectContants';

function FormEditProject(props) {

    const dispatch = useDispatch();
    const listProjectCategory = useSelector(state => state.ProjectCategoryReducer.listProjectCategory);

    const submitForm = (e) => {
        e.preventDefault();
        alert("eidt")
    };
    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = props;


    useEffect(() => {
        dispatch({
            type: GET_PORJECT_CATEGORY_SAGA
        })
        dispatch({
            type: SET_SUBMIT_EDIT_PROJECT,
            submitFunction: handleSubmit
        })
    }, []);

    const handleEdiorChange = (content, editor) => {
        setFieldValue('description', content)
    };

    return (
        <form className='container' onSubmit={submitForm}>
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <h6>Project ID</h6>
                        <input value={values?.id} disabled className='form-control' name='id' />
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <h6>Project Name</h6>
                        <input value={values?.projectName} className='form-control' name='projectName' onChange={handleChange} />
                    </div>

                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <h6>Project Category</h6>
                        <select name='categoryId' value={values?.categoryId} className='form-control' onChange={handleChange}>
                            {listProjectCategory?.map((item, index) => {
                                return <option value={item.id} key={index} >
                                    {item.projectCategoryName}
                                </option>
                            })}
                        </select>
                    </div>

                </div>
                <div className='col-12 mt-5'>
                    <div className='form-group'>
                        <Editor
                            name="description"
                            initialValue={values?.description}
                            value={values?.description}
                            init={{
                                selector: 'textarea#myTextArea',
                                height: 500,
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
                </div>
            </div>
        </form >
    )

}


const EditProject = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props;
        return {
            id: projectEdit.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId

        }
    },

    handleSubmit: (values, { props, setSubmitting }) => {
        const action = {
            type: UPDATE_PROJECT_SAGA,
            projectUpdate: values
        }
        props.dispatch(action)
    },

    displayName: 'CreateProjectFormik',
})(FormEditProject);

const mapStateToProp = (state) => {
    return {
        projectEdit: state.ProjectReducer.projectEdit
    }
}

export default connect(mapStateToProp)(EditProject)



