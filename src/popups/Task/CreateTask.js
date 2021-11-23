import React, { useReducer, useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import firebase from 'firebase/app';
import { firestore } from "../../firebase";

import Popup from "../Popup";

import Input from "../../components/input/input";

import "./CreateTask.style.scss";

export default (props) => {

    const { user } = useContext(UserContext);

    const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { title: '', description: '' }
    );

    const [ tech, setTech ] = useState([]);
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
      };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          setTech([ ...tech, event.target.value ]);
          setInputValues({ technologies: tech });

          event.target.value = "";
        }
    }

    const addTask = () => {
        const { title, description } = inputValues;

        if (title.length == 0 && description.length == 0) return;

        const fire = firestore.collection("users").doc(user.uid + "/projects/" + props.link)

        const sections = fire.collection("sections").doc(props.section);
        const tasks = sections.collection("tasks");

        tasks.add({
            title, 
            description,
            date: new Date().toLocaleDateString(),
        });
        
        props.refresh(user.uid);
        props.setPopup(null);
    }

    return (
        <Popup>
            <div className="content">
                <h1>Create a Task</h1>
                <div className="input-outer">
                    <label for="title">Title</label>
                    <input name="title" placeholder="Write a title" onChange={handleOnChange}/>
                </div>
                <div className="input-outer">
                    <label for="description<">Description</label>
                    <textarea name="description" rows="5" cols="50" placeholder="Write a description" onChange={handleOnChange}></textarea>
                </div>
            </div>
            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small" onClick={() => addTask()}>Create Task</button>
            </div>
        </Popup>
    )
}