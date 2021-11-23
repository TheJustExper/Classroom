import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

import "./UserDropdown.style.scss";

export default ({ user, setToggledTheme }) => {
    const history = useHistory();
    const [ hovered, setHovered ] = useState(false);

    return (
        <div className="user-dropdown">
            <div className="user-info" onClick={() => setHovered(!hovered)}>
                <img src={user.photoURL} referrerpolicy="no-referrer"/>
                <i class="fas fa-chevron-down"></i>
            </div>

            { hovered ?
                <ul className="action-menu">
                    <li class="site-nav-user-item">Profile</li>
                    <li class="site-nav-user-item">Dashboard</li>
                    <li class="site-nav-user-item" onClick={() => history.push("/account")}>Account Settings</li>
                    <li class="site-nav-user-item" onClick={setToggledTheme}>Toggle Theme</li>
                    <li class="site-nav-user-item action-menu__logout" onClick={() => auth.signOut()}>Logout</li>
                </ul>
            : "" }
        </div>
    )
}