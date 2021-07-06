import { useParams } from "react-router-dom";

import CreateTask from "../../../../../popups/CreateTask";

import TaskBar from "../../../../../components/taskbar/TaskBar";

import "./Tasks.style.scss";

export default (props) => {
    const  { id } = useParams();
    
    return (
       <div className="project-tasks">
             <TaskBar route={ "/admin/project/" + id }/>
             <div className="project-tasks-buttons">
                <button className="add-task" onClick={() => props.setPopup(<CreateTask addToProjects={{}} setPopup={props.setPopup}/>) }>+ Add Task</button>
             </div>
       </div>
    )
}