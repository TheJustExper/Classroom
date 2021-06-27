import React, { useState } from "react";

import CreateProject from "../../../popups/CreateProject";

import "./projects.style.scss";

export default (props) => {
    const addToProjects = (data) => {
        props.setProjects([...props.projects, Object.assign(data, {
            technologies: ["nodejs", "sass", "react"],
            date: new Date().toLocaleDateString(),
        })]);    
    }

    const technologiesList = {
        "nodejs": "https://cdn.iconscout.com/icon/free/png-512/node-js-1174925.png",
        "sass": "https://www.keepapi.ovh/wp-content/uploads/2018/10/sass.png",
        "react": "https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?fit=260%2C260&ssl=1",
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
                    { props.projects != null ? props.projects.map(({ title, description, date, technologies }) => {
                        return (
                            <div className="project">
                                <div className="head">
                                    <b>{ title }</b>
                                    <p>{ description }</p>
                                </div>
                                <div className="bottom">
                                    <div className="technologies-outer">
                                        <p>Technologies Used</p>
                                        <div className="technologies-inner">
                                        { console.log(technologies["nodejs"])}
                                            { technologies.map(img => {
                                                return <img src={technologiesList[img]}/>
                                            })}
                                        </div>
                                    </div>
                                    <div className="date">
                                        <p>Date Created</p>
                                        <b>{ date }</b>
                                    </div>
                                </div>
                        </div>
                        )
                    }) : ""}
                </div>
            </div>
        }
        </>
    )
}