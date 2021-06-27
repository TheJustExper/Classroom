import React, { useReducer, useState } from "react";

import Popup from "./Popup";

import Input from "../components/input/input";

import "./CreateProject.style.scss";

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

    const addProject = () => {
        props.addToProjects(inputValues, tech);
        props.setPopup(null)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          setTech([ ...tech, event.target.value ]);
          setInputValues({ technologies: tech });

          event.target.value = "";
        }
    }

    const removeTechnology = (event) => {
        const n = event.target.parentNode.name;
        const t = tech.filter(name => name == n);

        setTech([ ...t ]);
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
                <div className="input-outer">
                    <label for="description<">Technologies</label>
                    <input name="technology" placeholder="Add a technology" onKeyDown={handleKeyDown}/>
                    <div className="technologies">
                        { tech.length != 0 ? tech.map(tech => <div className="tech" name={tech}>{ tech } <span onClick={removeTechnology}>x</span></div> ) : "" }
                    </div>
                </div>
            </div>
            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small" onClick={() => addProject()}>Create Project</button>
            </div>
        </Popup>
    )
}