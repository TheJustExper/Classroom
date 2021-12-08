import React, { useState, createContext } from "react";
import { firestore, auth } from "../firebase";

export const ClassroomContext = createContext({ 
    classrooms: [],
});

export default ({ children }) => {
  const [ classrooms, setClassrooms ] = useState([]);

  const getClassrooms = async (id) => {
    let itemRefs = firestore.collection('classrooms').where("usersIds", "array-contains", id);
    let doc = await itemRefs.get();
    let items = doc.docs.map((doc) => ({ id: doc.id }));

    setClassrooms(items);
  }

  const isTeacher = (id) => {
    return classrooms.includes(id);
  }

  return (
    <ClassroomContext.Provider value={{ classrooms, getClassrooms }}>
      {children}
    </ClassroomContext.Provider>
  );
}