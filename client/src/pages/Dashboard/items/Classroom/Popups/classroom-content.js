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
                        <img src="https://cdn-icons-png.flaticon.com/512/167/167755.png"/>
                        <p>Assignment</p>
                    </div>

                    <div className="classroom-content__widget" onClick={() => props.setPopup(<ContentTopic setPopup={props.setPopup} refresh={getTopics} id={props.id}/>)}>
                        <img src="https://cdn-icons-png.flaticon.com/512/5455/5455650.png"/>
                        <p>Topic</p>
                    </div>
                   
                    <div className="classroom-content__widget">
                        <img src="https://cdn-icons-png.flaticon.com/512/1632/1632670.png"/>
                        <p>Task</p>
                    </div>

                    <div className="classroom-content__widget">
                        <img src="https://cdn-icons-png.flaticon.com/512/2641/2641457.png"/>
                        <p>Quiz</p>
                    </div>

                    <div className="classroom-content__widget">
                        <img src="https://cdn-icons-png.flaticon.com/512/3767/3767084.png"/>
                        <p>Material</p>
                    </div>

                    <div className="classroom-content__widget">
                        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png"/>
                        <p>Award</p>
                    </div>
                </div>
            </div>

            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
            </div>
        </Popup>
    )
}