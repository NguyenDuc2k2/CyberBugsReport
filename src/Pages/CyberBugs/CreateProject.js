/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-multi-str */
import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import { useDispatch, connect } from 'react-redux';
import { CREATE_PROJECT_SAGA, GET_PORJECT_CATEGORY_SAGA } from '../../Redux/Constants/ProjectContants';

function CreateProject(props) {

    const { listProjectCategory } = props;

    const dispatch = useDispatch()
    const {
        handleChange,
        handleSubmit,
        setFieldValue,
    } = props;

    useEffect(() => {
        dispatch({
            type: GET_PORJECT_CATEGORY_SAGA
        })
    }, []);

    const handleEdiorChange = (content, editor) => {
        setFieldValue('description', content)
    }


    return (

        <div className='container' >
            <h3>Create Project</h3>
            <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-group'>
                    <p>Name</p>
                    <input className='form-control' name='projectName' />
                </div>
                <div className='form-group'>
                    <p className='mb-0 mt-3'>Description</p>
                    <Editor className="from-control" name='description' initialValue=""
                        init={{
                            resize:false,
                            height: 420,
                            menubar: false,
                            plugins: [
                                'addvlist autolink lists image charmap print preview anchor',
                                'searchrepleace visualblock code fullsrceen',
                                'insertdatetime media table paste code wordccount'
                            ],
                            toolbar: ' undo rendo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removefromat | help',
                        }} onEditorChange={handleEdiorChange} />

                </div>
                <div className='form-group mt-4'>
                    <select name='categoryId' className='form-control' onChange={handleChange}>
                        {listProjectCategory?.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button type='submit' className='btn btn-outline-primary mt-5'>Create Project</button>
            </form>
        </div>

    )
}

const CreateProjectFromik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: "",
            description: "",
            categoryId: props.listProjectCategory[0]?.id,
        }
    },

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values,
        })
    },
    displayName: 'CreateProjectFormik',
})(CreateProject);


const mapStateToProp = state => ({
    listProjectCategory: state.ProjectCategoryReducer.listProjectCategory
});

export default connect(mapStateToProp)(CreateProjectFromik);
