import React, { useState, useEffect } from "react"
import { Container, Row, Col, Toast, Breadcrumb } from "react-bootstrap"
import { FetchData } from "../helpers/Fetch";

function AppointmentLists() {

    const [appointmentDetails, setappointmentDetails] = useState();
    const [isAppointmentSet, setisAppointmentSet] = useState(false);

    useEffect(() => {

        let requestBody = {
            query: `
            query{
                getAppointmentDetails(userId:"5e9df7a7327a33165026b98f"){
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
        }

        FetchData(requestBody)
            .then(Response => {
                setappointmentDetails(Response.data.getAppointmentDetails.appointments);
                setisAppointmentSet(true);
            })
            .catch(err => console.log(err));

    }, [])

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item active>History of appointments</Breadcrumb.Item>
            </Breadcrumb>
            <Container >
                <Row>

                    <Col lg={4} style={{ borderRight: "1px solid red", height: "100vh" }}>
                        <h4> Appointment Lists:</h4>
                        <ul className="list-unstyled scroll-auto mt-3">
                            {isAppointmentSet ?
                                appointmentDetails.map((data, key) => {
                                    return (
                                        <div >
                                            <Toast style={{ backgroundColor: "lightpink" }}>
                                                <Toast.Header>
                                                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                                    <strong className="mr-auto">{appointmentDetails.name} </strong>
                                                </Toast.Header>
                                                <Toast.Body>{appointmentDetails.hospital.name}</Toast.Body>
                                                <Toast.Body>{appointmentDetails.hospital.phoneNumber}</Toast.Body>
                                            </Toast>
                                        </div>
                                    )
                                })
                                :
                                <div >
                                    <Toast style={{ backgroundColor: "lightpink" }}>
                                        <Toast.Body>No appointment Booked!. please Schedule an appointment</Toast.Body>
                                    </Toast>
                                </div>
                            }
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AppointmentLists;