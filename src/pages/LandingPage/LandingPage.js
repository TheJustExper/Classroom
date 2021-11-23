import React from "react";

import Button from "../../components/button/button";
import LandingHeader from "../../components/header/landingHeader";

import "./LandingPage.style.scss";

export default () => {
    return (
        <div className="landing">
            <LandingHeader/>
            <div className="landing-head"></div>
            <div className="landing-section"></div>
        </div>
    )
}