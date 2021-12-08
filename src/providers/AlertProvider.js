import React, { Component, createContext } from "react";
import { firestore, auth } from "../firebase";

export const AlertContext = createContext({ 
    alert: null,
    type: null,
});

class AlertProvider extends Component {
  state = {
    alert: null,
    type: null,
  };

  setAlert = (type, alert) => this.setState({ type, alert });
  
  render() {
    return (
      <AlertContext.Provider value={{ alert: this.state.alert, type: this.state.type, setAlert: this.setAlert }}>
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}

export default AlertProvider;