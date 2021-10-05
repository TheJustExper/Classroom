import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";

import Popup from "../../../../../popups/Popup";

import "./classroom-content.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);

    const create = () => {
        props.setPopup(null);
        props.refresh();
    }

    return (
        <Popup class="fixed">
            <div className="content popup-classroom">
                <div className="text">
                    <p>Expers website</p>
                    <h1>Classroom creator</h1>
                </div>

                <div className="input-outer">
                    <label for="title">Name</label>
                    <input name="title" placeholder="Write a name"/>
                </div>

                <div className="input-outer">
                    <label for="description<">Description (optional)</label>
                    <textarea className="description" name="description" rows="5" cols="50" placeholder="Write a description"></textarea>
                </div>
            </div>

            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small" onClick={() => create()}>Create Classroom</button>
            </div>
        </Popup>
    )
}