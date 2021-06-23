import React from "react";

import "./header.style.scss";

export default () => {
    return (
        <div className="header">
            <img src="https://icons-for-free.com/iconfiles/png/512/linked+in+linkedin+logo+social+square+icon-1320086773461479453.png"/>
            <div className="content">
                <div className="item active">
                    <p>Dashboard</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Schedule</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Projects</p>
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