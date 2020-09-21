import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { LandingPage } from "./Login/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" strict exact>
          <LandingPage/>
        </Route>
        <Route path="/home" strict exact>
          {/* <Home /> */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
