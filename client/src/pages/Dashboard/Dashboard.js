import React, { useState, useEffect } from "react";

import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";

import Schedules from "./items/Schedules";
import Projects from "./items/Projects";

import Items from "./items/items";

import "./Dashboard.style.scss";

export default (props) => {
    const t = { 
        title: "Full Stack Website", 
        description: "Testing new technologies", 
        date: new Date().toLocaleDateString(),
        technologies: ["nodejs", "react", "sass"]  
    }

    const [ activeId, setActiveId ] = useState(null);

    const [ schedules, setSchedules ] = useState([
        { name: "API Descriptions" },
        { name: "FAQ Section" },
        { name: "Website Design UI/UX" },
    ]);

    const [ projects, setProjects] = useState([])

    const setSection = (id) => {
        setActiveId(id);
    }

    return (
        <div className="dashboard">
            <Header/>
            <div className="dashboard-content">
            <Sidebar activeSection={activeId} setSection={setSection}/>
                <div className="itemContent">
                    { activeId != null ? 
                        activeId == 1 ? <Schedules schedules={schedules}/> : 
                        activeId == 2 ? <Projects setPopup={props.setPopup} setProjects={setProjects} projects={projects}/> : ""
                    : "" }
                </div>
            </div>
        </div>
    )
}