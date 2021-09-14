import { useEffect, useState, useContext, useHistory } from "react";
import { useParams } from "react-router-dom";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import { UserContext } from "../../../../../providers/UserProvider";
import { firestore, auth } from "../../../../../firebase";

import CreateTask from "../../../../../popups/Task/CreateTask";

import TaskBar from "../../../../../components/taskbar/TaskBar";

import "./Files.style.scss";

export default (props) => {
   const  { id } = useParams();

   const [ project, setProject ] = useState(null);
   const [ tasks, setTasks ] = useState(null);
   const [ filterTasks, setFilterTasks ] = useState(null);


   const filterTaskList = () => {
      setFilterTasks(!filterTasks);

      const newTasks = tasks.sort((a, b) => b.priority - a.priority);

      setTasks(newTasks);
   }

   const refreshTasks = (uid) => {
      const tasks = firestore.collection('users/' + uid + "/projects/").doc(id).collection("tasks");

      tasks.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
               return { id: doc.id, ...doc.data() }
            })
            
            setTasks(tempDoc);
      });
   }
    
   useEffect(() => {
      auth.onAuthStateChanged(user => {
            //if (user == null) return history.push("/login");

            const projectStore = firestore.collection('users/' + user.uid + "/projects/").doc(id);

            projectStore.get().then((doc) => setProject(doc.data()));

            refreshTasks(user.uid);
      });
  }, []);

    return (
       <div className="outer">
         <div className="project-files">  
               <TaskBar/>
               <div className="project-tasks-buttons">
                  
               </div>

               <div className="project-task-list">

               </div>
         </div>
       </div>
    )
}