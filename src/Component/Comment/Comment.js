import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentSaga, postCommentSaga, updateCommentSaga } from '../../Redux/Action/ExercisesCommentAction/CommentAction';


export default function Comment(props) {

    const { avatar } = useSelector(state => state.UserCyberBugs.userLogin);
    const { lstComment } = useSelector(state => state.TaskReducer.taskDetailModal);
    const { taskId } = useSelector(state => state.CommentTaskReducer);
    const [id, setID] = useState('');

    const dispatch = useDispatch();

    const formikComment = useFormik({
        enableReinitialize: true,
        initialValues: {
            contentComment: '',
            taskId: taskId,
        },
        onSubmit: (values) => {
            dispatch(postCommentSaga(values));
        }
    });

    const formikEditComment = useFormik({
        enableReinitialize: true,
        initialValues: {
            taskId: taskId,
            id: id,
            contentComment: '',
        },
        onSubmit: (values) => {
            dispatch(updateCommentSaga(values));
            setID('')
        }

    });

    const handleChangeComment = (content, name) => {
        const contentComment = ReactHtmlParser(content);

        name.setFieldValue('contentComment', contentComment[0].props.children[0])
    };


    const renderFormComment = (value, name) => {
        return (
            <Editor
                initialValue={value}
                init={{
                    selector: 'textarea#myTextArea',
                    resize:false,
                    height: 150,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \\ alignleft aligncenter alignright alignjustify | \bullist numlist outdent indent | removeformat | help'
                }
                }

                onEditorChange={(content) => {
                    handleChangeComment(content, name)
                }}
            />)
    }



    const renderComment = () => {
        return lstComment?.map((comment, index) => {
            if (comment.id === id) {
                return (
                    <div className='comment-item' key={index}>
                        <div className='display-comment d-flex'>
                            <div className='avatar'>
                                <img src={comment.avatar} alt='' />
                            </div>
                            <form onSubmit={formikEditComment.handleSubmit} style={{width:'85%'}} >
                                {renderFormComment(comment.commentContent, formikEditComment)}
                                <div>
                                    <button className='btn' style={{ color: '#929398' }} >Comment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            return (
                <div className="comment-item" key={index}>
                    <div className="display-comment" style={{ display: 'flex' }}>
                        <div className="avatar">
                            <img src={comment.avatar} alt="" />
                        </div>
                        <div>
                            <p style={{ marginBottom: 5 }}>
                                {comment.name} <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                                {comment.commentContent}
                            </p>
                            <div>
                                <span className='comment' onClick={() => {
                                    setID(comment.id);
                                }}> Edit</span>
                                •
                                <span className='comment' onClick={() => {
                                    dispatch(deleteCommentSaga(comment.id, taskId))
                                }}>Delete</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className="comment">
            <h6>Comment</h6>
            <div className="block-comment mb-4" style={{ display: 'flex' }}>
                <div className="avatar">
                    <img src={avatar} alt="" />
                </div>
                <form onSubmit={formikComment.handleSubmit} className="input-comment w-100">
                    {renderFormComment('', formikComment)}
                    <div>
                        <button className='btn' >Comment</button>
                    </div>
                </form>
            </div>
            <div className="lastest-comment">
                {renderComment()}
            </div>
        </div>
    )
}
