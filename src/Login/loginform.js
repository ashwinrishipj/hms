import React from "react";
import RegisterUser from "./registerForm";
import { LoginFetchData } from "../helpers/Fetch";
import NegativeAlert from "../Alerts/NegativeAlert";
import Spinner from "../../node_modules/react-bootstrap/Spinner";
import { route } from "../redux/actions";
import { useDispatch } from "react-redux";
import { ReactReduxContext } from 'react-redux'

function LoginForm() {

  this.state = {
    emailIdError: "",
    passwordError: "",
    emailId: "",
    password: "",
    alert: false,
    content: "",
    signup: false,
    spinner: false,
    buttonDisabled: true,
  };

  const dispatch = useDispatch();

  const setAlert = (contentText) => {
    this.setState({
      alert: true,
      content: contentText,
      spinner: false,
    });
  };

  const unsetAlert = () => {
    this.setState({ alert: false });
  };

  const triggerSignup = () => {
    this.setState({ signup: !this.state.signup });
  };


  const validateField = (e) => {
    e.preventDefault();
    let validation = e.target.value;
    let fieldName = e.target.type;

    switch (fieldName) {
      case "email":
        if (
          validation.match(
            new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
          )
        ) {
          this.state.passwordError === ""
            ? this.setState({ buttonDisabled: false })
            : this.setState({ buttonDisabled: true });

          this.setState({
            emailIdError: "",
            emailId: validation,
            alert: false,
          });
        } else {
          setAlert("Enter valid Email Id");
          this.setState({ emailIdError: "email error", buttonDisabled: true });
        }
        break;

      case "password":
        if (
          validation.match(
            new RegExp(
              "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
            )
          )
        ) {
          this.state.emailIdError === ""
            ? this.setState({ buttonDisabled: false })
            : this.setState({ buttonDisabled: true });

          this.setState({
            passwordError: "",
            password: validation,
            alert: false,
          });
        } else {
          setAlert("Try aplha numeric with a digit");
          this.setState({
            passwordError: "password Error",
            buttonDisabled: true,
          });
        }
        break;
      default:
        break;
    }
  };

  const onSubmitSignIn = (e) => {
    e.preventDefault();
    dispatch(route("dashBoard"));

    // let requestBody = {
    //   query: ` query{
    //     validateUser(input:{
    //       emailId:"${this.state.emailId}",password :"${this.state.password}"
    //     }){
    //       token,
    //       tokenExpiration,
    //       userId
    //     }
    //   }
    //   `,
    // };

    // this.setState({ spinner: true });
    // LoginFetchData(requestBody).then((response) => {
    //   return response == true
    //     ? this.props.updateRoute("dashBoard")
    //     : response == false ? this.setAlert("server is down!. we are working on it. Please try after a minute.") : this.setAlert(response);
    // });
  }

  return (
    
    <div>
      <aside className="col mt-4 card-transparent">
        {this.state.signup ? (
          <RegisterUser triggerSignup={() => triggerSignup()} />
        ) : (
            <div className="card">
              <article className="card-body">
                <h5 className="card-title text-dark text-center">Sign in</h5>
                <hr />
                <section className="col negativeAlert px-0">
                  {this.state.alert ? (
                    <NegativeAlert
                      changeAlert={() => unsetAlert()}
                      content={this.state.content}
                    />
                  ) : (
                      ""
                    )}
                </section>
                <form>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <i className="fa fa-envelope fa-xs"></i>{" "}
                        </span>
                      </div>
                      <input
                        className="form-control shadow-none"
                        placeholder="EmailId"
                        type="email"
                        onChange={() => validateField()}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <i className="fa fa-key fa-xs"></i>{" "}
                        </span>
                      </div>
                      <input
                        className="form-control shadow-none"
                        placeholder="******"
                        type="password"
                        onChange={() => validateField()}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-success btn-block"
                      onClick={() => onSubmitSignIn()}
                      disabled={this.state.buttonDisabled}
                    >
                      {this.state.spinner ? (
                        <>
                          Loging In...
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            variant="dark"
                          />
                        </>
                      ) : (
                          <>Login</>
                        )}
                    </button>
                  </div>
                  {/* <button className="btn btn-outline-info btn-sm float-left">
                      Forgot password?
                  </button> */}

                  <button
                    className="btn btn-info btn-sm float-right"
                    onClick={() => triggerSignup()}
                  >
                    Sign Up
                  </button>
                </form>
              </article>
            </div>
          )}
      </aside>
    </div>
  );
}
export default LoginForm;
