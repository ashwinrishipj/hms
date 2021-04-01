import React, { useState } from "react";
import { Row, Col, Card, Tab } from 'react-bootstrap';
import "./Chat.css"

export default function Mail() {
    const [navigateMail, setnavigateMail] = useState(0);
    const navigateTypeOfMail = () => {

    }

    return (
        <>
            <div className="mt-4">
                <Card body style={{ border: '1px gray', backgroundColor: "#0d1117" }}>
                    <Row>
                        lore
                    </Row>

                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
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
                    </Tab.Container>
                </Card>
            </div>
        </>
    )
}


