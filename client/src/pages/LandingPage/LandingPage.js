import React, { useEffect } from "react";

import LandingHeader from "../../components/header/landingHeader";

import "./LandingPage.style.scss";

export default () => {
    return (
        <div className="landing">
            <LandingHeader/>
            <div className="head">
                <h1>Keep track of everything you do ensuring you don't miss any deadlines</h1>
                <p>Are you the one to forget deadlines, not keep track of work or simply not know where to start? Here at __________ we keep track of all of this just for u.</p>
            </div>
        </div>
    )
}