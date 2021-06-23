import React, { useState, useEffect } from "react";

import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";

import Items from "./items/items";

import "./Dashboard.style.scss";

export default () => {
    const [ activeSection, setActiveSection ] = useState(null);
    const [ activeId, setActiveId ] = useState(null);

    const setSection = (id) => {
        setActiveId(id);
        setActiveSection(Items[id].component);
    }

    return (
        <div className="dashboard">
            <Header/>
            <div className="dashboard-content">
            <Sidebar activeSection={activeId} setSection={setSection}/>
                <div className="itemContent">
                    { activeSection != null ? activeSection : "" }
                </div>
            </div>
        </div>
    )
}