import React from 'react'
import ReactHtmlPraser from 'react-html-parser'

export default function InfoMain(props) {
    const { projectDetail } = props;

    const renderAvatar = () => {

        return projectDetail.members?.map((item, index) => {
            return (
                <div className='avatar' key={index}>
                    <img src={item.avatar} alt="" />
                </div>
            )
        })
    }

    const jsxDescription = ReactHtmlPraser(projectDetail.description);

    return (
        <>
            <h3>{projectDetail.projectName}</h3>
            <div>
                {jsxDescription}
            </div>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                {renderAvatar()}
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </>

    )
}
