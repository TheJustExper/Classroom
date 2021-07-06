import { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../../../providers/UserProvider";
import { firestore, auth } from "../../../../firebase";

import TaskBar from "../../../../components/taskbar/TaskBar";

import "./ProjectOverview.style.scss";

export default (props) => {

    const history = useHistory();
    const [ project, setProject ] = useState(null);
    const  { id } = useParams();
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user == null) return history.push("/login");

            const projectStore = firestore.collection('users/' + user.uid + "/projects/").doc(id);

            projectStore.get().then((doc) => {
                setProject(doc.data());
            }).catch(err => {
                setProject({});
            }); 
        });
    }, []);
    
    return (
        <div className="project-overview">
            { project != null ? 
                <div className="project-head">

                    <TaskBar route={id}/>

                    <div className="project-outer">
                        <p className="project-title"><Link to="/admin/projects">Projects</Link> > <b>{ project.title }</b></p> 
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
                                <h2>4 hr 50 min</h2>
                            </div>
                            <div className="progress-bar">
                                <div className="bar"></div>
                            </div>
                        </div>
                        <div className="project-information-box">
                            <p>Completed Tasks</p>
                            <div className="project-information-box-text">
                                <div className="flex-row">
                                    <h2>1</h2>
                                    <h2>10</h2>
                                </div>
                            </div>
                            <div className="progress-bar">
                                <div className="bar amber" style={{ width: "10%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            : "" }
        </div>
    )
}