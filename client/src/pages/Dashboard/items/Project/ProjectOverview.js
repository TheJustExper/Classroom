import { useEffect, useState, useContext } from "react";
import { Link, Switch, useHistory, useParams, Route } from "react-router-dom";
import { UserContext } from "../../../../providers/UserProvider";
import { firestore, auth } from "../../../../firebase";
import Tasks from "./Tasks/Tasks";

import ProgressBar from "../../../../components/progressBar/ProgressBar";

import TaskBar from "../../../../components/taskbar/TaskBar";

import "./ProjectOverview.style.scss";

export default (props) => {

    const history = useHistory();
    const [ project, setProject ] = useState(null);
    const [ tasks, setTasks ] = useState(null);
    const  { id } = useParams();
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user == null) return history.push("/login");

            const projectStore = firestore.collection('users/' + user.uid + "/projects/").doc(id);

            projectStore.get().then((doc) => setProject(doc.data()));

            refreshTasks(user.uid);
        });
    }, []);

    const refreshTasks = (uid) => {
        const tasks = firestore.collection('users/' + uid + "/projects/").doc(id).collection("tasks");
  
        tasks.get().then((querySnapshot) => {
              const tempDoc = querySnapshot.docs.map((doc) => {
                 return { id: doc.id, ...doc.data() }
              })
              
              setTasks(tempDoc);
        });
     }
    
    return (
        <div className="itemContent">
        <>
            <div className="project-overview">
                    <div className="project-head">

                        <TaskBar/>
                        { project != null ? 
                        
                        <>
                            <div className="project-outer">
                                <p className="project-title"><Link to="/dashboard/projects">Projects</Link> > <b>{ project.title }</b></p> 
                                <h2>{ project.title }</h2>

                                <div className="project-data">
                                    <div className="project-status-outer">
                                        <span className="project-status"><i class="fas fa-bolt"></i> Active Project</span>
                                    </div>
                                </div>
                            </div> 
                            
                            <div className="project-information">
                                <div className="project-information-box">
                                    <p>Total time on Project</p>
                                    <div className="project-information-box-text">
                                        <h2>{ project.totalTime ? project.totalTime : "0 hr 0 min" }</h2>
                                    </div>
                                    <ProgressBar progress={80}/>
                                </div>

                                { tasks != null ? 
                                <div className="project-information-box">
                                    <p>Completed Tasks</p>
                                    <div className="project-information-box-text">
                                        <div className="flex-row">
                                            <h2>{ tasks.filter(task => task.priority == 2).length }</h2>
                                            <h2>{ tasks.length }</h2>
                                        </div>
                                    </div>
                                    <ProgressBar progress={tasks.filter(task => task.priority == 2).length / tasks.length * 100}/>
                                </div> : "" }
                                
                            </div>
                        </>
                        
                         : "" }
                    </div>
            </div>
        </>
        </div>
    )
}