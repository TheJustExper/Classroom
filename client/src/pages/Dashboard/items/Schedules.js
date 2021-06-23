import React from "react";

import Input from "../../../components/input/input";

export default () => {
    return (
        <div className="dashboard-bar">
            <div className="dashboard-section">
                <h1>Schedules</h1>
                <p>Seach directory of x schedules</p>
                <Input placeholder="Search"/>
            </div>
        </div>
    )
}