/* eslint-disable react-hooks/exhaustive-deps */
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup'
import { set_submit_edit_user, update_user_saga } from '../../../Redux/Action/ExercisesUserAction/UserAction';

function FromEidtUser(props) {

  const dispatch = useDispatch();

  let { errors, handleSubmit, handleChange, values } = props;

  useEffect(() => {
    dispatch(set_submit_edit_user(handleSubmit));
  }, []);

  return (
    <form className='container'>
      <div className='form-group'>
        <div className='row'>
          <div className='col-6 mt-3'>
            <p>Id User</p>
            <input className='form-control' value={values.id} name="id" disabled style={{ width: '100%' }} onChange={handleChange} />
            <div style={{ height: 20 }}></div>
          </div>
          <div className='col-6 mt-3'>
            <p>Name</p>
            <input className='form-control' value={values.name} name="name" type='text' style={{ width: '100%' }} onChange={handleChange} />
            <div className=' text-danger' style={{ height: 20 }}>{errors.name}</div>
          </div>
          <div className='col-6 mt-3'>
            <p>Phone Number</p>
            <input className='form-control' value={values.phoneNumber} name="phoneNumber" type='tel' style={{ width: '100%' }} onChange={handleChange} />
            <div className=' text-danger' style={{ height: 20 }}>{errors.phoneNumber}</div>
          </div>
          <div className='col-6 mt-3'>
            <p>Pass Word</p>
            <input className='form-control' name="passWord" value={values.passWord}  type='passWord' style={{ width: '100%' }} onChange={handleChange} />
            <div className='text-danger' style={{ height: 20 }}>{errors.passWord}</div>
          </div>
          <div className='col-12 mt-3'>
            <p>Email</p>
            <input className='form-control' value={values.email} name="email" type='email' style={{ width: '100%' }} onChange={handleChange} />
            <div className='text-danger' style={{ height: 20 }}>{errors.email}</div>
          </div>
        </div>
      </div>
    </form>
  )
}


const FromEidtUserFormik = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    email: props.dataUser.email,
    passWord: '',
    phoneNumber: props.dataUser.phoneNumber,
    name: props.dataUser.name,
    id: props.dataUser.userId
  }),

  validationSchema: Yup.object().shape({

    email: Yup.string().required('Email is required').email("Email is invalid"),

    phoneNumber: Yup.string().required("Phone number is required").matches(/(?=.*[0-9])/, "The phone number must not contain the characrter").min(10, 'Phone number must have min 10 number').max(15, "Phone number must have maximul 15 number"),

    name: Yup.string().required('Name is required').matches(/(?=.*[a-z A-Z])/, 'The name must not contain the number').min(5, "Name minium 5 character").max(30, "Name maximul 30 character"),

    passWord: Yup.string().required('Pass Word is required').min(6, "Pass Word must have min 6 charater").max(20, 'Pass word muts have max 20 charater')

  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(update_user_saga(values));
  },

  displayName: 'FomrEditUser',
})(FromEidtUser);

export default connect()(FromEidtUserFormik)
