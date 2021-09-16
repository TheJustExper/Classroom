import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { signInWithGoogle, auth } from "../../firebase";

import { Link } from "react-router-dom";

import "./landingHeader.style.scss";

export default () => {
    const user = useContext(UserContext);

    return (
        <div className="landingHeader">
            <div className="content">
                <h1>Website</h1>
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