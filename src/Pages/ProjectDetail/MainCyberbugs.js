/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ContentMain from '../../Component/CyberBugs/Main/ContentMain';
import HeaderMain from '../../Component/CyberBugs/Main/HeaderMain'
import InfoMain from '../../Component/CyberBugs/Main/InfoMain';
import { GET_PROJECT_DETAIL_SAGA } from '../../Redux/Constants/ProjectContants';

export default function MainCyberbugs(props) {

    const { projectDetail } = useSelector(state => state.ProjectReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        const { projectId } = props.match.params;

        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId
        })
    }, [])

    return (
        <div className='main'>
            <HeaderMain projectDetail={projectDetail} />
            <InfoMain projectDetail={projectDetail} />
            <ContentMain projectDetail={projectDetail} />
        </div>
    )
}

