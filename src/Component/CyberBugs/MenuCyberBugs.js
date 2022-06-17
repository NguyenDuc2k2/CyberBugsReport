import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function MenuCyberBugs() {

    const { avatar, name } = useSelector(state => state.UserCyberBugs.userLogin);
    
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={avatar} alt="" />
                </div>
                <div className="account-info">
                    <p>{name}</p>
                    <p>CyberLearn.vn</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-cog" style={{ marginRight: 10 }} />
                    <NavLink to='/projectmanagement' activeStyle={{ color: "blue !important" }} activeClassName='active font-weight-bold' className='text-dark'>Project Managenment</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog" style={{ marginRight: 10 }} />
                    <NavLink to='/createproject' activeClassName='active font-weight-bold' className='text-dark'>Project Settings</NavLink>
                </div>
                <div>
                    <i className="fa fa-user" style={{ marginRight: 10 }}></i>
                    <NavLink to='/usermanagement' activeClassName='active font-weight-bold' className='text-dark'>User Managenment</NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" style={{ marginRight: 10 }} />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" style={{ marginRight: 10 }} />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" style={{ marginRight: 10 }} />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" style={{ marginRight: 10 }} />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" style={{ marginRight: 10 }} />
                    <span>Components</span>
                </div>
            </div>
        </div>

    )
}
