/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Space, Tag, Avatar, Popover, AutoComplete } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';
import { DELETE_PROJECT_SAGA, DELETE_USER_PROJECT_SAGA, EDIT_PROJECT, GET_LIST_PROJECT_SAGA, OPEN_FROM_EDIT_PROJECT } from '../../Redux/Constants/ProjectContants';
import { ADD_USER_PROJECT_SAGA, GET_USER_SAGA } from '../../Redux/Constants/UserContants';
import FormEditProject from '../../Component/CyberBugs/Forms/FormEditProject'

export default function Projectmanagement() {
    const dispatch = useDispatch();

    const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList);
    const { userSreach } = useSelector(state => state.UserCyberBugs);

    const [value, setValue] = useState('');

    const searchRef = useRef(null);

    useEffect(() => {
        dispatch({
            type: GET_LIST_PROJECT_SAGA
        })
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item1.id - item2.id;
            }
        },
        {
            title: 'ProjectName',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter: (item1, item2) => {
                let projectName1 = item1.projectName.trim().toLowerCase;
                let projectName2 = item2.projectName.trim().toLowerCase;
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1
            },
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
            }


        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item1, item2) => {
                let categoryName1 = item1.projectName.trim().toLowerCase;
                let categoryName2 = item2.projectName.trim().toLowerCase;
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1
            },


        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => (
                <Tag color="green">{record.creator?.name}</Tag>
            ),
            sorter: (item1, item2) => {
                let creator1 = item1.creator.name.trim().toLowerCase;
                let creator2 = item2.creator.name.trim().toLowerCase;
                if (creator2 < creator1) {
                    return -1;
                }
                return 1
            },
        },
        {
            title: 'Members',
            dataIndex: 'members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((members, index) => {
                        return (
                            <Popover key={index} placement='top' title={"Members"} content={() => {
                                return (
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Avatar</th>
                                                <th>Name</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {record.members?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.userId}</td>
                                                        <td><img src={item.avatar} alt="" style={{ borderRadius: "20px" }} /></td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <button className='btn btn-danger' onClick={() => {
                                                                dispatch({
                                                                    type: DELETE_USER_PROJECT_SAGA,
                                                                    userProject: {
                                                                        projectId: record.id,
                                                                        userId: item.userId
                                                                    }
                                                                })
                                                            }}><DeleteOutlined /></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                )
                            }}>
                                <Avatar key={index} src={members.avatar} />
                            </Popover>
                        )
                    })}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

                    <Popover placement='rightTop' title={"Add user"} content={() => {
                        return <AutoComplete
                            options={userSreach?.map((item, index) => {
                                return { value: item.userId.toString(), label: item.name, }
                            })}

                            style={{ width: "100%" }}

                            value={value}

                            onChange={(text) => {
                                setValue(text)
                            }}

                            onSelect={(value, options) => {
                                dispatch({
                                    type: ADD_USER_PROJECT_SAGA,
                                    userProject: {
                                        "projectId": record.id,
                                        "userId": value
                                    }
                                });

                                setValue('')
                            }}
                            onSearch={(value) => {
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current);
                                }
                                searchRef.current = setTimeout(() => {
                                    dispatch({ type: GET_USER_SAGA, keyWord: value })
                                }, 700)
                            }} ></AutoComplete>
                    }} trigger="click">
                        <Button style={{ borderRadius: "50%", width: 40, height: 40 }}>+</Button>
                    </Popover>
                </div>
            },

        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size={'middle'}>
                    <button className='btn btn-danger' onClick={() => {
                        const action = {
                            type: OPEN_FROM_EDIT_PROJECT,
                            title: "Edit Project",
                            Component: <FormEditProject />,
                        };
                        dispatch(action);
                        const actionEditProject = {
                            type: EDIT_PROJECT,
                            projectEditModel: record,
                        }
                        dispatch(actionEditProject);
                    }} >
                        <EditOutlined />
                    </button>
                    <Popconfirm title="Are you to delete this project?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_PROJECT_SAGA,
                                idProject: record.id
                            })
                        }}
                        okText="yes"
                        cancelText="No" >
                        <button className='btn btn-primary' >
                            <DeleteOutlined />
                        </button>
                    </Popconfirm>
                </Space>
            )
        }

    ];
    return (
        <div className='container'>
            <h3>Project Managenment</h3>
            <Space style={{ marginBottom: 16 }}>
                <Button >Sort age</Button>
                <Button >Clear filters</Button>
                <Button >Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} dataSource={projectList} rowKey={'id'} />;
        </div>
    )
}
