import React from "react";
import LoginForm from "./loginform"
import { withRouter } from "react-router-dom";
import "./LandingPage.css"

export const LandingPage = () => {
  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href=";false">
          HMS
        </a>
      </nav>

      <div className="row d-flex h-100 ">
        <div className="col-md-4 mx-auto my-auto center-align">
          <LoginForm />
        </div>
      </div>

    </div>
  );
};

export default withRouter;
