import React from "react";
import { Row, Col, Card, ListGroup, Tab, Container, Accordion, Button } from 'react-bootstrap';

export default function Mail() {

    return (
        <>
            <Container fluid className="mt-4">
                <Card body style={{ border: '1px gray', backgroundColor: "light" }}>
                    <Row>
                        lore
                </Row>

                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                        <Row>
                            <Col sm={4}>
                                <ListGroup>
                                    <ListGroup.Item action href="#link1">
                                        Link 1
                                </ListGroup.Item>
                                    <ListGroup.Item action href="#link2">
                                        Link 2
                                </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col sm={8}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="#link1">
                                        <p>hdsfhsd</p>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#link2">
                                        <p>hello world </p>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card>
            </Container>
        </>
    )
}


