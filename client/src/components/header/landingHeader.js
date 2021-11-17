import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { signInWithGoogle, auth } from "../../firebase";

import { Link } from "react-router-dom";

import "./landingHeader.style.scss";

export default () => {
    const { user } = useContext(UserContext);
    const history = useHistory();

    return (
        <div className="landingHeader">
            <div className="content">
                <div className="content-left">
                   <h1>studentroom</h1>
                </div>
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/information">Information</Link>
                    { user ? <Link to="/dashboard">Dashboard</Link> : "" }
                </div>
                { user ? <button onClick={() => auth.signOut()}>Logout</button> : <button onClick={() => history.push("/login")}>Login</button> }
            </div>
        </div>
    )
}