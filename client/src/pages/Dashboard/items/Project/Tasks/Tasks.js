import { useEffect, useState, useContext, useHistory } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";
import { DndContext } from '@dnd-kit/core';

import CreateSection from "../../../../../popups/CreateSection";
import CreateTask from "../../../../../popups/Task/CreateTask";
import EditTask from "../../../../../popups/Task/EditTask";

import Task from "./Task";
import TaskBar from "../../../../../components/taskbar/TaskBar";

import "./Tasks.style.scss";

export default (props) => {
   const  { id } = useParams();

   const user = useContext(UserContext);

   const [ project, setProject ] = useState(null);
   const [ tasks, setTasks ] = useState(null);
   const [ filterTasks, setFilterTasks ] = useState(null);
   const [ taskType, setTaskType ] = useState(true);

   const [ sections, setSections ] = useState(null);
   const [ selectedTask, setSelectedTask ] = useState(null);
   
   const [ editClicked, setEditClicked ] = useState(-1);

   const editClickedMenu = (index) => {
      if (editClicked == index) return setEditClicked(-1);
      setEditClicked(index)
   }

   const refreshTasks = () => {}

   const refresh = (uid) => {
      const sections = firestore.collection('users/' + uid + "/projects/").doc(id).collection("sections");

      sections.get().then(async ({ docs }) => {

         const tempDoc = await Promise.all(docs.map(async (doc) => await getTask(sections, doc)));

         setSections(tempDoc);
      });

      console.log("Called refresh");
   }
   
   const getTask = (sections, doc) => {
      const tasks = sections.doc(doc.id).collection("tasks");

      return new Promise((resolve, reject) => {
         tasks.get().then(taskData => {
            const tasksList = taskData.docs.map((doc2) => {
               return { id: doc2.id, ...doc2.data() }
            });

            resolve({ ...doc.data(), tasks: tasksList });
         }).catch(e => reject(e)); 
      });
   }

   const projectTaskAdd = (target) => {
      editClickedMenu(-1);

      props.setPopup(<CreateTask link={id} refresh={refresh} section={target} setPopup={props.setPopup}/>)
   }

   const openSection = () => {
      props.setPopup(<CreateSection link={id} refresh={refresh} setPopup={props.setPopup}/>);
   }
    
   useEffect(() => {
      auth.onAuthStateChanged(user => {
            //if (user == null) return history.push("/login");

            const projectStore = firestore.collection('users/' + user.uid + "/projects/").doc(id);

            projectStore.get().then((doc) => setProject(doc.data()));

            refresh(user.uid);
      });
  }, []);

    return (
       <div className="outer" onClick={() => editClickedMenu(-1)}>
         <div className="project-tasks">  
               <TaskBar/>

               <div className="project-tasks-head">

                  <div className="project-tasks-buttons">
                     <button className="button add primary" onClick={openSection}>+ New Section</button>
                     <button className="button filter">Filter Tasks</button>
                     <button className="button filter">Tasks Type</button>
                  </div>

                  <div className="bar">
                     <div className="project-tasks-team">
                        <img src="" className="user"/>
                     </div>

                     <button className="button">+ Share</button>
                  </div>

               </div>
               

               <div className="project-task-board">

                  {
                     sections != null && sections.length > 0 ?

                     sections.sort((a, b) => a.order - b.order).map(({ title, tasks }, index) => {
                        return (
                           <div className="project-task-column" id={title}>
                              <div className="project-task-header">
                                 <p><span class="project-title">{ title }</span> <b>({ tasks.length })</b></p>
                                 <div className="edit-outer">
                                    <span className="edit-icon" onClick={(e) => (e.stopPropagation(), editClickedMenu(index))}><i class="fas fa-ellipsis-h"></i></span>
                                    { editClicked == index ? 
                                       <ul className="edit-menu">
                                          <li class="site-nav-user-item" onClick={(e) => projectTaskAdd(e.target.parentNode.parentNode.parentNode.parentNode.id)}><i class="fas fa-plus-circle"></i> Add card</li>
                                          <li class="site-nav-user-item"><i class="fas fa-edit"></i> Edit Section</li>
                                          <li class="site-nav-user-item"><i class="fas fa-clock"></i> Watch</li>
                                       </ul>
                                    : "" }
                                 </div>
                              </div>
                              
                              {

                                 tasks.length > 0 ?
                                    <div className="project-tasks-list">
                                       { tasks.map((data, index) => {
                                          const editTask = <EditTask setPopup={props.setPopup}/>
                                          
                                          return <Task index={index} selectedTask={selectedTask} setSelectedTask={setSelectedTask} data={data}/>
                                       }) } 
                                    </div>
                                 : ""

                              }

                              <div className="project-task-add" onClick={(e) => projectTaskAdd(e.target.parentNode.id)}>Add a Card</div> 
                           </div>
                        )
                     })
                  : ""
                  } 

               </div>
         </div>
       </div>
    )
}