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

                    

                </div>

                <div className="section">
                    <p className="title">Admin</p>

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

                <Link onClick={props.setToggledTheme} to="#" className="item">
                    <div className="item-inner">
                        <i class="fas fa-eye-slash"></i>
                        <p>Toggle Theme</p>
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