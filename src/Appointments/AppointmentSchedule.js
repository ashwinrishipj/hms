import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, InputGroup, Modal, Toast,Breadcrumb } from 'react-bootstrap';
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
				setisFormSelected(false);
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
		var referenceId = JSON.parse(localStorage.getItem("userToken"));
		referenceId = referenceId.validateUser.userId;
		
		let requestBody = {
			query: `
			mutation{
				createAppointment(input:{
				  userId:"${referenceId}",
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
					if (responseJSON.data.createAppointment === true){
						setisAppointmentScheduled(true);
						setisFormSelected(false);
					
					}else{
						setisAppointmentScheduled(false);
					}	
				}
			})
			.catch(err => console.error('error in fetching todo:', err));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
			alert('insert data');
		} else {
			setValidated(true);
			handleShow();
		}
	};

	return (
		<>
		 <Breadcrumb>
        <Breadcrumb.Item active>Appointment Scheduler</Breadcrumb.Item>
    </Breadcrumb>
		<div className="container-fluid mt-4">
			<div className="row">
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						
					</Modal.Header>
					<Modal.Body>
						Are you sure to confirm Appointment. <br />
						you can't  modify appointments once submitted. 
						<br/>
						Only Hospitals can edit/modify/delete appointments.
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

				<div className="col-lg-4 col-border">
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
					<div className="scroll-auto">
						{isSearched ? (
							hospitalList.map((data, index) => {
								return (
									<Card bg={'light'} className="mt-2 text-dark " key={index}>
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
						) : (
								<div className="col col-md-6">
									<Card className="rounded-border" style={{ width: '18rem'}}>
										<li className="media">
											<img src={require('./images/province/BC.png')} width="50" height="60" className="mr-3 " alt="..." />
											<div className="media-body">
												<h5 className="mt-0 mb-1">British Coloumbia: </h5>
												<li>Physician services</li>
												<li>Medically necessary eye exams</li>
												<li>Diagnostic services</li>
												<li>Supplemental insurance is strongly recommended</li>
												<li>Some orthodontic services</li>
												<Button variant="outline-warning" href="http://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/benefits/services-covered-by-msp" target="_blank">Know More...</Button>
											</div>
										</li>

									</Card>
									<Card className="rounded-border mt-2" style={{ width: '18rem' }}>
										<li className="media">
											<img src={require('./images/province/Alberta.png')} width="50" height="60" className="mr-3 " alt="..." />
											<div className="media-body">
												<h5 className="mt-0 mb-1">Alberta: </h5>
												<li>Physician services, hospital services, surgery</li>
												<li>Standard ward hospitalization and drugs administered in a hospital</li>
												<li>Psychiatric visits.</li>
												<li>Oral surgery in hospital</li>
												<li>Podiatry is eligible to an extent</li>

												<Button variant="outline-warning" href="https://www.alberta.ca/ahcip-what-is-covered.aspx" target="_blank">Know More...</Button>
											</div>
										</li>
									</Card>
									<Card className="rounded-border mt-2" style={{ width: '18rem' }}>
										<li className="media">
											<img src={require('./images/province/Manitoba.jpg')} width="50" height="60" className="mr-3 " alt="..." />
											<div className="media-body">
												<h5 className="mt-0 mb-1">Manitoba: </h5>
												<li>Physician services, surgery / anaesthesia, x-ray and laboratory services are covered</li>
												<li>Dental surgery is reimbursed when hospitalization is required</li>
												<li>Ambulance fees are covered</li>
												<li>Chiropractic care is eligible up to seven visits per calendar year</li>
												<li>Supplemental insurance is strongly recommended</li>

												<Button variant="outline-warning" href="https://www.gov.mb.ca/health/mhsip/index.html" target="_blank">Know More...</Button>
											</div>
										</li>
									</Card>
									<Card className="rounded-border mt-2" style={{ width: '18rem' }}>
										<li className="media">
											<img src={require('./images/province/ontario.jpeg')} width="50" height="60" className="mr-3 " alt="..." />
											<div className="media-body">
												<h5 className="mt-0 mb-1">Ontario: </h5>
												<li>Doctor visits, including those at walk-in clinics</li>
												<li> Dental surgery when performed in hospital</li>
												<li>Prescription drugs: coverage is available for people up to age 25. There is a senior drug  for seniors over age 64</li>
												<li>Ambulance services are covered to an extent, </li>
												<li>Supplemental insurance is strongly recommended</li>

												<Button variant="outline-warning" href="https://www.ontario.ca/page/what-ohip-covers" target="_blank">Know More...</Button>
											</div>
										</li>
									</Card>
									<Card className="rounded-border mt-2" style={{ width: '18rem' }}>
										<li className="media">
											<img src={require('./images/province/Quebec.png')} width="50" height="60" className="mr-3 " alt="..." />
											<div className="media-body">
												<h5 className="mt-0 mb-1">Quebec: </h5>
												<li>General practitioner and specialist physician services only by those who have not withdrawn from RAMQ</li>
												<li>Cortisone, eye drops</li>
												<li>Medical procedures (e.g. surgery) and anesthetics</li>
												<li>Urine and glycemia tests</li>
												<li>Supplemental Insurance is strongly recommended</li>

												<Button variant="outline-warning" href="http://www.ramq.gouv.qc.ca/en/citizens/health-insurance/covered-services/Pages/covered-services-accessory-costs.aspx" target="_blank">Know More...</Button>
											</div>
										</li>
									</Card>
								</div>
							)}
					</div>
				</div>
				<div className="col-lg-5 col-border">
					{isFormSelected ? (
						<div className="container" style={{ backgroundColor: 'cadetblue' }}>
							<h4 className="text-center needs-validation"> Appointment Form: </h4>
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
								<Button className="mb-2" type="submit">
									Submit form
								</Button>
							</Form>
						</div>
					) : (
							<div>
								<Form.Label>List of departments:</Form.Label>
								<ul className="list-unstyled scroll-auto mt-3">
									<Card className="rounded-border" style={{ width: '25rem' }}>
										<li className="media">
											<img src={require('./images/opd.png')} width="50" height="60" className="mr-3 " alt="..." />
											<div className="media-body">
												<h5 className="mt-0 mb-1">Outpatient Clinic</h5>
												An outpatient department or outpatient clinic is the part of a hospital designed for the treatment of outpatients, people with health problems who visit the hospital for diagnosis or treatment, but do not at this time require a bed or to be admitted for overnight care.
											</div>
										</li>
									</Card>
									<Card className="mt-2 rounded-border" style={{ width: '25rem' }}>
										<li className="media">
											<img src={require('./images/Gastroenterology.png')} width="50" height="60" className="mr-3" alt="..." />
											<div className="media-body">
												<h5 className="mt-0 mb-1">GastroEntrology</h5>
												Gastroenterology is the branch of medicine focused on the digestive system and its disorders. Diseases affecting the gastrointestinal tract, which include the organs from mouth into anus, along the alimentary canal, are the focus of this speciality.
							 				</div>
										</li>
									</Card>
									<Card className="mt-2 rounded-border" style={{ width: '25rem' }}>
										<li className="media">
											<img src={require('./images/neurology.png')} width="50" height="60" className="mr-3" alt="..." />
											<div className="media-body">
												<h5 className="mt-0 mb-1">Neurology</h5>
												Neurology is a branch of medicine dealing with disorders of the nervous system. Neurology deals with the diagnosis and treatment of all categories of conditions and disease involving the central and peripheral nervous systems, including their coverings, blood vessels, and all effector tissue, such as muscle.
												</div>
										</li>
									</Card>
									<Card className="mt-2 rounded-border" style={{ width: '25rem' }}>
										<li className="media">
											<img src={require('./images/ENT.png')} width="50" height="60" className="mr-3" alt="..." />
											<div className="media-body">
												<h5 className="mt-0 mb-1">ENT Department</h5>
												Otorhinolaryngology is a surgical subspecialty within medicine that deals with the surgical and medical management of conditions of the head and neck. Doctors who specialize in this area are called otorhinolaryngologists, otolaryngologists, head and neck surgeons, or ENT surgeons or physicians.
							 				</div>
										</li>
									</Card>
									<Card className="mt-2 rounded-border" style={{ width: '25rem' }}>
										<li className="media">
											<img src={require('./images/Onco.jpg')} width="50" height="60" className="mr-3" alt="..." />
											<div className="media-body">
												<h5 className="mt-0 mb-1">Oncology</h5>
							Oncology is a branch of medicine that deals with the prevention, diagnosis, and treatment of cancer. A medical professional who practices oncology is an oncologist. The name's etymological origin is the Greek word ὄγκος, meaning 1. "burden, volume, mass" and 2. "barb", and the Greek word λόγος, meaning "study".
							</div>
										</li>
									</Card>
								</ul>
							</div>
						)}
				</div>

				<div className="col-lg-3 col-border">
				<Form.Label>Last Scheduled appointments in this session:</Form.Label>
					{isAppointmentScheduled ? (
						<div >
							<Toast style={{ backgroundColor: "lightpink" }}>
								<Toast.Header>
									<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
									<strong className="mr-auto">{hospitalDetails.name} </strong>
								</Toast.Header>
								<Toast.Body>{hospitalDetails.location}</Toast.Body>
								<Toast.Body>{hospitalDetails.phoneNumber}</Toast.Body>
							</Toast>
						</div>
					) : (
						<div >
							<Toast style={{ backgroundColor: "lightpink" }}>
								<Toast.Body>No appointment Booked!. please Schedule an appointment</Toast.Body>
							</Toast>
						</div>	
						)}
				</div>
			</div>
		</div>
		</>
	);
}
