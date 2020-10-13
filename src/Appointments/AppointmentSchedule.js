import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, InputGroup, Modal, Toast } from 'react-bootstrap';
import { hospitalLIst } from './HospitalList';

export default function AppointmentSchedule() {
	const [validated, setValidated] = useState(false);
	const [isSearched, setisSearched] = useState(false);
	const [hospitalList, sethospitalList] = useState({});
	const [isFormSelected, setisFormSelected] = useState(false);
	const [isAppointmentScheduled, setisAppointmentScheduled] = useState(false);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [state, setState] = useState({
		name: '',
		startDate: '',
		time: '',
		phoneNumber: '',
		description: '',
		dept: '',
	});

	const [hospitalDetails, sethospitalDetails] = useState({
		name: '',
		phoneNumber: '',
		description: '',
		location: '',
	});

	const onInputChange = (event) => {
		const { name, value } = event.target;

		setState({
			...state,
			[name]: value,
		});
	};

	const handleForm = (e) => {
		setisSearched(true);
		var name = e.target.value;
		switch (name) {
			case 'Alberta':
				sethospitalList(hospitalLIst.Alberta);
				break;
			case 'Manitoba':
				sethospitalList(hospitalLIst.Manitoba);
				break;
			case 'BritishColumbia':
				sethospitalList(hospitalLIst.BritishColumbia);
				break;
			case 'Ontario':
				sethospitalList(hospitalLIst.Ontario);
				break;
			case 'Quebec':
				sethospitalList(hospitalLIst.Quebec);
				break;
			case 'none':
				setisSearched(false);
				break;
			default:
				break;
		}
	};

	const displayAppointmentForm = (data) => {
		setisFormSelected(true);

		sethospitalDetails({
			name: data.name,
			description: data.description,
			phoneNumber: data.phoneNumber,
			location: data.location,
		});
	};

	const sendAppointmentDetails = () => {
		let requestBody = {
			query: `
			mutation{
				createAppointment(input:{
				  userId:"5f836ec7fdf4163744a70f1d",
				  name:"${state.name}",
				  startDate:"${state.startDate}",
				  time:"${state.time}",
				  phoneNumber:"${state.phoneNumber}",
				  description:"${state.description}",
				  hospital:{
					name:"${hospitalDetails.name}",
					description:"${hospitalDetails.description}",
					location:"${hospitalDetails.location}",
					phoneNumber:"${hospitalDetails.phoneNumber}"
				  }
				  dept:"${state.dept}"
				})
			  }

			`,
		};

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
				{
					responseJSON.data === true ? setisAppointmentScheduled(true) : setisAppointmentScheduled(false);
				}
			})
			.catch((error) => console.error('error in fetching todo:', error));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
			alert('insert data');
		}
		setValidated(true);
		handleShow();
	};

	return (
		<div className="container-fluid mt-4">
			<div className="row">
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure to confirm Appointment. <br />
						you can always modify appointments in the Appointments Section.
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button
							variant="primary"
							onClick={() => {
								handleClose();
								sendAppointmentDetails();
							}}
						>
							confirm Appointment
						</Button>
					</Modal.Footer>
				</Modal>
				<div className="col-lg-5 col-border">
					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Label>Select Your Province</Form.Label>
						<Form.Control sm={12} as="select" onChange={(e) => handleForm(e)}>
							<option value="none">none</option>
							<option value="BritishColumbia">British Columbia</option>
							<option value="Alberta">Alberta</option>
							<option value="Manitoba">Manitoba</option>
							<option value="Ontario">Ontario</option>
							<option value="Quebec">Quebec</option>
						</Form.Control>
					</Form.Group>
					{isSearched
						? hospitalList.map((data, index) => {
								return (
									<Card bg={'light'} className="mt-2 text-dark" key={index}>
										<Card.Header>
											<b>
												{index + 1}: {data.name}{' '}
											</b>{' '}
										</Card.Header>
										<Card.Body>
											<Card.Text>{data.description}</Card.Text>
										</Card.Body>
										<Card.Footer>
											<Row>
												<Col>
													<b>Location:</b> {data.location}
												</Col>
												<Col md={{ span: 4, offset: 4 }}>
													<b>Phone Number:</b> {data.phoneNumber}
												</Col>
											</Row>
										</Card.Footer>
										<Button variant="info" onClick={() => displayAppointmentForm(data)}>
											Schedule Appointment
										</Button>
									</Card>
								);
						  })
						: ''}
				</div>
				<div className="col-lg-5 col-border">
					<h4 className="text-center needs-validation"> Appointment Form: </h4>
					{isFormSelected ? (
						<div class="container" style={{ backgroundColor: 'cadetblue' }}>
							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group controlId="validationCustom01">
									<Form.Label> name:</Form.Label>
									<Form.Control
										sm={12}
										required
										type="text"
										placeholder=" name"
										name="name"
										onChange={(e) => onInputChange(e)}
									/>
									<Form.Control.Feedback>Enter your name please.</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustom02">
									<Form.Label>symptoms:</Form.Label>
									<Form.Control
										sm={12}
										required
										type="text"
										placeholder="Type your symtoms"
										name="description"
										onChange={(e) => onInputChange(e)}
									/>
									<Form.Control.Feedback>
										Please Enter your symptoms for priority Appointments.
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustomUsername">
									<Form.Label>Phone Number:</Form.Label>
									<InputGroup>
										<InputGroup.Prepend>
											<InputGroup.Text id="inputGroupPrepend">+1</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											type="tel"
											name="phoneNumber"
											placeholder="416-967-1111"
											aria-describedby="inputGroupPrepend"
											onChange={(e) => onInputChange(e)}
											required
										/>
										<Form.Control.Feedback type="invalid">
											Please enter your phone number
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>

								<Form.Group controlId="validationCustom03">
									<Form.Label>Date:</Form.Label>
									<Form.Control
										sm={12}
										type="date"
										name="startDate"
										min={new Date().toISOString().split('T')[0]}
										onChange={(e) => onInputChange(e)}
										placeholder="City"
										required
									/>
									<Form.Control.Feedback type="invalid">Please select a date</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustom04">
									{['radio'].map((type) => (
										<div key={`custom-inline-${type}`} className="mb-3">
											<Form.Label>Slot:</Form.Label>
											<br />
											<Form.Check
												custom
												inline
												label="09:00 AM"
												type={type}
												id={`custom-inline-${type}-1`}
												name="time"
												value="09:00 AM"
												onChange={(e) => onInputChange(e)}
											/>
											<Form.Check
												custom
												inline
												label="12:00 PM"
												type={type}
												id={`custom-inline-${type}-2`}
												name="time"
												value="12:00 PM"
												onChange={(e) => onInputChange(e)}
											/>
											<Form.Check
												custom
												inline
												label="3:00 PM"
												type={type}
												name="time"
												value="3:00 PM"
												onChange={(e) => onInputChange(e)}
												id={`custom-inline-${type}-3`}
											/>
										</div>
									))}
								</Form.Group>
								<Form.Group controlId="validationCustom05">
									<Form.Label>Dept of Visit</Form.Label>
									<Form.Control sm={12} as="select" name="dept" onChange={(e) => onInputChange(e)}>
										<option value="radiology">Radiology/X-ray/MRI</option>
										<option value="neurology">Neurology</option>
										<option value="gastroEntrology">GastroEntrology</option>
										<option value="Dermatology">Dermatology</option>
										<option value="Dental">Dental</option>
										<option value="General">General</option>
									</Form.Control>
									<Form.Control.Feedback type="invalid">Please select a dept</Form.Control.Feedback>
								</Form.Group>
								<Button className="mb-2 mr-autro" type="submit">
									Submit form
								</Button>
							</Form>
						</div>
					) : (
						' '
					)}
				</div>
				<div className="col-lg-3 col-border">
					{isAppointmentScheduled ? (
						<Toast>
							<Toast.Header>
								<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
								<strong className="mr-auto">Appointment 1</strong>
								<small>{hospitalDetails.name}</small>
							</Toast.Header>
							<Toast.Body>{hospitalDetails.location}</Toast.Body>
							<Toast.Body>{hospitalDetails.phoneNumber}</Toast.Body>
						</Toast>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
}
