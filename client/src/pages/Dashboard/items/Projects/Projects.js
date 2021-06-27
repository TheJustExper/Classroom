import React, { useState } from "react";

import CreateProject from "../../../../popups/CreateProject";
import Project from "./Project";

import "./projects.style.scss";

export default (props) => {
    
    const addToProjects = (data, tech) => {
        props.setProjects([...props.projects, Object.assign(data, {
            date: new Date().toLocaleDateString(),
            technologies: tech,
        })]);    
    }

    return (
        <>
            { props.projects.length == 0 ? 

            <div className="empty">
                <img src="https://image.flaticon.com/icons/png/512/3767/3767094.png"/>
                <b>Your workspace hasn't created anything yet</b>
                <p>Create or upload a project to see it here</p>
                <button className="small" onClick={() => props.setPopup(<CreateProject addToProjects={addToProjects} setPopup={props.setPopup}/>) }>Create a Project</button>
            </div> :

            <div className="dashboard-side">
                <div className="text">
                    <h1>Projects</h1>
                    <p>Seach directory of { props.projects.length } projects</p>
                </div>

                <div className="projects">
                    { props.projects != null ? props.projects.map((data) => <Project data={data}/> ) : ""}
                </div>
            </div>
        }
        </>
    )
}