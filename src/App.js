import React, { useState, useContext, useEffect } from "react";
import UserProvider, { UserContext } from "./providers/UserProvider";
import AlertProvider, { AlertContext } from "./providers/AlertProvider";
import ThemeProvider, { ThemeContext } from "./providers/ThemeProvider";
import EditorProvider from "./providers/EditorProvider";
import ClassroomProvider from "./providers/ClassroomProvider";

import PrivateRoute from "./PrivateRoute";

import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import Blogs from "./pages/Blogs/Blogs";

import Fade from "./components/fade/Fade";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "animate.css";
import './styles/index.scss';

import Particles from 'react-particles-js';

function AppInner() {
  const [ popup, setPopup ] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div id="app" className={ theme ? "theme-dark" : "theme-light" }>
      { popup != null ? <>{popup} {<Fade setPopup={setPopup}/>}</> : "" } 

      <Switch>
        <PrivateRoute path="/dashboard" component={Dashboard} setPopup={setPopup}/>
        <PrivateRoute path="/account" component={Account} />

        <Route exact path="/" component={LandingPage} />
        <Route exact path="/blogs" component={Blogs}/>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  )
}

export default function App() {
  return (
    <UserProvider>
      <AlertProvider>
        <ThemeProvider>
          <ClassroomProvider>
            <EditorProvider>
              <Router>
                <AppInner/>     
              </Router>
            </EditorProvider>
          </ClassroomProvider>
        </ThemeProvider>
      </AlertProvider>
    </UserProvider>
  );
}
