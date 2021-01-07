import React from 'react';
import { Row, Breadcrumb, Nav, Col, Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toggle, currentPage } from '../redux/actions';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Fill your information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    please kindly fill your personal information to make appointments. unless the personal information
                    is filled other actions will not be available.
				</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function SideBar() {
    const navigationIsSet = useSelector((state) => state.toggleSideBar);
    const profilFormIsComplete = true;
    const [modalShow, setModalShow] = React.useState(false);

    const dispatch = useDispatch();

    const currentPageName = useSelector(state => state.currentPage);

    const updateRoute = (e) => {
        if (profilFormIsComplete) {
            dispatch(currentPage(e.target.name));
        } else {
            setModalShow(true);
        }
    };

    return (
        <>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
            {navigationIsSet ? (
                <Col className="mt-2 sidebar-profile " md={1}>
                    <Button style={{ backgroundColor: "rgba(0,123,255,.25)" }} onClick={() => dispatch(toggle())}>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                        <span className="text-light" >
                            {currentPageName}
                        </span>
                    </Button>
                    <div className="list-group sidebar-background mt-4 " role="tablist">
                        <span className="arrow-head" />
                        <Nav className="flex-css-nav-link" onClick={(e) => updateRoute(e)}>
                            <span className="text-warning">Basics:</span>
                            <Nav.Link className="text-color fa fa-home fa-lg mt-2" name="home" />
                            <Nav.Link className="text-color fa fa-hospital-o fa-lg mt-2" name="appointments" />
                            <Nav.Link className="text-color fa fa-file-text fa-lg mt-2" name="appointmentLists" />
                        </Nav>

                        <Nav className="flex-css-nav-link mt-4" onClick={(e) => updateRoute(e)}>
                            <span className="text-warning">Apps</span>
                            <Nav.Link name="toDoList" className="text-color fa fa-tasks fa-lg mt-2" />
                            <Nav.Link name="calendar" className="text-color fa fa-calendar fa-lg mt-2" />
                            <Nav.Link name="notes" className="text-color fa fa-sticky-note-o fa-lg mt-2" />
                        </Nav>
                    </div>

                </Col>
            ) : (
                    <Col className="mt-2 sidebar-profile" md={2}>
                        <Button style={{ backgroundColor: "rgba(0,123,255,.25)" }} onClick={() => dispatch(toggle())}>
                            <i className="fa fa-bars" aria-hidden="true"></i>
                            <span className="text-light ml-4" >
                                {currentPageName}
                            </span>
                        </Button>
                        <div className="list-group sidebar-background mt-4" role="tablist">
                            <Nav className="flex-css-nav-link" onClick={(e) => updateRoute(e)}>
                                <span className="text-warning">Basics:</span>
                                <Nav.Link className="text-color fa fa-home mt-2" name="home">
                                    {' '}
                                    Home
                                </Nav.Link>
                                <Nav.Link className="text-color fa fa-hospital-o mt-2" name="appointments">
                                    {' '}
                                    Appointments
                                </Nav.Link>
                                <Nav.Link className="text-color fa fa-file-text mt-2" name="appointmentLists">
                                    {' '}
                                    History
                                </Nav.Link>
                            </Nav>

                            <Nav className="flex-css-nav-link mt-4" onClick={(e) => updateRoute(e)}>
                                <span className="text-warning">Apps & chat:</span>
                                <Nav.Link name="toDoList" className="text-color fa fa-tasks mt-2">
                                    {' '}
                                    To-do List
                                </Nav.Link>
                                <Nav.Link name="calendar" className="text-color fa fa-calendar mt-2">
                                    {' '}
                                    Calendar
                                </Nav.Link>
                                <Nav.Link name="notes" className="text-color fa fa-sticky-note-o mt-2">
                                    {' '}
                                    Notes
                                </Nav.Link>
                            </Nav>
                        </div>
                    </Col>
                )}
        </>
    );
}
