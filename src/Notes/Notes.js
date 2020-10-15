import React, { useState } from "react"
import { Row, Col, Card, Container, Toast } from "react-bootstrap"
export default function Notes() {

    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);

    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);

    return (
        <Container className="mt-4">
            <Card body style={{ boxShadow: "1px 1px 1px 1px grey", border: "1px gray" }}>

                <Row>
                    <Col className="col-border" md={3}>
                        <Row>
                            <Col className="mt-2 text-info">
                                <h4><i class="fa fa-sticky-note"></i>Notes</h4>
                            </Col>
                        </Row>
                        <Row className="ml border-bottom mt-2">

                        </Row>
                        <Row>
                            <form class="form-inline input-wrapper mt-3 ml-2"><input class="form-control input-wrapper" placeholder="Search Images" aria-label="Search" />
                            </form>
                            <div className="mt-4 ml-2 mr-2 scroll-auto">
                                <Toast show={showA} onClose={toggleShowA}>
                                    <Toast.Header>
                                        <strong className="mr-auto">Bootstrap</strong>
                                        <small>11 mins ago</small>
                                    </Toast.Header>
                                    <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                                </Toast>
                                <Toast>
                                    <Toast.Header>
                                        <strong className="mr-auto">Bootstrap</strong>
                                        <small>11 mins ago</small>
                                    </Toast.Header>
                                    <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                                </Toast>
                                <Toast>
                                    <Toast.Header>
                                        <strong className="mr-auto">Bootstrap</strong>
                                        <small>11 mins ago</small>
                                    </Toast.Header>
                                    <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                                </Toast>
                                <Toast>
                                    <Toast.Header>
                                        <strong className="mr-auto">Bootstrap</strong>
                                        <small>11 mins ago</small>
                                    </Toast.Header>
                                    <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                                </Toast>
                                <Toast>
                                    <Toast.Header>
                                        <strong className="mr-auto">Bootstrap</strong>
                                        <small>11 mins ago</small>
                                    </Toast.Header>
                                    <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                                </Toast>
                            </div>
                        </Row>
                    </Col>

                    <Col md={9}>
                        <Row>
                            <Col className="mt-3 border-bottom">
                                <h4><i class="fa fa-sticky-note"></i>Notes</h4>
                            </Col>
                        </Row>
                        <Row className="ml-4 mt-4">
                            <div>
                                <textarea style={{ backgroundColor: "lightpink" }} rows="17" cols="90" name="textarea" placeholder="type your notes here" class="form-control">
                                </textarea>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}