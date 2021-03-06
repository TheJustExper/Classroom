import React, { useState } from "react";

import CreateProject from "./Popups/CreateProject";
import Project from "./Project";

import "./projects.style.scss";

export default (props) => {

    return (
        <>
            { props.projects.length == 0 ? 

            <div className="empty">
                <img src="https://image.flaticon.com/icons/png/512/3767/3767094.png"/>
                <b>Your workspace hasn't created anything yet</b>
                <p>Create or upload a project to see it here</p>
                <button className="small" onClick={() => props.setPopup(<CreateProject refresh={props.refresh} setPopup={props.setPopup}/>) }>Create a Project</button>
            </div> :

            <div className="itemContent">
                <div className="side">
                    <div className="text">
                        <h1>Projects</h1>
                        <p className="title">Seach directory of { props.projects.length } projects</p>
                    </div>

                    <div className="projects">
                        { props.projects != null ? props.projects.map((data) => <Project data={data}/> ) : ""}

                        <div className="project newProject" onClick={ () => props.setPopup(<CreateProject refresh={props.refresh} setPopup={props.setPopup}/>) }>
                            <p>Create a project</p>
                        </div>
                    </div>
                </div>
            </div>
            
            }
        </>
    )
}