import React, { useReducer, useState, useContext, useEffect } from "react";
import { UserContext } from "../../providers/UserProvider";
import { firestore, registerWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";

import LandingHeader from "../../components/header/landingHeader";

import "./Signup.style.scss";

export default (props) => {
    const { user, loading } = useContext(UserContext);
    const history = useHistory();
    const { state } = useLocation();

    const [ userCount, setUserCount ] = useState(313);
    const [ errorMessage, setErrorMessage ] = useState("");

    const [ inputValues, setInputValues ] = useReducer(
        (state, newState) => ({ ...state, ...newState }), { email: "", password: "" }
    );
      
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const register = () => {
        const { email, password } = inputValues;

        if (email.length == 0 || password.length == 0) return setErrorMessage("No email or password inputted");

        registerWithEmailAndPassword(email, password).catch(({ message }) => setErrorMessage(message));
    }

    useEffect(async () => {
        //registerWithEmailAndPassword("admin3@exper.com", "123123");
        // const userStore = firestore.collection('users');
        // const users = await userStore.get();

        if (user) history.push(state?.from || "/dashboard");
    }, [ user ])

    return (
        <div className="page-login">
            <LandingHeader/>
            <div className="page-login__container page-login__right">
                <div className="page-login__account">
                    <div className="page-login__account_text">
                        <h2>Create your account</h2>
                        <p>Join { userCount } users who started using Studentroom</p>
                    </div>

                    <div className="page-login__account_buttons">
                        <div className="page-login__account_social" onClick={() => signInWithGoogle()}><i className="fab fa-google"></i> Signup with Google</div>
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

                        <button className="fit" onClick={() => register()}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}