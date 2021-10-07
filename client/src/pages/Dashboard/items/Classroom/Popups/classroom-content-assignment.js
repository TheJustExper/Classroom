import React, { useReducer, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";

import Popup from "../../../../../popups/Popup";
import DropDown from "../../../../../components/dropdown/dropdown";

import "./classroom-content-assignment.style.scss";

export default (props) => {
    const { user } = useContext(UserContext);

    const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { title: '', description: '', topic: '' }
    );
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const create = async () => {
        const { title, description } = inputValues;

        if (title.length == 0 || description.length == 0) return;

        const fire = firestore.collection("classrooms");
        const topics = fire.doc(props.id).collection("assignments");

        await topics.add(inputValues);

        props.setPopup(null);
        props.refresh();
    }

    return (
        <Popup class="fixed">
            <div className="content">
                <div className="text">
                    <p>Expers website</p>
                    <h1>Assignment</h1>
                </div>

                <div className="input-outer">
                    <label for="title">Name</label>
                    <input name="title" placeholder="Write a name" onChange={handleOnChange}/>
                </div>

                <div className="input-outer">
                    <label for="description<">Description (optional)</label>
                    <textarea className="description" name="description" rows="5" cols="50" placeholder="Write a description" onChange={handleOnChange}></textarea>
                </div>

                <div className="input-outer">
                    <label for="title">Due Date</label>
                    <DropDown dataset={[]}/>
                </div>

                <div className="input-outer">
                    <label for="title">Topic</label>
                    <DropDown value="topic" dataset={props.topics} inputValues={inputValues} setInputValues={setInputValues}/>
                </div>
            </div>

            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small" onClick={() => create()}>Create</button>
            </div>
        </Popup>
    )
}