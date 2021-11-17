import React, { useState, useContext, useEffect } from "react";
import UserProvider, { UserContext } from "./providers/UserProvider";

import PrivateRoute from "./PrivateRoute";

import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";

import Fade from "./components/fade/Fade";


import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "animate.css";
import './styles/index.scss';

export default function App() {
  const [ popup, setPopup ] = useState(null);
  const [ toggledTheme, setToggledTheme ] = useState( localStorage.getItem("toggled-theme") === 'true' )

  const toggleTheme = () => {
    setToggledTheme(!toggledTheme);
  }

  useEffect(() => {
    localStorage.setItem("toggled-theme", toggledTheme);
  }, [ toggleTheme ])

  return (
    <UserProvider>
      <Router>
          <div id="app" className={ toggledTheme ? "theme-dark" : "theme-light" }>
          { popup != null ? <>{popup} {<Fade setPopup={setPopup}/>}</> : "" } 

            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} setPopup={setPopup} setToggledTheme={toggleTheme}/>

              <Route exact path="/" component={LandingPage} />
              <Route path="/account" compponent={Account} />
              <Route path="/login" component={Login} />
              
            </Switch>
          </div>
      </Router>
    </UserProvider>
  );
}
