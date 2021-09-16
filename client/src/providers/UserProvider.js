import React, { Component, createContext } from "react";
import { firestore, auth } from "../firebase";

export const UserContext = createContext({ user: null });

export const hasRole = (user, roles) => {
  if (roles.length == 0) return false;

  return roles.every(role => user.roles.includes(role));
}

class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth == null) return this.setState({ user: null });
      
      const projectStore = firestore.collection("users").doc(userAuth.uid);

      projectStore.get().then((doc) => {
          const user = doc.data();
          
          this.setState({ user });
      });
    });
  };
  
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;