import React, { useReducer, useState, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { firestore } from "../firebase";

import Popup from "./Popup";

import Input from "../components/input/input";

import "./CreateProject.style.scss";

export default (props) => {

    const user = useContext(UserContext);

    const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { title: '' }
    );

    const [ tech, setTech ] = useState([]);
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const createSection = async (order, title, fire) => {
        const sections = fire.collection("sections").doc(title);
        const length = fire.collection("sections").get().then((snapshot) => snapshot.docs.length);  

        if (order == 0) order = length + 1;

        sections.set({ title, order }); 

        console.log("Added");
    }

    const add = () => {
        const { title } = inputValues;

        if (title.length <= 0) return title;

        const fire = firestore.collection("users").doc(user.uid + "/projects/" + props.link)

        createSection(0, title, fire);

        props.refresh(user.uid);
        props.setPopup(null);
    }

    return (
        <Popup>
            <div className="content">
                <h1>Create a Section</h1>
                <div className="input-outer">
                    <label for="title">Title</label>
                    <input name="title" placeholder="Write a title" onChange={handleOnChange}/>
                </div>
            </div>
            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small" onClick={() => add()}>Create Section</button>
            </div>
        </Popup>
    )
}