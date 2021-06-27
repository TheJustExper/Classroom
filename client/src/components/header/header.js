import React from "react";

import "./header.style.scss";

export default () => {
    return (
        <div className="header">
            <h1>Website</h1>
            <div className="content">
                <div className="item active">
                    <p>Dashboard</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Help</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Components</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Strategies</p>
                    <div className="line"></div>
                </div>
            </div>
        </div>
    )
}