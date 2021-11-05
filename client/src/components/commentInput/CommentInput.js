import React, { useState, useReducer } from "react";

import "./CommentInput.style.scss";

export default ({ photoURL = "", placeholder, icon }) => {
    return (
        <div className="input-with-icon">
            <div className="input-with-icon__inner">
                <img src={photoURL} style={{ marginRight: "5px" }}/>
                <input style={{ width: "100%" }} placeholder={placeholder}/>
            </div>
            
            { icon && <div className="input-with-icon_inner">
                <i class={icon}></i>
            </div>}
        </div>
    )
}