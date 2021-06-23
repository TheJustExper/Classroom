import './styles/index.scss';

import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div id="app">
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
