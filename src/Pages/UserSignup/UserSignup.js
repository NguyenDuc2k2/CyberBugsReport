import { Button, Input } from 'antd';
import React from 'react';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { userSignup } from '../../Redux/Action/ExercisesUserAction/UserSignupAction';
import { NavLink } from 'react-router-dom';

const height = "15px";

function UserSignup(props) {


    const {
        errors,
        handleSubmit,
        handleChange,
    } = props;


    return (
        <form onSubmit={handleSubmit} className='container px-5' style={{ backgroundColor: '#111827' }}>
            <div className='d-flex justify-content-center flex-column align-items-center mx-5   ' style={{ height: window.innerHeight }}>
                <h3 className='text-center text-white'>Create an Account!</h3>
                <div className='mt-3 w-100'>
                    <Input onChange={handleChange} name='phoneNumber' type='tel' size='large' placeholder='Phone Number' prefix={<PhoneOutlined />} />
                    <div className='text-danger' style={{ height: height }}>{errors?.phoneNumber}</div>
                </div>
                <div className='mt-3 w-100'>
                    <Input onChange={handleChange} name='name' type='text' size='large' placeholder='Name' prefix={<UserOutlined />} />
                    <div className='text-danger' style={{ height: height }}>{errors.name}</div>
                </div>
                <div className='mt-3 w-100'>
                    <Input onChange={handleChange} name='email' type='eamil' size='large' placeholder='Email' prefix={<MailOutlined />} />
                    <div className='text-danger' style={{ height: height }}>{errors.email}</div>
                </div>

                <div className='d-flex mt-3 w-100'>
                    <div className='w-50 me-2'>
                        <Input onChange={handleChange} name='password' type='password' size='large' placeholder='Pass Word' prefix={<LockOutlined />} />
                        <div className='text-danger' style={{ height: height }}>{errors?.password}</div>
                    </div>
                    <div className='w-50 ms-2'>
                        <Input onChange={handleChange} name='confirmPassword' type='password' size='large' placeholder='Confirm Password' prefix={<LockOutlined />} />
                        <div className='text-danger' style={{ height: height }}>{errors?.confirmPassword}</div>
                    </div>
                </div>
                <Button className='mt-4 w-100' htmlType='submit' size='large' type='primary' >Register</Button>
                <div className='w-50 mt-3 d-flex justify-content-center text-end'>
                    <p className='me-1 fs-6' style={{ color: '#9CA3AF' }}>Already have an account?</p>
                    <NavLink to='/login'><button className='btn text-primary p-0 fs-6'>Login</button></NavLink>
                </div>
                <div className='social mt-5 d-flex'>
                    <Button shape="circle" size={"large"} style={{ backgroundColor: "rgb(59,89,152)", color: "white", marginRight: 20 }} > <i className="fa-brands fa-facebook"></i></Button>
                    <Button type="primary" shape="circle" size={"large"}> <i className="fa-brands fa-twitter"></i></Button>
                </div>
            </div>
        </form>
    )
}


const userSignupWithFromik = withFormik({
    mapPropsToValues: () => ({
        email: "",
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        name: "",
    }),

    validationSchema: Yup.object().shape({

        email: Yup.string().required('Email is required').email("Email is invalid"),

        password: Yup.string().required("Password is required").min(6, 'Pass word must have min 6 character').max(20, 'Pass word must have max 20 character').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Passwors is invalid"),
        
        confirmPassword:Yup.string().required("Confirm Password is required").oneOf([Yup.ref('password')], 'The password is not correct.'),

        phoneNumber: Yup.string().required("Phone number is required").matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, "Phone number is invalid").min(10, 'Phone number must have min 10 number').max(15, "Phone number must have maximul 15 number"),

        name: Yup.string().required('Name is required').matches( /[a-zA-Z]/,'The name must not contain the number').min(5, "Name minium 5 character").max(30, "Name maximul 30 character"),
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        const newUser = {
            email: values.email,
            password: values.password,
            phoneNumber: values.phoneNumber,
            name: values.name
        }
        props.dispatch(userSignup(newUser))
    },

    displayName: "UserSignup",
})(UserSignup);


export default connect()(userSignupWithFromik)