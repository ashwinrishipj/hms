import React, { useState } from "react";
import LoginForm from "./loginform"
import { withRouter } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./LandingPage.css"
import LockScreen from "./LockScreen";
import DashBoard from "../DashBoard/DashBoard";
import Login from "./login";
import { Provider ,useSelector } from "react-redux";
import { createStore } from "redux";
import allReducers from "../redux/reducers";

const myStore = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const LandingPage = () => {
  const route = useSelector(state => state.routePage);

  return (
    <BrowserRouter>
      <Provider store={myStore}>
        <Switch>
          {(route === "lockScreen" && (
            <Route path="/" component={() => (
              <LockScreen />
            )} />
          )) ||
            (route === "login" && (
              <Route
                path="/"
                component={() => (
                  <Login />
                )}
              />
            )) ||
            (route === "dashBoard" && (
              <Route
                path="/"
                component={() => (
                  <DashBoard />
                )}
              />)) || ""}
        </Switch>
      </Provider>
    </BrowserRouter>

  );
};

export default withRouter;
