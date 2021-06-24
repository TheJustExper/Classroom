import React from "react";

import { Link } from "react-router-dom";

import "./landingHeader.style.scss";

export default () => {
    return (
        <div className="landingHeader">
            <div className="content">
                <h1>Website</h1>
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/dashboard">Privacy Policy</Link>
                    <Link to="/dashboard">Information</Link>
                </div>
                <button>Get Started</button>
            </div>
        </div>
    )
}