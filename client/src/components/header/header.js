import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../providers/UserProvider";
import UserDropdown from "../userDropdown/UserDropdown";
import { signInWithGoogle, auth } from "../../firebase";

import "./header.style.scss";

function Notifications() {
    const [ notifications, setNotifications ] = useState([]);
    const [ openMenu, setOpenMenu ] = useState(false);

    const openNotificationMenu = () => {
        setOpenMenu(!openMenu);
    }

    useEffect(() => {
        setTimeout(() => {
            setNotifications([{
                id: 1
            }])
        }, 1000);
    }, []);

    return (
        <div className="notification-outer">
            <div onClick={() => openNotificationMenu()} className={ "notification " + (notifications.length > 0 ? "unread animate__animated animate__headShake" : "" )}>
                <i class="fas fa-bell"></i>
            </div>

            { openMenu ? 
                <ul className="notification-menu">
                    <li class="site-nav-user-item">Notifcation...</li>
                </ul>
            : "" }
        </div>
    )
}

export default () => {
    const user = useContext(UserContext);

    return (
        <div className="header">
            <div className="content-left">
                <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png"/>
                <h1>exper.style.scss</h1>
            </div>
            
            <div className="content-right">
                <Notifications/>
                { user ? <UserDropdown user={user}/> : ""  }
            </div>
        </div>
    )
}