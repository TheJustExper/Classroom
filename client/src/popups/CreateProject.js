import React, { useReducer } from "react";

import Popup from "./Popup";

import Input from "../components/input/input";

import "./CreateProject.style.scss";

export default (props) => {
    const [inputValues, setInputValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { title: '', description: '' }
      );

      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
      };

    const addProject = () => {
        props.addToProjects(inputValues);
        props.setPopup(null)
    }

    return (
        <Popup>
            <div className="content">
                <h1>Create a Project</h1>
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
                <button className="small" onClick={() => addProject()}>Create Project</button>
            </div>
        </Popup>
    )
}