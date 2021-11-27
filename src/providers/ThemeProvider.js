import React, { Component, createContext, useState, useEffect } from "react";
import { firestore, auth } from "../firebase";

export const ThemeContext = createContext({
    theme: false,
});

class ThemeProvider extends Component {
    state = {
      theme: localStorage.getItem("toggled-theme") === 'true',
    };
  
    toggleTheme = () => {
        this.setState({ theme: !this.state.theme });
        localStorage.setItem("toggled-theme", !this.state.theme);
    }
    
    render() {
      return (
        <ThemeContext.Provider value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}>
          {this.props.children}
        </ThemeContext.Provider>
      );
    }
}
  
export default ThemeProvider;
