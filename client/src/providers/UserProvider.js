import React, { Component, createContext } from "react";
import { firestore, auth } from "../firebase";

export const UserContext = createContext({ user: null, loading: true, });

export const hasRole = (user, roles) => {
  if (roles.length == 0) return false;

  return roles.every(role => user.roles.includes(role));
}

class UserProvider extends Component {
  state = {
    user: null,
    loading: true,
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth == null) return this.setState({ user: null });
      
      const projectStore = firestore.collection("users").doc(userAuth.uid);

      projectStore.get().then((doc) => {
          const user = doc.data();
          
          this.setState({ user, loading: false });
      });
    });
  };
  
  render() {
    return (
      <UserContext.Provider value={{ user: this.state.user, loading: this.state.loading }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;