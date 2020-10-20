import React from "react";
import NegativeAlert from "../Alerts/NegativeAlert";
import { LoginFetchData } from "../helpers/Fetch";
import { withRouter } from "react-router-dom";
import Spinner from "../../node_modules/react-bootstrap/Spinner";

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: "",
      confirmPassword: "",
      Terms: "",
      error: "",
      Alert: false,
      spinner: false,
    };
  }

  changeAlert = (contentText) => {
    this.setState({
      Alert: !this.state.Alert,
      error: contentText,
      spinner: false,
    });
  };

  submitSignup = (e) => {
    e.preventDefault();

    let requestBody = {
      query: `
        mutation{
          registerUser(input:{emailId:"${this.state.emailId}",password:"${this.state.password}"}){
            token,
            tokenExpiration,
            userId
          }
        }
        `,
    };

    this.setState({ spinner: true });
    LoginFetchData(requestBody).then((response) => {
      return response == true
        ? this.props.updateHomeRoute("dashBoard")
        : this.changeAlert(response);
    });
  };

  validateField = (e) => {
    let type = e.target.name;
    let value = e.target.value;

    switch (type) {
      case "emailId":
        if (
          value.match(new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i))
        ) {
          this.setState({ [type]: value, Alert: false, error: "" });
        } else this.setState({ error: "gmail is not valid", Alert: true });
        break;
      case "password":
        if (
          value.match(
            new RegExp(
              "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
            )
          )
        ) {
          this.setState({ [type]: value, Alert: false });
        } else
          this.setState({
            error:
              "The password must be 6 characters with one upper case and one number and one special characters ",
            Alert: true,
          });
        break;
      case "confirmPassword":
        if (
          value.match(
            new RegExp(
              "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
            )
          ) &&
          value === this.state.password
        ) {
          this.setState({ [type]: value, Alert: false, error: "" });
        } else
          this.setState({
            error: "Your both password doesnt match ",
            Alert: true,
          });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="card">
        <article className="card-body">
          <h5 className="text-center">Register</h5>
          <hr />
          <section className="col negativeAlert px-0">
            {this.state.Alert ? (
              <NegativeAlert
                content={this.state.error}
                changeAlert={() => this.changeAlert()}
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
                  className="form-control"
                  placeholder="EmailId"
                  type="email"
                  name="emailId"
                  onChange={this.validateField}
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
                  className="form-control"
                  placeholder="******"
                  type="password"
                  name="password"
                  onChange={this.validateField}
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
                  className="form-control"
                  placeholder="Re-type your password"
                  type="password"
                  name="confirmPassword"
                  onChange={this.validateField}
                />
              </div>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-info btn-block"
                onClick={this.submitSignup}
              >
                {this.state.spinner ? (
                  <>
                    Registering ...
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      variant="dark"
                    />
                  </>
                ) : (
                    <>Register</>
                  )}
              </button>
            </div>
            <button className="btn btn-outline-warning btn-md text-dark">
              Forgot password?
            </button>

            <button
              className="btn btn-outline-warning  btn-md text-dark"
              onClick={this.props.triggerSignup}
              style={{ float: "right" }}
            >
              Go back
            </button>
          </form>
        </article>
      </div>
    );
  }
}
export default withRouter(RegisterUser);
