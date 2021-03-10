import React, { useState } from 'react';
import { Modal, Row, Col, Card, Container, Toast, Button, Form } from 'react-bootstrap';

export default function Chat() {
    const [show, setshow] = useState(false);
    const [toastContent, settoastContent] = useState('');

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
                                        <Card.Header>Featured</Card.Header>
                                        <Card.Body>
                                            <Card.Title>Special title treatment</Card.Title>
                                            <Card.Text>
                                                With supporting text below as a natural lead-in to additional content.
                                            </Card.Text>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                        <Card.Footer className="text-muted"><Form inline>
                                            <Form.Group>
                                                <Form.Label htmlFor="inputPassword6">Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    className="mx-sm-3"
                                                    id="inputPassword6"
                                                    aria-describedby="passwordHelpInline"
                                                />
                                                <Form.Text id="passwordHelpInline" muted>
                                                    Must be 8-20 characters long.
											</Form.Text>
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
