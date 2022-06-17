import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import FromCreatetask from '../../Component/CyberBugs/Forms/FormCreateTask'

import { MenuUnfoldOutlined, PlusOutlined, } from '@ant-design/icons';
import { OPEN_FORM_CREATE_TASK } from '../../Redux/Constants/TaskConstants';
const { Sider } = Layout;


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export default function SliderCyberBugs() {

    const dispatch = useDispatch();

    const items = [
        getItem(<span className='text-success' onClick={() => {
            dispatch({
                type: OPEN_FORM_CREATE_TASK,
                ComponentsContentDrawer: <FromCreatetask />,
                titel: "Create Task"
            })
        }} > Create issue</span>, 'sub1', <PlusOutlined style={{ fontSize: 25, color: 'green' }} onClick={() => {
            dispatch({
                type: OPEN_FORM_CREATE_TASK,
                ComponentsContentDrawer: <FromCreatetask />,
                titel: "Create Task"
            })
        }} />),
    ];

    const [state, setState] = useState({
        collapse: true,
    })

    const toggle = () => {
        setState({
            collapse: !state.collapse,
        })
    }
    return (
        <div>
            <Sider trigger={null} collapsible collapsed={state.collapse} style={{ height: "100%" }}>
                <div onClick={toggle} style={{ color: "#fff", cursor: "pointer", textAlign: 'right', fontSize: 20 }}><MenuUnfoldOutlined /></div>
                <Menu items={items} style={{ backgroundColor: '#001529', border: 'none' }} />
            </Sider>
        </div>
    )
}
