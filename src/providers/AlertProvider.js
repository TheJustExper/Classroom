import React, { Component, createContext } from "react";
import { firestore, auth } from "../firebase";

export const AlertContext = createContext({ 
    alert: null
});

class AlertProvider extends Component {
  state = {
    alert: null,
  };

  setAlert = (alert) => this.setState({ alert });
  
  render() {
    return (
      <AlertContext.Provider value={{ alert: this.state.alert, setAlert: this.setAlert }}>
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}
export default AlertProvider;