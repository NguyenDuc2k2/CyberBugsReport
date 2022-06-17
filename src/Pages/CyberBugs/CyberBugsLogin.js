import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { connect } from 'react-redux';
import { action_signin_cyberBugs } from '../../Redux/Action/CyberBugsAction';
import { NavLink } from 'react-router-dom';

function CyberBugsLogin(props) {
    const {
        errors,
        handleSubmit,
        handleChange,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container' style={{ backgroundColor: '#111827' }}>
            <div className='d-flex justify-content-center flex-column align-items-center' style={{ height: window.innerHeight }}>
                <h3 className='text-center text-white' >Login Cyber Bugs</h3>
                <p className='fs-6' style={{ color: '#9CA3AF' }}>Hãy Đăng Nhập Tài Khoản Của Bạn</p>
                <div className='mt-4 w-50' style={{ flexDirection: "" }}>
                    <Input onChange={handleChange} name='email' type="email" size='large' placeholder='Email' prefix={<UserOutlined />} />
                    <div className='text-danger mt-1' style={{ height: 15 }}>{errors.email}</div>
                </div>
                <div className='mt-4 w-50' style={{ flexDirection: "" }}>
                    <Input onChange={handleChange} name='password' type="password" size='large' placeholder='Pass Word' prefix={<LockOutlined />} />
                    <div className='text-danger mt-1' style={{ height: 15 }}>{errors.password}</div>
                </div>
                <Button htmlType='submit' size="large" type="primary" className='mt-5 w-50'>Login</Button>
                <div className='d-flex w-50 mt-5' style={{ justifyContent: 'center' }}>
                    <p className='m-0 me-1' style={{ color: '#9CA3AF' }}>Don't have an account yet? </p>
                    <NavLink to='/usersignup' className={'text-primary'} style={{ backgroundColor: "transparent", border: "none" }}>Sign in</NavLink>
                </div>
                <div className='social mt-5 d-flex'>
                    <Button shape="circle" size={"large"} style={{ backgroundColor: "rgb(59,89,152)", color: "white", marginRight: 20 }} > <i className="fa-brands fa-facebook"></i></Button>
                    <Button type="primary" shape="circle" size={"large"}> <i className="fa-brands fa-twitter"></i></Button>
                </div>
            </div>
        </form>
    )
}


const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
    }),

    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required').email("Email is invlaid"),
        password: Yup.string().min(6, "Pass Word must have min 6 charater").max(20, 'Pass word muts have max 20 charater')
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        let { email, password } = values;
        props.dispatch(action_signin_cyberBugs(email, password))
    }
    , displayName: "LoginCyBerBugs"
})(CyberBugsLogin)

export default connect()(LoginCyberBugsWithFormik) 