import React, { useState, useEffect } from "react";

import "./schedules.style.scss";

const width = 86.61;

export default (props) => {
    return (
        <div className="dashboard-content-section">
            <div className="content">
                <div className="item active">
                    <p>Day</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Week</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Month</p>
                    <div className="line"></div>
                </div>
                <div className="item">
                    <p>Year</p>
                    <div className="line"></div>
                </div>
            </div>
           <div className="outer">
                <div className="section-schedule">
                    <div className="title"></div>
                    { props.schedules.map((item) => {
                        return (
                            <div className="section-schedule-item">
                                <p>{ item.name }</p>
                            </div>
                        )
                    })}
                </div>
                <div className="schedule">
                    <div className="dates">
                        {
                            new Array(31).fill(0).map((_, index) => {
                                return (
                                    <div className="date">
                                    <b>{index + 1}</b>
                                    <p>Friday</p>
                                </div>
                                )
                            })
                        }
                    </div>
                    { props.schedules.map((item) => {
                        return (
                            <div className="bar">
                                <div className="schedule-bar" style={{ width: (Math.floor(Math.random() * 7) + 1) * width + "px", marginLeft: ((Math.floor(Math.random() * 7) + 1) * width) + 20 + "px" }}>
                                    <b>{ item.name }</b>
                                    <p>REVIEW</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
           </div>
        </div>
    )
}