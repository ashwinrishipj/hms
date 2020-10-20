import React, { useState } from "react";
import LoginForm from "./loginform"
import { withRouter } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./LandingPage.css"
import LockScreen from "./LockScreen";
import DashBoard from "../DashBoard/DashBoard";

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
                <div className="container-fluid p-0">
                  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href=";false">
                      HMS
               </a>
                  </nav>

                  <div className="row d-inline">
                    <div className="col-md-4 mx-auto mt-4">
                      <LoginForm updateRoute={updateRoute} />
                    </div>
                  </div>

                </div>
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
