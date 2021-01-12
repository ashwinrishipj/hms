import React, { useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import NegativeAlert from "../Alerts/NegativeAlert";

function ForgetPassword(props) {

    const [error, seterror] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [alert, setalert] = useState(false)
    const [buttonDisabled, setbuttonDisabled] = useState(true);
    const [emailId, setemailId] = useState("");
    const [OTPSent, setOTPSent] = useState(false);
    const [verficationCode, setverficationCode] = useState();
    const [OTPVerified, setOTPVerified] = useState(false)

    const unsetAlert = () => {
        seterror("");
        setalert(false);
        setbuttonDisabled(false);
    }

    const validateEmail = () => {
        setbuttonDisabled(true);
        setSpinner(true);

        if (OTPSent) {
            let requestBody = {
                query: `query{s
                        resetPassword(input:{
                        emailId:'${emailId}',
                        verfication:'${verficationCode}'
                      })
                    } `,
            }

            fetch('http://localhost:4000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    Accept: 'appliction/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((responseJSON) => {
                    responseJSON.data.resetPassword
                        ? setOTPSent(true)
                        : setOTPSent(false)
                })
                .catch((error) => console.error('error in fetching todo:', error));

        } else {
            let requestBody = {
                query: `query{s
                        resetPassword(input:{
                        emailId:'${emailId}',
                      })
                    } `,
            }

            fetch('http://localhost:4000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    Accept: 'appliction/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((responseJSON) => {
                    responseJSON.data.resetPassword
                        ? setOTPVerified(true)
                        : setOTPVerified(false)
                })
                .catch((error) => console.error('error in fetching todo:', error));
        }
    }

    const validateField = (event) => {
        var field = event.target.name;
        if (field === "emailId") {
            if (event.target.value.match(new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i))) {
                unsetAlert("");
                setemailId(event.target.value);
            }
            else {
                seterror("please enter valid EmailId");
                setalert(true);
            }
        } else {
            if (event.target.value.length() > 6) {
                unsetAlert("");
                setverficationCode(event.target.value);
            }
        }
    }

    return (
        <div className="card">
            <article className="card-body">
                <h5 className="card-title text-dark text-center">forgotPassword</h5>
                <hr />
                <section className="col negativeAlert px-0">
                    {alert ? (
                        <NegativeAlert
                            content={error}
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
                                name="emailId"
                                onChange={(e) => validateField(e)}
                            />
                        </div>
                    </div>
                    {OTPSent ?
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
                                    placeholder="Enter OTP Here"
                                    type="password"
                                    name="otp"
                                    onChange={(e) => validateField(e)}
                                />
                            </div>
                        </div>
                        : " "}
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-success btn-block"
                            onClick={() => validateEmail()}
                            disabled={buttonDisabled}
                        >
                            {spinner ? (
                                <>
                                    Validating...
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        variant="dark"
                                    />
                                </>
                            ) : (
                                    <>Submit</>
                                )}
                        </button>
                    </div>
                    <button className="btn btn-info btn-sm float-left" >
                        Sign In
                     </button>

                    <button
                        className="btn btn-info btn-sm float-right" onClick={()=>props.triggerSignup()}>
                        Sign Up
                    </button>
                </form>
            </article>
        </div>
    );
}

export default ForgetPassword;