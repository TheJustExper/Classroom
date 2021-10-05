import React from "react";

import Button from "../../components/button/button";
import LandingHeader from "../../components/header/landingHeader";

import "./LandingPage.style.scss";

export default () => {
    return (
        <div className="landing">
            <div className="bg-home"></div>
            <LandingHeader/>
            <div className="landing-head">
                <h1>Keep track of everything you do ensuring you don't miss any deadlines</h1>
                <p className="subtitle">Are you the one to forget deadlines, not keep track of work or simply not know where to start? Here at __________ we keep track of all of this just for u.</p>
                <div className="landing-buttons">
                    <button>Send me updates</button>
                    <button className="clear">Live Demo</button>
                </div>
            </div>
            <div className="landing-section">
                
                
            </div>
        </div>
    )
}