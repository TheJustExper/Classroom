import React, { useReducer, useState, useContext, useEffect } from "react";
import { UserContext } from "../../providers/UserProvider";
import { firestore, loginWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";

import LandingHeader from "../../components/header/landingHeader";

import "./Login.style.scss";

export default (props) => {
    const { user, loading } = useContext(UserContext);
    const history = useHistory();
    const { state } = useLocation();
    const [ errorMessage, setErrorMessage ] = useState("");

    const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }), { email: "", password: "" }
    );
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const login = () => {
        const { email, password } = inputValues;

        if (email.length == 0 || password.length == 0) return setErrorMessage("No email or password inputted");

        loginWithEmailAndPassword(email, password).catch(({ message }) => setErrorMessage(message));
    }

    useEffect(() => {
        if (user) history.push(state?.from || "/dashboard");
    }, [ user ])

    return (
        <div className="page-login">
            <LandingHeader/>
            <div className="page-login__container page-login__right">
                <div className="page-login__account">
                    <div className="page-login__account_text">
                        <h2>Login to your account</h2>
                        <p>There are several ways to login to your account</p>
                    </div>

                    <div className="page-login__account_buttons">
                        <div className="page-login__account_social" onClick={() => signInWithGoogle()}><i className="fab fa-google"></i> Login with Google</div>
                        {/* <div className="page-login__account_social" onClick={() => signInWithGoogle()}><i className="fab fa-github"></i> Sign up with GitHub</div> */}
                    </div>

                    <div className="page-login__account_orEmail">
                        <div className="page-login__account_lines">
                            <div className="page-login__account_line"></div>
                            <p>Or sign in with your Email</p>
                            <div className="page-login__account_line"></div>
                        </div>

                        <div className="input-outer">
                            <label for="email">Email</label>
                            <input name="email" placeholder="email" onChange={handleOnChange} type="email" />
                        </div>

                        <div className="input-outer">
                            <label for="password">Password</label>
                            <input name="password" placeholder="Password" onChange={handleOnChange} type="password"/>
                        </div>

                        <div className="page-login__account_errorMessage">
                            <p>{ errorMessage.length > 0 && errorMessage }</p>
                        </div>

                        <button className="fit" onClick={() => login()}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}