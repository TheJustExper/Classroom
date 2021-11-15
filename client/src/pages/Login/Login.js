import React, { useReducer, useState, useContext, useEffect } from "react";
import { UserContext } from "../../providers/UserProvider";
import { firestore, loginWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useHistory } from "react-router-dom";

import "./Login.style.scss";

export default (props) => {
    const { user, loading } = useContext(UserContext);
    const history = useHistory();

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

        if (email.length > 0 && password.length > 0) loginWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        if (user) {
            history.push("/dashboard");
        }
    }, [ loading ])

    return (
        <div className="">
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
                <button className="small" onClick={() => signInWithGoogle()}>Google</button>
                <button className="small clear" onClick={() => props.setPopup(null)}>Cancel</button>
                <button className="small" onClick={() => login()}>Login</button>
            </div>
        </div>
    )
}