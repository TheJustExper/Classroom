import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { signInWithGoogle, auth } from "../../firebase";

import { Link } from "react-router-dom";

import "./landingHeader.style.scss";

export default () => {
    const { user } = useContext(UserContext);

    return (
        <div className="landingHeader">
            <div className="content">
                <div className="content-left">
                    <img src="https://assets-global.website-files.com/5fb2b5d778be407a560568d8/5fbfce6ce38b23552b2d06fc_attioLogo_white%26colour.svg"/>
                </div>
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/information">Information</Link>
                    { user ? <Link to="/dashboard">Dashboard</Link> : "" }
                </div>
                { user ? <button onClick={() => auth.signOut()}>Logout</button> : <button onClick={() => signInWithGoogle()}>Login</button> }
            </div>
        </div>
    )
}