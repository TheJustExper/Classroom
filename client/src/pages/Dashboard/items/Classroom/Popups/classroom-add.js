import React, { useState, useReducer } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";

import Popup from "../../../../../popups/Popup";

import "./classroom-add.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);

    const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { title: '' }
    );

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const create = () => {
        const fire = firestore.collection("classrooms");
        const { title } = inputValues;

        if (title.length == 0) return;
        
        fire.add({

            title: title,
            users: [{
                id: user.uid,
                role: "teacher"
            }],
            usersIds: [user.uid],
            date: Date.now(),

        });

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
                    <input name="title" placeholder="Write a name" onChange={handleOnChange}/>
                </div>

                <div className="input-outer">
                    <label for="description<">Description (optional)</label>
                    <textarea className="description" name="description" rows="5" cols="50" placeholder="Write a description"></textarea>
                </div>
            </div>

            <div className="bottom">
                <button className="button small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="button small" onClick={() => create()}>Create Classroom</button>
            </div>
        </Popup>
    )
}