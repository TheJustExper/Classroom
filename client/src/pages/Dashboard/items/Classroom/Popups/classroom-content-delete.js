import React, { useReducer, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";

import Popup from "../../../../../popups/Popup";


import "./classroom-content-topic.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);
    const { getTopics } = props.refresh;

    const clicked = async () => {
        const fire = firestore.collection("classrooms");
        const base = fire.doc(props.id).collection(props.type);

        console.log(props.id, props.type, props.uid)
        
        await base.doc(props.uid).delete();

        props.setPopup(null);
        props.refresh();
    }

    return (
        <Popup>
            <div className="content">
                <div className="text">
                    <p>Expers website</p>
                    <h1>Are you surf you want to delete?</h1>
                </div>
            </div>
                

            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small delete" onClick={() => clicked()}>Delete</button>
            </div>
        </Popup>
    )
}