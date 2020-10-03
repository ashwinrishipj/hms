import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { LandingPage } from "./Login/LandingPage";
import DashBoard from "./DashBoard/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" strict exact>
          <LandingPage/>
        </Route>
        <Route path="/home" strict exact>
           <DashBoard/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
