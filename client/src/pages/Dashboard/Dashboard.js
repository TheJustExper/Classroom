import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext, hasRole } from "../../providers/UserProvider";
import { firestore, auth } from "../../firebase";

import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";

import Users from "./items/Users/Users";

import Classrooms from "./items/Classroom/Classrooms";
import Classroom from "./items/Classroom/Classroom";

import Projects from "./items/Projects/Projects";
import ProjectOverview from "./items/Project/ProjectOverview";

import Tasks from "./items/Project/Tasks/Tasks";
import Files from "./items/Project/Files/Files";

import Items from "./items/items";

import "./Dashboard.style.scss";

export default (props) => { 
    const user_context = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user == null) return history.push("/");

            refreshProjects(user.uid);
        });
    }, [])

    const refreshProjects = (id) => {
        const projectStore = firestore.collection('users/' + id + "/projects");

        projectStore.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            
            setProjects(tempDoc);
        });
    }

    const [ activeId, setActiveId ] = useState(null);
    const [ project,  setProject ]  = useState(null);

    const [ projects, setProjects]  = useState([])

    const setSection = (id) => setActiveId(id);

    return (
        <div className="dashboard">
            <Header/>

            <div className="dashboard-content">

                <Sidebar activeSection={activeId} setSection={setSection}/>

                <div className="itemContent">
                    <Switch>
                        { user_context && hasRole(user_context, ["ADMIN"]) && (
                            <Route exact path="/dashboard/users">
                                <Users setPopup={props.setPopup}/>
                            </Route>
                        )}

                        <Route exact path="/dashboard/classrooms">
                            <Classrooms setPopup={props.setPopup}/>
                        </Route>

                        <Route exact path="/dashboard/classrooms/:id">
                            <Classroom setPopup={props.setPopup}/>
                        </Route>

                        <Route exact path="/dashboard/projects">
                            <Projects projects={projects} refresh={refreshProjects} setPopup={props.setPopup}/>
                        </Route>

                        <Route exact path="/dashboard/project/:id">
                            <ProjectOverview setPopup={props.setPopup}/>
                        </Route>

                        <Route exact path="/dashboard/project/:id/tasks">
                            <Tasks setPopup={props.setPopup}/>
                        </Route>

                        <Route exact path="/dashboard/project/:id/files">
                            <Files setPopup={props.setPopup}/>
                        </Route>
                    </Switch>
                </div>

            </div>
        </div>
    )
}