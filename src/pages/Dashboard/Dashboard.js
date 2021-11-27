import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext, hasRole } from "../../providers/UserProvider";
import { firestore, auth } from "../../firebase";

import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";

import UserDropdown from "../../components/userDropdown/UserDropdown";

import Users from "./items/Users/Users";

import Classrooms from "./items/Classroom/Classrooms";
import Classroom from "./items/Classroom/Classroom";

import AssignmentView from "./items/Classroom/Views/Assignment/AssignmentView";
import QuizView from "./items/Classroom/Views/Quiz/QuizView";

import Projects from "./items/Projects/Projects";
import ProjectOverview from "./items/Project/ProjectOverview";

import Tasks from "./items/Project/Tasks/Tasks";
import Files from "./items/Project/Files/Files";

import Items from "./items/items";

import Notification from "../../popups/Notification/Notification";

import "./Dashboard.style.scss";

export default (props) => { 
    const { user, loading } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            refreshProjects(user.uid);
        }
    }, [ loading ])

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
            <Header setToggledTheme={props.setToggledTheme}/>

            <div className="dashboard-content content">
                <Switch>
                    { user && hasRole(user, ["ADMIN"]) && (
                        <Route exact path="/dashboard/users">
                            <Users setPopup={props.setPopup}/>
                        </Route>
                    ) }

                    <Route exact path="/dashboard/c">
                        <Classrooms setPopup={props.setPopup}/>
                    </Route>

                    <Route exact path="/dashboard/c/:id">
                        <Classroom setPopup={props.setPopup}/>
                    </Route>

                    <Route path="/dashboard/c/:id/a/:assignmentId">
                        <AssignmentView setPopup={props.setPopup} />
                    </Route>

                    <Route path="/dashboard/c/:id/q/:quizId">
                        <QuizView setPopup={props.setPopup} />
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
    )
}