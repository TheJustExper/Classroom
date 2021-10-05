import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../providers/UserProvider";
import UserDropdown from "../userDropdown/UserDropdown";
import { signInWithGoogle, auth } from "../../firebase";

import "./header.style.scss";

function Notifications() {
    const [ notifications, setNotifications ] = useState([{
        title: "Physics Homework",
        description: "Due in on the 5th"
    }]);

    const [ openMenu, setOpenMenu ] = useState(false);

    const openNotificationMenu = () => {
        setOpenMenu(!openMenu);
    }

    useEffect(() => {
        
    }, []);

    return (
        <div className="notification-outer">
            <div onClick={() => openNotificationMenu()} className={ "notification " + (notifications.length > 0 ? "animate__animated animate__headShake" : "" )}>
                <i class="fas fa-bell"></i>
            </div>

            { openMenu ? 
                <ul className="notification-menu">
                    { notifications.length > 0 ? notifications.map(({ title, description }) => <li class="site-nav-user-item"><b>{ title }</b> - { description }</li>) : "" }
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
                <h1>exper.style.scss</h1>
            </div>
            
            <div className="content-right">
                
            </div>
        </div>
    )
}