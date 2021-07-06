import React, { useReducer, useState } from "react";

import Popup from "./Popup";

import Input from "../components/input/input";

import "./CreateTask.style.scss";

export default (props) => {

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
                <button className="small">Create Task</button>
            </div>
        </Popup>
    )
}