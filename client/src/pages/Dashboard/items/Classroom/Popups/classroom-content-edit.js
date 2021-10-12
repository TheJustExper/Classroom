import React, { useReducer, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";

import Popup from "../../../../../popups/Popup";


import "./classroom-content-topic.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);

    const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { title: '', description: '' }
    );
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const create = async () => {
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
                <button className="button small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="button small delete" onClick={() => create()}>Delete</button>
            </div>
        </Popup>
    )
}