import React, { useState, useContext } from "react";
import UserProvider, { UserContext } from "./providers/UserProvider";

import { firebaser, firestore, auth } from "./firebase";

import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import Account from "./pages/Account/Account";

import Fade from "./components/fade/Fade";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "animate.css";
import './styles/index.scss';

export default function App() {
  const [ popup, setPopup ] = useState(null);

  function PrivateRoute ({ component: Component, authed, ...rest }) {
    const user = useContext(UserContext);
    
    return (
      <Route
        {...rest}
        render={(props) => user
          ? <Component setPopup={setPopup} {...props} />
          : <Redirect to={{ pathname: '/login' }} />}
      />
    )
  }

  return (
    <UserProvider>
      <Router>
          <div id="app">
          { popup != null ? <>{popup} {<Fade setPopup={setPopup}/>}</> : "" } 

            <Switch>
              <Route exact path="/">
                <LandingPage/>
              </Route>
              <Route path="/dashboard">
                <Dashboard setPopup={setPopup}/>
              </Route>
              <Route path="/account">
                <Account/>
              </Route>
            </Switch>
          </div>
      </Router>
    </UserProvider>
  );
}
