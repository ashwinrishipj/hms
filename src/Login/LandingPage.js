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

      <div className="row d-inline">
        <div className="col-md-4 mx-auto mt-4">
          <LoginForm />
        </div>
      </div>

    </div>
  );
};

export default withRouter;
