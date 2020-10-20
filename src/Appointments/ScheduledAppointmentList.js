import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Toast, Breadcrumb, Button } from 'react-bootstrap';
import { FetchData } from '../helpers/Fetch';

function AppointmentLists() {
	const [appointmentDetails, setappointmentDetails] = useState([]);
	const [isAppointmentSet, setisAppointmentSet] = useState(false);
	const [isModifyAppointment, setisModifyAppointment] = useState(false);
	const [modifyAppointmentDetails, setmodifyAppointmentDetails] = useState();

	useEffect(() => {
		var referenceId = JSON.parse(localStorage.getItem("userToken"));
		referenceId = referenceId.validateUser.userId;

		let requestBody = {
			query: `
            query{
                getAppointmentDetails(userId:"${referenceId}"){
                  userId,
                  appointments{
                    _id,
                    startDate,
                    name,
                    time,
                    title,
                    description,
                    hospital{
                      name,
                      description,
                      location,
                      phoneNumber
                    }
                    dept,
                    status
                  }
                }
              }
              `,
		};

		FetchData(requestBody)
			.then((Response) => {
				setappointmentDetails(Response.data.getAppointmentDetails);
				setisAppointmentSet(true);
			})
			.catch((err) => console.log(err));
	}, []);

	const ModifyAppointment = (data) => {
		setisModifyAppointment(true);
		setmodifyAppointmentDetails(data);
	};

	return (
		<>

			<Breadcrumb>
				<Breadcrumb.Item active>History of appointments</Breadcrumb.Item>
			</Breadcrumb>
			<Container>
				<Row>
					<Col lg={3} style={{ borderRight: '1px solid red', height: '100vh' }}>
						<h4> Appointment Lists:</h4>
						<ul className="list-unstyled scroll-auto mt-3">
							{isAppointmentSet ? (
								appointmentDetails.appointments.map((data, key) => {
									return (
										<Toast
											
											className="scheduledToast"
											onClick={() => ModifyAppointment(data)}
											key={key}
										>
											<Toast.Header closeButton={false}>
												<strong className="mr-auto">{data.name} </strong>
											</Toast.Header>
											<Toast.Body>{data.hospital.name}</Toast.Body>
											<Toast.Body>{data.hospital.phoneNumber}</Toast.Body>
										</Toast>
									);
								})
							) : (
									<div>
										<Toast style={{ backgroundColor: '#17a2b8' }}>
											<Toast.Body>No appointment Booked!. please Schedule an appointment</Toast.Body>
										</Toast>
									</div>
								)}
						</ul>
					</Col>
					{isModifyAppointment ? (
						<>
							<div className="col-lg-5">
								{' '}
								<h4 className="subtitle">Patient Information</h4>{' '}
								<table className="table table-simple">
									{' '}
									<tbody>
										{' '}
										<tr>
											{' '}
											<td>Appointment Id:</td>
											<th className="text-info">

												{modifyAppointmentDetails._id}

											</th>{' '}
										</tr>
										<tr>
											{' '}
											<td>Patient Name:</td>
											<th className="text-info">
												{modifyAppointmentDetails.name}

											</th>{' '}
										</tr>
										<tr>
											{' '}
											<td>Date Of Appointment:</td>
											<th>{modifyAppointmentDetails.startDate}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td>Time:</td>
											<th>{modifyAppointmentDetails.time}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td>Title:</td>
											<th>{modifyAppointmentDetails.title}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td>Patient Symptoms:</td>
											<th>{modifyAppointmentDetails.description}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td>Department of Visit:</td>
											<th>{modifyAppointmentDetails.dept}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td>Status of Appointment:</td>
											<th className="text-warning">{modifyAppointmentDetails.status}</th>{' '}
										</tr>
									</tbody>{' '}
								</table>{' '}
							</div>
							<div className="col-md-4">
								{' '}
								<h4 className="subtitle">Hospial Information</h4>{' '}
								<table className="table table-simple">
									{' '}
									<tbody>
										{' '}
										<tr>
											{' '}
											<td>Hospital Name:</td>
											<th className="text-info">{modifyAppointmentDetails.hospital.name}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td>Hospital Description:</td>
											<th>{modifyAppointmentDetails.hospital.description}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td>Hospitak Location:</td>
											<th>{modifyAppointmentDetails.hospital.location}</th>{' '}
										</tr>

										<tr>
											{' '}
											<td>Hospital phoneNumber:</td>
											<th className="text-info">{modifyAppointmentDetails.hospital.phoneNumber}</th>{' '}
										</tr>


									</tbody>{' '}
								</table>{' '}
								<Button variant="outline-info ml-2" style={{ width: "35%" }} onClick={() => setisModifyAppointment(false)}>Okay </Button>
							</div>
						</>
					) : (
							<div>
								<Toast variant={"light"}>
									<Toast.Body>Click on the Appointment list to view the description</Toast.Body>
								</Toast>
							</div>
						)}

				</Row>
			</Container>
		</>
	);
}
export default AppointmentLists;
