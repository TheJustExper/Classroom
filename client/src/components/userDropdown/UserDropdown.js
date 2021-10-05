import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

import "./UserDropdown.style.scss";

export default ({ user }) => {
    const history = useHistory();

    const [ hovered, setHovered ] = useState(false);

    return (
        <div className="user-dropdown">
            <div className="user-info">
                <img src={user.photoURL} referrerpolicy="no-referrer"/>
                <span className="user-username">{user.displayName}</span>
            </div>

            { hovered ?
                <ul className="action-menu">
                    <li class="site-nav-user-item"><i class="fas fa-user"></i> Profile</li>
                    <li class="site-nav-user-item"><i class="fas fa-columns"></i> Dashboard</li>
                    <li class="site-nav-user-item" onClick={() => history.push("/account")}><i class="fas fa-cog"></i> Account Settings</li>
                    <li class="site-nav-user-item" onClick={() => auth.signOut()}><i class="fas fa-sign-out-alt"></i> Sign Out</li>
                </ul>
            : "" }
        </div>
    )
}