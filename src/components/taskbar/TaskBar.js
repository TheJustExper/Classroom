import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import "./TaskBar.style.scss";

export default (props) => {
    const history = useHistory();
    const  { id } = useParams();

    const paths = window.location.href.split("/").filter(s => s.length > 0);
    const path = paths[paths.length - 1];
    const route = "/dashboard/project/" + id;

    const items = [
        { name: "Overview", link: "" },
        { name: "Tasks", link: "tasks" },
        { name: "Files", link: "files" },
        { name: "Discussions", link: "discussions" }
    ];

    return (
        <div className="taskbar">
            { items ? 
                items.map(item => {
                    return (
                        <div onClick={() => history.push(route + "/" + item.link)} className={path == item.link || (item.name == "Overview" && path == route.split("/").pop()) ? "item active" : "item"}>
                            <p>{ item.name }</p>
                            <div className="line"></div>
                        </div>
                    )
                }) : ""
            }
        </div>
    )
}