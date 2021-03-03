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
			
			<Container>
				<Row>
					<Col lg={3} style={{ borderRight: '1px solid red' }}>
						<h5 className="text-primary"> Appointment Lists:</h5>
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
								<h5 className="subtitle text-info">Patient Information</h5>{' '}
								<table className="table table-simple">
									{' '}
									<tbody>
										{' '}
										<tr>
											{' '}
											<td className="text-info">Appointment Id:</td>
											<th className="text-white">

												{modifyAppointmentDetails._id}

											</th>{' '}
										</tr>
										<tr>
											{' '}
											<td  className="text-info">Patient Name:</td>
											<th className="text-white">
												{modifyAppointmentDetails.name}

											</th>{' '}
										</tr>
										<tr>
											{' '}
											<td  className="text-info"> Date Of Appointment:</td>
											<th className="text-white">{modifyAppointmentDetails.startDate}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td  className="text-info"> Time:</td>
											<th className="text-white">{modifyAppointmentDetails.time}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td  className="text-info">Title:</td>
											<th className="text-white">{modifyAppointmentDetails.title}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td  className="text-info">Patient Symptoms:</td>
											<th className="text-white">{modifyAppointmentDetails.description}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td  className="text-info">Department of Visit:</td>
											<th className="text-white">{modifyAppointmentDetails.dept}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td  className="text-info">Status of Appointment:</td>
											<th className="text-warning">{modifyAppointmentDetails.status}</th>{' '}
										</tr>
									</tbody>{' '}
								</table>{' '}
							</div>
							<div className="col-md-4">
								{' '}
								<h4 className="subtitle text-info">Hospial Information</h4>{' '}
								<table className="table table-simple">
									{' '}
									<tbody>
										{' '}
										<tr>
											{' '}
											<td  className="text-info">Hospital Name:</td>
											<th className="text-white">{modifyAppointmentDetails.hospital.name}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td  className="text-info">Hospital Description:</td>
											<th className="text-white">{modifyAppointmentDetails.hospital.description}</th>{' '}
										</tr>
										<tr>
											{' '}
											<td  className="text-info">Hospitak Location:</td>
											<th className="text-white">{modifyAppointmentDetails.hospital.location}</th>{' '}
										</tr>

										<tr>
											{' '}
											<td  className="text-info">Hospital phoneNumber:</td>
											<th className="text-white">{modifyAppointmentDetails.hospital.phoneNumber}</th>{' '}
										</tr>


									</tbody>{' '}
								</table>{' '}
								<Button variant="outline-info ml-2" style={{ width: "35%" }} onClick={() => setisModifyAppointment(false)}>Okay </Button>
							</div>
						</>
					) : (
							<>
								<div>
									
									<Toast variant={"light"}>
										<Toast.Body>Click on the Appointment list to view the description</Toast.Body>
									</Toast>
									
									<Col>
									<div className="embed-responsive embed-responsive-16by9 mt-4">
										<iframe className="embed-responsive-item"
										width="890" height="515"
										
										src="https://youtube.com/embed/fp6UZ_I4zj0" frameborder="0" allowfullscreen></iframe>
									</div>
									</Col>
								</div>
							</>

						)}

				</Row>
			</Container>
		</>
	);
}
export default AppointmentLists;
