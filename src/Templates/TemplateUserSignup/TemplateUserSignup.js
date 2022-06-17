import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

const { Sider, Content } = Layout
export default function TemplateUserSignup(props) {

    const [{ width, height }, setSize] = useState({
        width: window.innerWidth, 
        height: window.innerHeight
    });


    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    },[]);


    let { Component, ...resPram } = props;
    
    return (
        <Route {...resPram} render={(propsRoute) => {
            return <>
                <Layout>
                    <Sider width={width / 2}  height={height} style={{ 
                        backgroundRepeat: 'no-repeat'
                         , backgroundSize: "cover",
                          backgroundImage:`url(http://picsum.photos/${width}/${height})`
                    }}></Sider>
                    <Content>
                        <Component {...propsRoute} />
                    </Content>
                </Layout>
            </>
        }}>

        </Route>
    )
}
