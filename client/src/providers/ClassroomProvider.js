import React, { Component, createContext } from "react";
import { firestore, auth } from "../firebase";

export const ClassroomContext = createContext({ 
    isTeacher: false,
});

class ClassroomProvider extends Component {
  state = {
    isTeacher: false,
  };

  componentDidMount = () => {
    let itemRefs = firestore.collection('classrooms').doc(id);
  };
  
  render() {
    return (
      <ClassroomContext.Provider value={{ isTeacher: this.state.isTeacher }}>
        {this.props.children}
      </ClassroomContext.Provider>
    );
  }
}
export default ClassroomProvider;