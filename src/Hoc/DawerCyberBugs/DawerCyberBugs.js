import React from 'react';
import { Drawer, Button, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_DRAWER } from '../../Redux/Constants/CyberBugs';

export default function DawerCyberBugs() {
    const { visible, ComponentsContentDrawer, callBackSubmit, title } = useSelector(state => state.DrawerReducer);
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch({
            type: CLOSE_DRAWER,
        })
    };

    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => {
                            callBackSubmit();
                        }} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {ComponentsContentDrawer}
            </Drawer>
        </>
    )
}
