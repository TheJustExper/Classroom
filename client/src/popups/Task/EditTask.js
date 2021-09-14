import React, { useReducer, useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import firebase from 'firebase/app';
import { firestore } from "../../firebase";

import Popup from "../Popup";

import "./EditTask.style.scss";

export default (props) => {

    return (
        <Popup>
            <div className="content">
                <h1>Create a Task</h1>
                <div className="input-outer">
                    <label for="title">Title</label>
                    <input name="title" placeholder="Write a title"/>
                </div>
                <div className="input-outer">
                    <label for="description<">Description</label>
                    <textarea name="description" rows="5" cols="50" placeholder="Write a description" ></textarea>
                </div>
            </div>
            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small" onClick={() => {}}>Create Task</button>
            </div>
        </Popup>
    )
}