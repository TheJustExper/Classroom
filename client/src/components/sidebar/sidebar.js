import React, { useContext, useState } from "react";
import { hasRole, UserContext } from "../../providers/UserProvider";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

import UserDropdown from "../userDropdown/UserDropdown";

import Items from "../../pages/Dashboard/items/items";

import "./sidebar.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);
    const [ selected, setSelected ] = useState(localStorage.getItem('sidebarItem'));

    return (
        <div className="sidebar">

            <div className="section-top">
                <div className="section">
                    <UserDropdown user={user}/>

                    { user.plan == 1 && 
                        <div className="feature-notification">
                            <p>Unlock premium features</p>
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    }

                    <p className="title">General</p>

                    <Link onClick={() => { setSelected(1); localStorage.setItem('sidebarItem', 1); }} to="/dashboard/classrooms" className={ selected == 1 ? "item active" : "item" }>
                        <div className="item-inner">
                            <i class="fas fa-users"></i>
                            <p>Classrooms</p>
                        </div>
                    </Link>

                    <Link onClick={() => { setSelected(2); localStorage.setItem('sidebarItem', 2); }} to="/dashboard/projects" className={ selected == 2 ? "item active" : "item" }>
                        <div className="item-inner">
                            <i class="fas fa-tasks"></i>
                            <p>Projects</p>
                        </div>
                    </Link>

                </div>

                <div className="section">
                    <p className="title">Admin</p>

                    { hasRole(user, ["ADMIN"]) && 
                        <>
                            <Link onClick={() => { setSelected(3); localStorage.setItem('sidebarItem', 3); }} to="/dashboard/users" className={ selected == 3 ? "item active" : "item" }>
                                <div className="item-inner">
                                    <i class="fas fa-users"></i>
                                    <p>Users</p>
                                </div>
                            </Link>

                            <Link onClick={() => { setSelected(4); localStorage.setItem('sidebarItem', 4); }} to="/dashboard/analytics" className={ selected == 4 ? "item active" : "item" }>
                                <div className="item-inner">
                                    <i class="fas fa-chart-pie"></i>
                                    <p>Analytics</p>
                                </div>
                            </Link>

                            <Link onClick={() => { setSelected(5); localStorage.setItem('sidebarItem', 5); }} to="/dashboard/reports" className={ selected == 5 ? "item active" : "item" }>
                                <div className="item-inner">
                                    <i class="fas fa-pager"></i>
                                    <p>Reports</p>
                                </div>
                            </Link>
                        </>
                    }
                </div>
            </div>

            <div className="section section-account">
                <p className="title">Account</p>
                <Link to="#" className="item">
                    <div className="item-inner">
                        <i class="fas fa-bell"></i>
                        <p>Notifications</p>
                    </div>
                </Link>

                <Link to="#" className="item">
                    <div className="item-inner">
                        <i class="fas fa-cog"></i>
                        <p>Settings</p>
                    </div>
                </Link>
                
                <Link onClick={() => auth.signOut()} to="#" className="item">
                    <div className="item-inner">
                        <i class="fas fa-sign-out-alt"></i>
                        <p>Logout</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}