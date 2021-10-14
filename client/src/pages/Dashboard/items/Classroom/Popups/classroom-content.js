import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";

import Popup from "../../../../../popups/Popup";

import { ContentTopic, ContentAssignment } from "./index";

import "./classroom-content.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);

    const { getTopics, getAssignments } = props.refresh;

    const create = () => {
        props.setPopup(null);
        props.refresh();
    }

    return (
        <Popup class="fixed">
            <div className="content classroom-content">
                <div className="text">
                    <p>Expers website</p>
                    <h1>Add Content</h1>
                </div>

                <div className="classroom-content__widgets">
                    
                    <div className="classroom-content__widget" onClick={() => props.setPopup(<ContentAssignment setPopup={props.setPopup} topics={props.topics} refresh={getAssignments} id={props.id}/>)}>
                        <i class="fas fa-book"></i>
                        <p>Assignment</p>
                    </div>

                    <div className="classroom-content__widget" onClick={() => props.setPopup(<ContentTopic setPopup={props.setPopup} refresh={getTopics} id={props.id}/>)}>
                        <i class="fas fa-comments"></i>
                        <p>Topic</p>
                    </div>
                   
                </div>
            </div>

            <div className="bottom">
                <button className="button small clear" onClick={() => props.setPopup(null)}>Cancel</button>
            </div>
        </Popup>
    )
}