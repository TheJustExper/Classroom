import React, { useReducer, useState, useContext } from "react";
import { UserContext } from "../../../../../providers/UserProvider";
import { firestore } from "../../../../../firebase";

import Popup from "../../../../../popups/Popup";

import Input from "../../../../../components/input/input";

import "./CreateProject.style.scss";

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

    const addProject = () => {
        const { title, description } = inputValues;

        const link = title.toLowerCase().split(" ").join("-");
        const fire = firestore.collection("users").doc(user.uid + "/projects/" + link);
        
        fire.set({
            title,
            link,
            description,
            date: new Date().toLocaleDateString(),
            technologies: tech,
        });

        createSection(1, "To do", fire);
        createSection(2, "In progress", fire);
        createSection(3, "Completed", fire);

        props.setPopup(null);
        props.refresh(user.uid);
    }

    const createSection = (order, title, fire) => {
        const sections = fire.collection("sections").doc(title);
        sections.set({ title, order });
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
        <Popup class="fixed">
            <div className="content">
                <div className="text">
                    <p>Expers website</p>
                    <h1>Create a project</h1>
                </div>
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
                <button className="small clear fit" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small fit" onClick={() => addProject()}>Create Project</button>
            </div>
        </Popup>
    )
}