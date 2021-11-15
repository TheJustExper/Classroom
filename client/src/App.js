import React, { useState, useContext, useEffect } from "react";
import UserProvider, { UserContext } from "./providers/UserProvider";

import { firebaser, firestore, auth } from "./firebase";

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
  const [ toggledTheme, setToggledTheme ] = useState( localStorage.getItem("toggled-theme") === 'true' );

  const { user, loading } = useContext(UserContext);

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

  const toggleTheme = () => {
    setToggledTheme(!toggledTheme);
  }

  useEffect(() => {
    localStorage.setItem("toggled-theme", toggledTheme);
  }, [ toggledTheme ])

  return (
    <UserProvider>
      <Router>
          <div id="app" className={ toggledTheme ? "theme-dark" : "theme-light" }>
          { popup != null ? <>{popup} {<Fade setPopup={setPopup}/>}</> : "" } 

            <Switch>
              <Route exact path="/">
                <LandingPage/>
              </Route>

              <Route path="/dashboard">
                <Dashboard setPopup={setPopup} setToggledTheme={toggleTheme}/>
              </Route>

              <Route path="/account" compponent={Account}/>
              <Route path="/login" component={Login}/>
              
            </Switch>
          </div>
      </Router>
    </UserProvider>
  );
}
