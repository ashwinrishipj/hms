import React from "react";
import {
    Button,
    Form,
    Col,
    Container,
    Card
} from "react-bootstrap";

function Profile() {
    return (
        <Container>
            <Card body style={{ boxShadow: "2px 2px 2px 2px grey", border: "1px gray", height: "100vh !important" }}>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} md="4">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                defaultValue="Mark"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" >
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                defaultValue="Otto"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control required type="date" max="new Date()" placeholder="choose date of birth" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Label>Blood Group</Form.Label>
                            <Form.Control required type="number" placeholder="choose blood group" as="select">
                                <option>A- </option>
                                <option>A+</option>
                                <option>B-</option>
                                <option>B+ </option>
                                <option>AB-</option>
                                <option>AB+</option>
                                <option>O-</option>
                                <option>O+</option>
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="formGridPassword">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="number" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Choose...</option>
                                <option value="BritishColumbia">British Columbia</option>
                                <option value="Alberta">Alberta</option>
                                <option value="Manitoba">Manitoba</option>
                                <option value="Ontario">Ontario</option>
                                <option value="Quebec">Quebec</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                 </Button>
                </Form>
            </Card>
        </Container >
    );
}
export default Profile;
