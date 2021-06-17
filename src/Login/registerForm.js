import React, { useState } from 'react';
import NegativeAlert from '../Alerts/NegativeAlert';
import { LoginFetchData } from '../helpers/Fetch';
import { OverlayTrigger, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { route, FormRoute } from "../redux/actions";
import { emailToolTip, passwordToolTip, retypePassword } from "../Alerts/emailToolTip";

function RegisterUser() {
	const [emailError, setemailError] = useState(false);
	const [passwordError, setpasswordError] = useState(false);
	const [buttonDisabled, setbuttonDisabled] = useState(true);
	const [emailId, setemailId] = useState('');
	const [password, setpassword] = useState('');
	const [spinner, setspinner] = useState(false);
	const [alert, setalert] = useState('');
	const [emailStyle, setemailStyle] = useState({});
	const [passwordStyle, setpasswordStyle] = useState({});
	const [reTypePasswordError, setreTypePasswordError] = useState(false);
	const [reTypePasswordStyle, setreTypePasswordStyle] = useState({});

	const dispatch = useDispatch();

	const submitSignup = (e) => {
		e.preventDefault();
		let requestBody = {
			query: `
        mutation{
          registerUser(input:{emailId:"${emailId}",password:"${password}"}){
            token,
            tokenExpiration,
            userId
          }
        }
        `,
		};

		LoginFetchData(requestBody).then((response) => {
			{
				response == true ? dispatch(route('dashBoard')) : setspinner(false);
				setbuttonDisabled(false);
				response == false
					? setalert('server is down!. we are working on it. Please try after a minute.')
					: setalert(response);
			}
		});
	};

	const validateField = (e) => {
		e.preventDefault();
		let validation = e.target.value;
		let fieldName = e.target.name;

		switch (fieldName) {
			case 'email':
				if (validation.match(new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i))) {
					{
						!passwordError && password !== '' ? setbuttonDisabled(false) : setbuttonDisabled(true);
					}
					setemailError(false);
					setemailId(validation);
					setemailStyle({ border: '1px solid green' });
				} else {
					setemailError(true);
					setbuttonDisabled(true);
					setemailStyle({ border: '1px solid red' });
				}
				break;

			case 'password':
				if (
					validation.match(
						new RegExp(
							'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
						)
					)
				) {

					setpasswordError(false);
					setpassword(validation);
					setpasswordStyle({ border: '1px solid green' });
				} else {
					setpasswordError(true);
					setbuttonDisabled(true);
					setpasswordStyle({ border: '1px solid red' });
				}
				break;
			case 'retypePassword':
				if (
					validation.match(
						new RegExp(
							'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
						)
					)
					&& validation == password) {
					{
						!emailError && emailId !== '' && password != '' ? setbuttonDisabled(false) : setbuttonDisabled(true);
					}
					setreTypePasswordError(false);
					setpassword(validation);
					setreTypePasswordStyle({ border: '1px solid green' });
				} else {
					setreTypePasswordError(true);
					setbuttonDisabled(true);
					setreTypePasswordStyle({ border: '1px solid red' });
				}
			default:
				break;
		}
	};

	return (
		<div className="card">
			<article className="card-body">
				<h5 className="card-title text-dark text-center">Sign up</h5>
				<hr />
				<section className="col negativeAlert px-0">
					{alert.length > 0 ? <NegativeAlert content={alert} /> : ''}
				</section>
				<form>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									{' '}
									<i className="fa fa-envelope fa-xs"></i>{' '}
								</span>
							</div>
							<input
								style={emailStyle}
								className="form-control shadow-none"
								placeholder="EmailId"
								type="email"
								name="email"
								onChange={(event) => validateField(event)}
							/>
							{emailError ? (
								<OverlayTrigger
									placement="right"
									delay={{ show: 250, hide: 400 }}
									overlay={emailToolTip}
								>
									<i
										style={{ color: 'red' }}
										className="fa fa-info-circle fa-1x"
										variant="success"
									/>
								</OverlayTrigger>
							) : (
									' '
								)}
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									{' '}
									<i className="fa fa-key fa-xs"></i>{' '}
								</span>
							</div>
							<input
								style={passwordStyle}
								className="form-control shadow-none"
								placeholder="******"
								type="password"
								name="password"
								onChange={(event) => validateField(event)}
							/>
							{passwordError ? (
								<OverlayTrigger
									placement="right"
									delay={{ show: 250, hide: 400 }}
									overlay={passwordToolTip}
								>
									<i
										style={{ color: 'red' }}
										className="fa fa-info-circle "
										variant="success"
									/>
								</OverlayTrigger>
							) : (
									' '
								)}
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									{' '}
									<i className="fa fa-key fa-xs"></i>{' '}
								</span>
							</div>
							<input
								style={reTypePasswordStyle}
								className="form-control shadow-none"
								placeholder="re-type Password"
								type="password"
								name="retypePassword"
								onChange={(event) => validateField(event)}
							/>
							{reTypePasswordError ? (
								<OverlayTrigger
									placement="right"
									delay={{ show: 250, hide: 400 }}
									overlay={retypePassword}
								>
									<i
										style={{ color: 'red' }}
										className="fa fa-info-circle "
										variant="success"
									/>
								</OverlayTrigger>
							) : (
									' '
								)}
						</div>
					</div>

					<div className="form-group">
						<button
							type="submit"
							className="btn btn-success btn-block"
							onClick={(event) => submitSignup(event)}
							disabled={buttonDisabled}
						>
							{spinner ? (
								<>
									Registering...
												<Spinner animation="border" size="sm" role="status" variant="dark" />
								</>
							) : (
									<>Register</>
								)}
						</button>
					</div>
					<button
						className="btn btn-info btn-sm float-left"
						onClick={() => dispatch(FormRoute('resetpassword'))}
					>
						Forgot password?
								</button>

					<button
						className="btn btn-info btn-sm float-right"
						onClick={() => dispatch(FormRoute('login'))}
					>
						Login
								</button>
				</form>
			</article>
		</div>
	);
}
export default RegisterUser;
