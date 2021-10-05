import React, { useState } from "react";

import Popup from "../../../../../popups/Popup";

import "./user-profile.style.scss";

export default (props) => {
    return (
        <Popup>
            <div className="user-content">
                <div className="user-section">
                    <img src={props.user.photoURL}/>
                    <div className="background"></div>
                </div>
                
                <div className="user-under">
                    <div className="text">
                        <h1>{props.user.displayName}</h1>
                    </div>
                    <div className="roles-outer">
                        <b>ROLES</b>
                        <div className="roles-inner">
                            { props.user.roles.map(role => <span>{ role }</span>) }
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    )
}