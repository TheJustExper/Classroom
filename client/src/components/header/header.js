import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { signInWithGoogle, auth } from "../../firebase";

import "./header.style.scss";

export default () => {
    const user = useContext(UserContext);

    return (
        <div className="header" style={ user ? { justifyContent: "space-between" } : { justifyContent: "center" } }>
            <h1 style={ user ? {} : { position: "absolute", left: "20px" }}>Website</h1>
            <div className="content">
                <div className="item active">
                    <p>Dashboard</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Help</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Components</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Strategies</p>
                    <div className="line"></div>
                </div>
            </div>
            { user ? <img onClick={() => auth.signOut()} src={user.photoURL} referrerpolicy="no-referrer"/> : "" }
        </div>
    )
}