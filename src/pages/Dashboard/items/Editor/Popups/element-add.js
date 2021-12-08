import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";

import Popup from "../../../../../popups/Popup";

import "./element-add.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);

    return (
        <Popup class="fixed">
            <div className="content classroom-content">
                <div className="text">
                    <p>Expers website</p>
                    <h1>Add Content</h1>
                </div>

                <div className="classroom-content__widgets">
                    
                    <div className="classroom-content__widget">
                        <i class="fas fa-book"></i>
                        <p>Assignment</p>
                    </div>

                </div>
            </div>

            <div className="bottom">
                <button className="button small clear" onClick={() => props.setPopup(null)}>Cancel</button>
            </div>
        </Popup>
    )
}