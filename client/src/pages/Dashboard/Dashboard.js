import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { firestore, auth } from "../../firebase";

import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";

import Schedules from "./items/Schedules/Schedules";
import Projects from "./items/Projects/Projects";
import ProjectOverview from "./items/Project/ProjectOverview";
import Tasks from "./items/Project/Tasks/Tasks";

import Items from "./items/items";

import "./Dashboard.style.scss";

export default (props) => { 
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user == null) return history.push("/login");

            const projectStore = firestore.collection('users/' + user.uid + "/projects");

            projectStore.get().then((querySnapshot) => {
                const tempDoc = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() }
                })
                
                setProjects(tempDoc);
            });
        });
    }, [])

    const [ activeId, setActiveId ] = useState(null);
    const [ project,  setProject ]  = useState(null);

    const [ projects, setProjects]  = useState([])

    const [ schedules, setSchedules ] = useState([
        { name: "API Descriptions" },
        { name: "FAQ Section" },
        { name: "Website Design UI/UX" },
    ]);

    const setSection = (id) => setActiveId(id);

    return (
        <div className="dashboard">
            <Header/>
            <div className="dashboard-content">
                <Sidebar activeSection={activeId} setSection={setSection}/>
                <div className="itemContent">
                    <Switch>
                        <Route exact path="/dashboard/projects">
                            <Projects projects={projects} setPopup={props.setPopup} setProjects={setProjects}/>
                        </Route>
                        <Route exact path="/dashboard/project/:id">
                            <ProjectOverview setPopup={props.setPopup}/>
                        </Route>
                        <Route exact path="/dashboard/project/:id/tasks">
                            <Tasks setPopup={props.setPopup}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}