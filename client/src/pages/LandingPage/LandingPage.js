import React from "react";

import Button from "../../components/button/button";
import LandingHeader from "../../components/header/landingHeader";

import "./LandingPage.style.scss";

export default () => {
    return (
        <div className="landing">
            <LandingHeader/>
            <div className="landing-head">
                <h1>Keep track of everything you do ensuring you don't miss any deadlines</h1>
                <p>Are you the one to forget deadlines, not keep track of work or simply not know where to start? Here at __________ we keep track of all of this just for u.</p>
                <div className="landing-buttons">
                    <Button>Send me updates</Button>
                    <Button>Live Demo</Button>
                </div>
            </div>
            <div className="landing-section">
                <h1>Pricing</h1>
                <div className="landing-features">
                    <div className="landing-feature">
                        <div className="landing-feature-topbar">
                            <div className="icon"></div>
                            <div className="text">
                                <b>Basic</b>
                                <p>$5 / month</p>
                            </div>
                        </div>
                        <div className="landing-feature-features">
                            <p><img src="https://image.flaticon.com/icons/png/512/3388/3388530.png"/>Get started with projects</p>
                            <p><img src="https://image.flaticon.com/icons/png/512/3388/3388530.png"/>Flexible team meetings</p>
                            <p><img src="https://image.flaticon.com/icons/png/512/3388/3388530.png"/>20 GB Cloud storage</p>
                        </div>
                        <button>Choose Plan</button>
                    </div>
                    <div className="landing-feature">
                        <div className="landing-feature-topbar">
                            <div className="icon"></div>
                            <div className="text">
                                <b>Premium</b>
                                <p>$10 / month</p>
                            </div>
                        </div>
                        <div className="landing-feature-features">
                            <p><img src="https://image.flaticon.com/icons/png/512/3388/3388530.png"/>Get started with projects</p>
                            <p><img src="https://image.flaticon.com/icons/png/512/3388/3388530.png"/>Flexible team meetings</p>
                            <p><img src="https://image.flaticon.com/icons/png/512/3388/3388530.png"/>20 GB Cloud storage</p>
                        </div>
                        <button>Choose Plan</button>
                    </div>
                    <div className="landing-feature">
                        <div className="landing-feature-topbar">
                            <div className="icon"></div>
                            <div className="text">
                                <b>Business</b>
                                <p>$ / month</p>
                            </div>
                        </div>
                        <div className="landing-feature-features">
                            <p><img src="https://image.flaticon.com/icons/png/512/3388/3388530.png"/>Get started with projects</p>
                            <p><img src="https://image.flaticon.com/icons/png/512/3388/3388530.png"/>Flexible team meetings</p>
                            <p><img src="https://image.flaticon.com/icons/png/512/3388/3388530.png"/>20 GB Cloud storage</p>
                        </div>
                        <button>Contact Us</button>
                    </div>
                </div>
            </div>
        </div>
    )
}