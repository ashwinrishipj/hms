import React, { useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import { CardColumns, Card, Form, Button, InputGroup, Accordion } from 'react-bootstrap';
import { doctorsList } from './HospitalList';

export default function ScheduleDoctorAppointment() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [doctorShow, setdoctorShow] = useState(false);
    const [doctorData, setdoctorData] = useState('');

    const [state, setState] = useState({
        name: '',
        startDate: '',
        time: '',
        phoneNumber: '',
        description: '',
        dept: '',
    });

    const onInputChange = (event) => {
        const { name, value } = event.target;

        setState({
            ...state,
            [name]: value,
        });
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
    
    const confirmAppointment = () => {
        return (
            <>
                <Modal show={true} onHide={handleClose}>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        Are you sure to confirm Appointment. <br />
                you can't  modify appointments once submitted.
                <br />
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
                                // sendAppointmentDetails();
                            }}
                        >
                            confirm Appointment
                </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    const getDoctorAppointment = (data) => {
        setdoctorShow(true);
        setdoctorData(data);
    }

    return (
        <div>
            {show? confirmAppointment() :""}
            {doctorShow ? <>
                <Modal
                    show={true}
                    onHide={() => setdoctorShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Doctor Details
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                        type="number"
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
                                        {doctorData.slots.map((slots, index) => {
                                            return (
                                                <Form.Check
                                                    custom
                                                    inline
                                                    key={index}
                                                    label={slots}
                                                    type={type}
                                                    id={`custom-inline-${type}-${index}`}
                                                    name="time"
                                                    value={slots}
                                                    onChange={(e) => onInputChange(e)}
                                                />
                                            )
                                        })}
                                    </div>
                                ))}
                            </Form.Group>
                       
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        click to know about doctor details
                             </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        Name: {doctorData.name}
                                        qualification: {doctorData.qualification}
                                        experience: {doctorData.experience}
                                        working-On: {doctorData.hospitalName}
                                        description: {doctorData.description}
                                        contact-form: {doctorData.email}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <Button variant="warning" type="submit" onClick={()=> confirmAppointment()}>Confirm Appointment </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </> : ""}
            <CardColumns>
                {doctorsList.map((data, index) => {
                    return (
                        <Card text={"white"}
                            className="mt-4 text-light rounded-border"
                            key={index} >
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>{data.name}</Card.Title>
                                <Card.Text>
                                    {data.description}
                                </Card.Text>
                                <Button variant="outline-warning" onClick={() => getDoctorAppointment(data)}>Book Now <i className='fa fa-angle-double-right'></i> </Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-white">Experience: <span className="text-success"> {data.experience} years </span> <br />TotalPatientsCount:<span className="text-success"> {data.patientsCount}</span></small>
                            </Card.Footer>
                        </Card>
                    )
                })}
            </CardColumns>
        </div>
    )
}