/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { AutoComplete, Popconfirm, Space, Table } from 'antd';
import { delete_user, get_arr_user_saga, open_form_edit_user } from '../../Redux/Action/ExercisesUserAction/UserAction';
import FromEidtUser from '../../Component/CyberBugs/ExercieseFromEdit/FromEidtUser';

export default function UserManagement() {

    const dispatch = useDispatch();

    const { name, avatar } = useSelector(state => state.UserCyberBugs.userLogin);
    const { arrUser } = useSelector(state => state.UserReducer);
    const [keyWordSearch, setKeyWordSearch] = useState('')
    const searchRef = useRef(null);


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        dispatch(get_arr_user_saga(''))
    }, []);


    const columns = [
        {
            title: "STT",
            dataIndex: 'userId',
            key: 'userId',
            sorter: (item2, item1) => {
                return item1.userId - item2.userId;
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            key: 'email',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: "phoneNumber",
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: "Action",
            key: "action",
            render: (text, record, index) => {
                return (
                    <Space size={'middle'}>
                        <button className='btn btn-primary' onClick={() => {
                            dispatch({
                                type: "USER_EDIT",
                                userEdit: record
                            })
                            dispatch(open_form_edit_user(<FromEidtUser dataUser={record} />, 'Edit User'))
                        }}><EditOutlined /></button>
                        <Popconfirm title="Are you do delete this uers?"
                            onConfirm={() => {
                                dispatch(delete_user(record.userId));
                            }}
                            okText="yes"
                            cancelText="no">
                            <button className='btn btn-danger'><DeleteOutlined /></button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    return (
        <div className='container-fluid p-2'>
            <div className='text-end mt-3 me-5 d-flex justify-content-end align-items-center'>
                <h3 className='m-0'>Hello! {name} </h3>
                <span className='ms-1 me-1' style={{ width: 30, height: 30, display: "inline-block", border: "1px solid black", borderRadius: "50%" }}>
                    <img src={avatar} alt="" style={{width:"100%",height:'100%',borderRadius:'50%'}} />
                </span>
            </div>
            <hr style={{ height: 2 }} />
            <div>
                <h3>Create User</h3>
                <form onSubmit={handleSubmit} >
                    <AutoComplete
                        name='keyword'
                        onSearch={(value) => {
                            setKeyWordSearch(value)
                            if (searchRef.current) {
                                clearTimeout(searchRef.current);
                            }
                            searchRef.current = setTimeout(() => {
                                dispatch(get_arr_user_saga(value));
                            }, 700)
                        }}
                        placeholder='Search' type='text' style={{ width: '90%' }} />
                    <button className='btn btn-success ' style={{ height: 33, marginLeft: 10 }} onClick={() => {
                        dispatch(get_arr_user_saga(keyWordSearch));
                    }}>Search</button>
                </form>
            </div>
            <div className='mt-3'>
                <Table style={{ border: '1px solid black' }} columns={columns} dataSource={arrUser} rowKey={'userId'} />
            </div>
        </div>
    )
}