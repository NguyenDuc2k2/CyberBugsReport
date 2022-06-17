import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd'

const { Sider, Content } = Layout
export default function TemplatesLogin(props) {

    const [{ width, height }, setSize] = useState({
        width: window.innerWidth, height: window.innerHeight
    })

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    });


    let { Component, ...resRoute } = props;
    return (
        <Route {...resRoute} render={(propsRoute) => {
            return <>
                <Layout>
                    <Sider width={width / 2} height={height} style={{ backgroundRepeat: "no-repeat", backgroundImage: `url(http://picsum.photos/${width}/${height})`, backgroundSize: "cover" }}></Sider>
                    <Content>
                        <Component {...propsRoute} />
                    </Content>
                </Layout>
            </>
        }}>

        </Route>
    )
}
