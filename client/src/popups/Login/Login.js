import React, { useReducer, useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import firebase from 'firebase/app';
import { firestore, loginWithEmailAndPassword } from "../../firebase";

import Popup from "../Popup";

import "./Login.style.scss";

export default (props) => {

    const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { email: "", password: "" }
    );
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const login = () => {
        const { email, password } = inputValues;

        loginWithEmailAndPassword(email, password);
    }

    return (
        <Popup>
            <div className="content">
                <h1>Login</h1>
                <div className="input-outer">
                    <label for="email">Email</label>
                    <input name="email" placeholder="email" onChange={handleOnChange}/>
                </div>
                <div className="input-outer">
                    <label for="password">Password</label>
                    <input name="password" placeholder="Password" onChange={handleOnChange}/>
                </div>
            </div>
            <div className="bottom">
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small" onClick={() => login()}>Login</button>
            </div>
        </Popup>
    )
}