import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Accordion, ListGroup } from 'react-bootstrap';
import "./Chat.css"

export default function Mail() {
    const [navigateMail, setnavigateMail] = useState(0);

    const mailData = {
        userId: "kjhsfkjhsdjf",
        inbox: [{
            name: "ashwin",
            date: "08-02-1988",
            content: "one",
            subject: "kjh",

        }, {
            name: "rishi",
            date: "08-02-1988",
            content: "two",
            subject: "kjh",
        },
        {
            name: "rishi",
            date: "08-02-1988",
            content: "three",
            subject: "kjh",
        }],
        sent: [
            {
                name: "alpha",
                date: "08-02-1988",
                content: "kjkjfjhlsidfkskfksdhflsdjkfkjsf",
                subject: "kjh",

            }, {
                name: "beta",
                date: "08-02-1988",
                content: "kjkjfjhlsidfkskfksdhflsdjkfkjsf",
                subject: "kjh",
            },
            {
                name: "gamma",
                date: "08-02-1988",
                content: "kjkjfjhlsidfkskfksdhflsdjkfkjsf",
                subject: "kjh",
            }
        ]
    }

    const displayData = (data) => {
        const mail = mailData[data];
        
        return (
            <ListGroup >
                {mail && mail.length !== (null || 0 || undefined) ?
                    <>
                        {mail.map((data, index) => {
                            return (
                                <ListGroup.Item variant="primary" className="mt-2" key={index}>
                                    <Accordion>
                                        <ul className="mail-data">
                                            <li>
                                                star
                                            </li>
                                            <li>
                                                icon
                                            </li>
                                            <li>
                                                {data.name}: {data.date}
                                            </li>
                                            <li>
                                                {data.subject}
                                            </li>
                                            <li className="float-right">
                                                <Accordion.Toggle className="arrow-down" eventKey="0">
                                                    <i className="fa fa-angle-down fa-2x" aria-hidden="true"></i>
                                                </Accordion.Toggle>
                                            </li>
                                        </ul>

                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>{data.content}</Card.Body>
                                        </Accordion.Collapse>
                                    </Accordion>
                                </ListGroup.Item>
                            )
                        })}
                    </>
                    : "No Mail Found"}
            </ListGroup>
        )
    }

    const navigateTypeOfMail = () => {
        switch (navigateMail) {
            case 0:
                return displayData("inbox")
            case 1:
                return displayData("starred")
            case 2:
                return displayData("sent")
            case 3:
                return displayData("social")
            default:
                break;
        }
    }

    return (
        <>
            <div className="mt-4">
                <Card body style={{ border: '1px gray', backgroundColor: "#0d1117" }}>
                    <Row>
                        <Col sm={2}>
                            <ul>
                                <Button variant="info" style={{ borderRadius: "5px" }} size="sm">
                                    <i className="fa fa-plus-circle" aria-hidden="true"></i> Compose
                             </Button>{' '}
                            </ul>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="formGridAddress1">
                                <Form.Control placeholder="1234 Main St" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <ul>
                                <li className={`mail-sidebar ${navigateMail === 0 ? 'active' : ''}`} onClick={() => setnavigateMail(0)}><i className="fa fa-inbox ml-1 mr-2" aria-hidden="true"></i> Inbox</li>
                                <li className={`mail-sidebar ${navigateMail === 1 ? 'active' : ''}`} onClick={() => setnavigateMail(1)}><i className="fa fa-flag ml-1 mr-2" aria-hidden="true"></i>Starred</li>
                                <li className={`mail-sidebar ${navigateMail === 2 ? 'active' : ''}`} onClick={() => setnavigateMail(2)}><i className="fa fa-paper-plane-o ml-1 mr-2" aria-hidden="true"></i>Sent</li>
                                <li className={`mail-sidebar ${navigateMail === 3 ? 'active' : ''}`} onClick={() => setnavigateMail(3)}><i className="fa fa-trash-o ml-1 mr-2" aria-hidden="true"></i>deleted</li>
                                <li className={`mail-sidebar ${navigateMail === 4 ? 'active' : ''}`} onClick={() => setnavigateMail(4)}><i className="fa fa-exclamation-circle ml-1 mr-2" aria-hidden="true"></i>Social</li>
                            </ul>
                        </Col>

                        <Col sm={10}>

                            {navigateTypeOfMail()}
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}


