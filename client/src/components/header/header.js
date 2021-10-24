import React, { useContext, useState, useEffect } from "react";

import { hasRole, UserContext } from "../../providers/UserProvider";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

import UserDropdown from "../userDropdown/UserDropdown";

import "./header.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);
    const [ selected, setSelected ] = useState(localStorage.getItem('sidebarItem'));

    return (
        <div className="dashboard__header">
            <div className="dashboard__section">
                <div className="row">
                    <i class="fas fa-laptop-code"></i>
                    <h1>studentroom</h1>
                </div>
                <UserDropdown user={user} setToggledTheme={props.setToggledTheme}/>
            </div>

            <div className="dashboard__section">
                <div className="links">
                    <Link onClick={() => { setSelected(1); localStorage.setItem('sidebarItem', 1); }} to="/dashboard/c" className={ selected == 1 ? "links__item links__item--active" : "links__item" }>
                        <div className="item-inner">
                            <p>Classrooms</p>
                        </div>
                    </Link>

                    <Link onClick={() => { setSelected(2); localStorage.setItem('sidebarItem', 2); }} to="/dashboard/projects" className={ selected == 2 ? "links__item links__item--active" : "links__item" }>
                        <div className="item-inner">
                            <p>Projects</p>
                        </div>
                    </Link>

                    { hasRole(user, ["ADMIN"]) && 
                            <>
                                <Link onClick={() => { setSelected(3); localStorage.setItem('sidebarItem', 3); }} to="/dashboard/users" className={ selected == 3 ? "links__item links__item--active" : "links__item" }>
                                    <div className="item-inner">
                                        <p>Users</p>
                                    </div>
                                </Link>
                            </>
                    }   
                    
                    <Link to="#" className="links__item">
                        <div className="item-inner">
                            <p>Notifications</p>
                        </div>
                    </Link>

                    <Link to="#" className="links__item">
                        <div className="item-inner">
                            <p>Settings</p>
                        </div>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}