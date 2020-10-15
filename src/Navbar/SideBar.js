import React, { useState } from 'react';
import { Nav, Col, Navbar } from 'react-bootstrap';

export default function SideBar(props) {
    const [navigationIsSet, setnavigationIsSet] = useState(true);

    const handleMenu = () => {
        setnavigationIsSet(!navigationIsSet);
    }

    return (
        <>
            {navigationIsSet ? (
                <Col sm={2} className="navbar-flex-css leftView slideIn">
                    <div className="sidebar-profile ">
                        <Navbar.Brand onClick={handleMenu}>
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </Navbar.Brand>
                        <span className="text-light">Ashwin Rishi</span>
                        <Nav className="sidebar-profile-navbar-align mt-4 ml-4">
                            <Nav.Link className="shadow-sm fa fa-user fa-1x "> </Nav.Link>
                            <Nav.Link className="shadow-sm fa fa-lock fa-1x "></Nav.Link>
                            <Nav.Link className="shadow-sm fa fa-sign-out fa-1x"> </Nav.Link>
                        </Nav>
                    </div>

                    <Nav className="flex_css_for_navigation mt-4" onClick={props.handleUpdateFromSideBar(name)}>
                        <span className="text-warning">Basics:</span>
                        <Nav.Link className="fa fa-home mt-2" name="home">
                            {' '}
							Home
						</Nav.Link>
                        <Nav.Link className="fa fa-hospital-o mt-2" name="appointments">
                            {' '}
							Appointments
						</Nav.Link>
                        <Nav.Link className="fa fa-file-text mt-2" class="documents">
                            {' '}
							Documents
						</Nav.Link>
                    </Nav>

                    <Nav className="flex_css_for_navigation mt-4" onClick={props.handleUpdateFromSideBar(name)}>
                        <span className="text-warning">Apps & chat:</span>
                        <Nav.Link name="toDoList" className="fa fa-tasks mt-2">
                            {' '}
							To-do List
						</Nav.Link>
                        <Nav.Link name="calendar" className="fa fa-calendar mt-2">
                            {' '}
							Calendar
						</Nav.Link>
                        <Nav.Link name="notes" className="fa fa-sticky-note-o mt-2">
                            {' '}
							Notes
						</Nav.Link>
                    </Nav>
                </Col>
            ) : (
                    ''
                )}
        </>
    );
}
