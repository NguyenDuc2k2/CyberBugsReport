import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
import MenuCyberBugs from '../Component/CyberBugs/MenuCyberBugs';
import SliderCyberBugs from '../Component/CyberBugs/SliderCyberBugs';
import ModalCyberBugs from '../Component/CyberBugs/ModalCyberBugs/ModalCyberBugs';


export default function TemplatesCyberBugs(props) {

    const { Component, ...resPram } = props;
    return (
        <Route path={resPram.path} render={(propsRoute) => {
            return <>
                <div className='jira'>
                    <SliderCyberBugs />
                    <MenuCyberBugs />
                    <Component {...propsRoute} />
                    <ModalCyberBugs />
                </div>
            </>
        }}>
        </Route>

    )
}
