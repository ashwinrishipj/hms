import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Accordion, ListGroup, Modal } from 'react-bootstrap';
import "./Chat.css"

export default function Mail() {
    const [navigateMail, setnavigateMail] = useState(0);
    const [searchData, setsearchData] = useState("");
    const [show, setShow] = useState(false);
    const [search, setsearch] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [mailData, setmailData] = useState({
        userId: "kjhsfkjhsdjf",
        inbox: [{
            id: "one",
            name: "ashwin",
            date: "08-02-1988",
            content: "one",
            subject: "kjh",
        }, {
            id: "two",
            name: "rishi",
            date: "08-02-1988",
            content: "two",
            subject: "kjh",
        },
        {
            id: "three",
            name: "rishi",
            date: "08-02-1988",
            content: "three",
            subject: "kjh",
        }],
        sent: [
            {
                id: "four",
                name: "alpha",
                date: "08-02-1988",
                content: "kjkjfjhlsidfkskfksdhflsdjkfkjsf",
                subject: "kjh",

            }, {
                id: "five",
                name: "beta",
                date: "08-02-1988",
                content: "kjkjfjhlsidfkskfksdhflsdjkfkjsf",
                subject: "kjh",
            },
            {
                id: "six",
                name: "gamma",
                date: "08-02-1988",
                content: "kjkjfjhlsidfkskfksdhflsdjkfkjsf",
                subject: "kjh",
            }
        ],
        starred: [],
        deleted: []
    }
    )

    const updateSearchData = (e) => {
        e.preventDefault();

        if (e.target.value !== "" ) {
            setsearchData(e.target.value);
            setsearch(true);
        }else{
            setsearchData("");
            setsearch(false);
        }
    }

    const handleMail = () =>{

    }
    const composeMail = () => {
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Compose Mail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" name="mailAddress" required placeholder="To: name" />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control size="sm" name="mailSubject" required type="text" placeholder="Subject: " />
                                <Form.Control.Feedback type="invalid">
                                    subject is mandatory
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control required as="textarea" name="mailContent" rows={3} />
                            </Form.Group>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button className="ml-4" type="submit" variant="primary" onClick={handleMail}>
                                Send Mail
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

    const updateMail = (from, to, data) => {
        var newMailData = mailData;
        const index = newMailData[from].findIndex(x => x.id === data.id);
        if (index !== undefined) {
            newMailData[from].splice(index, 1);
            newMailData[to].push(data);
            console.log("newmailData", newMailData)
            setmailData({ ...mailData, newMailData });
        }
    }

    const displayList = (data, index, type ,searchData="") => {
        return (
            <li style={{ listStyleType: "none" }} className="mt-4 bg-info" key={index}>
                <Accordion className="mt-3">
                    <ul className="mail-data">
                        <li>
                            < >
                                {type === "starred" ? <i className="fa fa-star fa-1x arrow-down" aria-hidden="true" ></i>
                                    : <i onClick={() => updateMail(type, "starred", data)} className="fa fa-star-o fa-1x arrow-down" aria-hidden="true"></i>}
                            </>
                        </li>
                        <li>
                            icon
                        </li>
                        <li>
                            {data.name}: {data.date}
                        </li>
                        <li className= { `${searchData === "" ? '' :'text-warning'}`}>
                            {data.subject}
                        </li>
                        <li className="float-right">
                            <Accordion.Toggle className="arrow-down" eventKey="0">
                                <i className="fa fa-angle-down fa-2x" aria-hidden="true"></i>
                            </Accordion.Toggle>
                        </li>
                    </ul>

                    <Accordion.Collapse eventKey="0">
                        <Card.Body >
                            {data.content} {type !== "deleted" ? <i className="float-right fa fa-trash fa-2x arrow-down" onClick={() => updateMail(type, "deleted", data)} aria-hidden="true"></i> : ""} </Card.Body>
                    </Accordion.Collapse>
                </Accordion>
            </li>
        )
    }

    const displayData = (type) => {
        const mail = mailData[type];

        return (
            <ListGroup >
                {mail && mail.length !== (0 || null || undefined) ?
                    <>
                        {search ?
                            <>
                                {mail.map((data, index) => {
                                    if (`${data.subject}`.includes(searchData) || `${data.content}`.includes(searchData)) {
                                       return displayList(data,index,type,searchData)
                                    }
                                })}
                            </>
                            :
                            <>
                                {mail.map((data, index) => {
                                    return (displayList(data, index, type))
                                })}

                            </>}

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
                return displayData("deleted")
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
                                <Button variant="info" style={{ borderRadius: "5px" }} size="sm" onClick={handleShow}>
                                    <i className="fa fa-plus-circle" aria-hidden="true"></i> Compose
                             </Button>{composeMail()}
                            </ul>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="text">
                                <Form.Control placeholder="search Email" type="text" onChange={(e) => updateSearchData(e)} />
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


