import React, { useState } from "react";
import { Container, Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FetchData } from "../helpers/Fetch";

const LockScreen = (props) => {
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");
    const [disabled, setdisabled] = useState(true);
    const [alert, setalert] = useState("")

    const validatePassword = (e) => {
        var password = e.target.value;
        if (
            password.match(
                new RegExp(
                    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
                )
            )
        ) {
            setpassword(password);
            seterror("")
            setdisabled(false)
        }
        else {
            seterror("Please enter Alpha Numerical Password");
            setdisabled(true);
        }
    }

    const unlockUser = (e) => {
        e.preventDefault();


        let requestBody = {
            query: ` query{
                validateUser(input:{
                  emailId:"pjashwinrishi@yahoo.com",password :"${password}"
                }){
                  token,
                  tokenExpiration
                }
              }
              `,
        };

        FetchData(requestBody).then((response) => {
            return response.data.validateUser.tokenExpiration === 1
                ? props.updateRoute("dashBoard")
                : response === (null || undefined)
                    ? setalert("Server is down!. We are working on it.")
                    : setalert(response);
        });
    }
    return (
        <>
            <Container fluid className=" background-Image align-self-center" >
                <Row className=" justify-content-md-center  text-white text-center" >
                    <Col lg="4" className="mt-4">
                        <Card style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", marginTop: "28%" }}>
                            <h2 style={{ color: "teal" }}><i className="fa fa-lock fa-2x" aria-hidden="true"></i> </h2>
                            <Card.Header>Ashwin Rishi </Card.Header>

                            <Card.Body>
                                <section >
                                    {!alert !== 0 ? (
                                        <>
                                        <Form.Label className="text-danger">{alert}</Form.Label>
                                        </>
                                    ) : (
                                            ""
                                        )}
                                </section>
                                <Form >
                                    <Form.Group >
                                        <InputGroup className="col-md-10 ml-4">

                                            <InputGroup.Prepend className="lock-screen-form">
                                                <InputGroup.Text id="basic-addon1" className="fa fa-key fa-2x"></InputGroup.Text>
                                            </InputGroup.Prepend>

                                            <Form.Control onChange={(e) => validatePassword(e)} type="password" placeholder=" password" />
                                            <Form.Label className="text-danger">{error}</Form.Label>

                                        </InputGroup>

                                    </Form.Group>
                                    <Button variant="info shadow-none" disabled={disabled} onClick={(e) => unlockUser(e)} className="lock-button btn-md" >unlock</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LockScreen;