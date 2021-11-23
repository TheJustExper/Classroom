import React, { useState } from "react";

export default (props) => {
    const { title, description, date } = props.data;

    function clickedTask(e) {
        props.setSelectedTask(e.target.dataset.task);
    }

    return (
         <div data-task={props.index} className={"project-task-inner " + (props.selectedTask == props.index ? "selected" : "")} onClick={clickedTask}>   
            <p className="title"><i class="far fa-file"></i> { title }</p>
            <p className="description">{ description }</p>
            <p className="date blue"><i class="fas fa-clock"></i> { date }</p>
         </div>
     )
}