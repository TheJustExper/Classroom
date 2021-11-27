import React, { useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { ThemeContext } from "../../providers/ThemeProvider";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

import "./UserDropdown.style.scss";

export default () => {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [ hovered, setHovered ] = useState(false);

    return (
        <div className="user-dropdown">
            <div className="user-info" onClick={() => setHovered(!hovered)}>
                <img src={user.photoURL} referrerpolicy="no-referrer"/>
                {/* <p>{ user.displayName }</p> */}
                {/* <i class="fas fa-chevron-down"></i> */}
            </div>

            { hovered ?
                <ul className="action-menu">
                    <div className="action-menu__user">
                        <img src={user.photoURL} referrerpolicy="no-referrer"/>
                        <div className="action-menu__user-text">
                            <b>{ user.displayName }</b>
                            <p>{ user.email }</p>
                        </div>
                    </div>
                    <li class="site-nav-user-item">Dashboard</li>
                    <li class="site-nav-user-item" onClick={() => (history.push("/account"), setHovered(false))}>Account Settings</li>
                    <li class="site-nav-user-item" onClick={toggleTheme}>Toggle Theme</li>
                    <li class="site-nav-user-item action-menu__logout" onClick={() => auth.signOut()}>Logout</li>
                </ul>
            : "" }
        </div>
    )
}