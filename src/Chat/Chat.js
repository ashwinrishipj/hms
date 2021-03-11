import React, { useState } from 'react';
import { Modal, Row, Col, Card, Container, Toast, Button, Form, Popover } from 'react-bootstrap';

export default function Chat() {
    const [show, setshow] = useState(false);
    const [toastContent, settoastContent] = useState('');
    const [message, setmessage] = useState("")
    const [userMessage, setuserMessage] = useState([]);
    const [disableButton, setdisableButton] = useState(true);

    const updateMessage = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setmessage(value);
        setdisableButton(false);
    }

    const sendMessage = (event) => {
        event.preventDefault();
        setuserMessage(userMessage => [...userMessage, message]);
        setmessage("");
        setdisableButton(true);
    }

    return (
        <Container fluid className="mt-4">
            {show ? (
                <Modal show={show} onHide={() => setshow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Date Created On</Modal.Title>
                    </Modal.Header>
                    <Modal.Body></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setshow(false)}>
                            close
						</Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                ''
            )}

            <Card body style={{ boxShadow: '1px 1px 1px 1px grey', border: '1px gray' }}>
                <Row>
                    <Col className="col-border" md={3}>
                        <Row>
                            <Col className="mt-2 text-info">
                                <h4>
                                    <i className="fa fa-sticky-note"></i>Chat
								</h4>
                            </Col>
                        </Row>
                        <Row className="ml border-bottom mt-2"></Row>
                        <Row>
                            <form className="form-inline input-wrapper mt-3 ml-2">
                                <input
                                    className="form-control input-wrapper"
                                    placeholder="Search Images"
                                    aria-label="Search"
                                />
                            </form>

                            <div className="mt-4 scroll-auto toast-onclick">
                                {toastContent.length !== 0 || null ? (
                                    <>
                                        {toastContent.map((data, index) => {
                                            return (
                                                <>
                                                    <Toast key={index}>
                                                        <Toast.Header closeButton={false}>
                                                            <strong className="mr-auto"> {index + 1}</strong>
                                                            <small> {data.date}</small>
                                                        </Toast.Header>
                                                        <Toast.Body>
                                                            {data.notesContent.slice(0, 100)} <br /> <br />{' '}
                                                            <strong>Click to know more... </strong>
                                                        </Toast.Body>
                                                    </Toast>
                                                </>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <Toast variant={'warning'}>
                                        <Toast.Header closeButton={false}>
                                            <strong className="mr-auto">Not found</strong>
                                            <small>10 sec ago</small>
                                        </Toast.Header>
                                        <Toast.Body>No notes has been created!. Create one.</Toast.Body>
                                    </Toast>
                                )}
                            </div>
                        </Row>
                    </Col>

                    <Col md={9}>
                        {/* <Row>
                    <Col className="mt-3 border-bottom ">
                        <p>clock: <span className="text-danger">{date} </span> </p>
                    </Col>
                </Row> */}

                        <Row className="ml-4 mt-4">

                            <Card className="text-center">
                                <Card.Header>Communicate with the doctor</Card.Header>
                                <Card.Body>
                                    {userMessage.length !== 0 || null ? (
                                        <>
                                            {userMessage.map((data, index) => {
                                                return (
                                                    <>
                                                        <div
                                                            aria-live="polite"
                                                            aria-atomic="true"
                                                            style={{
                                                                position: 'relative',
                                                                minHeight: '50px',
                                                                minWidth: '100px',
                                                            }}
                                                        >
                                                            <Toast style={{
                                                                position: 'absolute',
                                                                left: 0,
                                                            }} key={index}>
                                                                <Toast.Body>
                                                                    {data}
                                                                </Toast.Body>
                                                            </Toast>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </>
                                    ) : ""
                                    }
                                </Card.Body>
                                <Card.Footer className="text-muted"><Form inline>
                                    <Form.Group onSubmit={(event) => event.preventDefault()}>
                                        <Form.Label htmlFor="inputPassword6">Enter your message</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="mx-sm-3"
                                            id="inputPassword6"
                                            aria-describedby="passwordHelpInline"
                                            value={message}
                                            required
                                            aria-required
                                            onChange={(event) => updateMessage(event)}
                                            onKeyPress={(e) => { e.key === 'Enter' && sendMessage(e) }}
                                        />
                                        <Button variant="primary" disabled={disableButton} onClick={(event) => sendMessage(event)}>
                                            Send
                                    </Button>
                                    </Form.Group>
                                </Form></Card.Footer>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}
