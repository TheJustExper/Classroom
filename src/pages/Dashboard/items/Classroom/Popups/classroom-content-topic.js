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
        const { title, description } = inputValues;

        if (title.length == 0 || description.length == 0) return;

        const fire = firestore.collection("classrooms");
        const topics = fire.doc(props.id).collection("topics");

        await topics.add({ title, description, date: Date.now() });

        props.setPopup(null);
        props.refresh();
    }

    return (
        <Popup class="fixed">
            <div className="content">
                <div className="text">
                    <p>Expers website</p>
                    <h1>Topic</h1>
                </div>

                <div className="input-outer">
                    <label for="title">Name</label>
                    <input name="title" placeholder="Write a name" onChange={handleOnChange}/>
                </div>

                <div className="input-outer">
                    <label for="description<">Description (optional)</label>
                    <textarea className="description" name="description" rows="5" cols="50" placeholder="Write a description" onChange={handleOnChange}></textarea>
                </div>
            </div>

            <div className="bottom">
                <button className="button small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="button small" onClick={() => create()}>Create</button>
            </div>
        </Popup>
    )
}