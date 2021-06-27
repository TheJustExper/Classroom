import React, { useState } from "react";

import './styles/index.scss';

import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import Project from "./pages/Project/Project";

import Fade from "./components/fade/Fade";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  const [ popup, setPopup ] = useState(null);

  return (
    <Router>
      <div id="app">
      { popup != null ? <>{popup} {<Fade/>}</> : "" } 
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route path="/dashboard">
            <Dashboard setPopup={setPopup}/>
          </Route>
          <Route path="/project/:id">
            <Project/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
