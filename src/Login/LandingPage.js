import React, { useState } from "react";
import LoginForm from "./loginform"
import { withRouter } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./LandingPage.css"
import LockScreen from "./LockScreen";
import DashBoard from "../DashBoard/DashBoard";
import Login from "./login";

export const LandingPage = (props) => {
  const [route, setroute] = useState(props.intialize);

  const updateRoute = (path) => {
    setroute(path)
  }

  return (
    <BrowserRouter>
      <Switch>
        {(route === "lockScreen" && (
          <Route path="/" component={() => (
            <LockScreen updateRoute={updateRoute} />
          )} />
        )) ||
          (route === "login" && (
            <Route
              path="/"
              component={() => (
               <Login updateRoute={updateRoute}/>
              )}
            />
          )) ||
          (route === "dashBoard" && (
            <Route
              path="/"
              component={() => (
                <DashBoard updateRoute={updateRoute} />
              )}
            />)) || ""}
      </Switch>
    </BrowserRouter>

  );
};

export default withRouter;
