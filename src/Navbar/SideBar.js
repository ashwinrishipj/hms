import React from 'react';
import { Nav, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { currentPage } from "../redux/actions";

export default function SideBar(props) {
    const navigationIsSet = useSelector(state => state.toggleSideBar);
    const dispatch = useDispatch();

    return (
        <>
            {navigationIsSet ? (
                <Col sm={2} className="navbar-flex-css leftView slideIn">
                    <div className="sidebar-profile ">
                        <span className="text-light">Ashwin Rishi</span>
                        <Nav className="sidebar-profile-navbar-align mt-4">
                            <Nav.Link name="ProfileSettings" className="text-color fa fa-user fa-1x"></Nav.Link>
                            <Nav.Link name="MailBox" className="text-color fa fa-envelope fa-1x"> </Nav.Link>
                            <Nav.Link name="lockScreen" className="text-color fa fa-lock fa-1x "></Nav.Link>
                            <Nav.Link name="logout"className="text-color fa fa-sign-out fa-1x"> </Nav.Link>
                        </Nav>
                    </div>

                    <Nav className="flex-css-nav-link mt-4" onClick={(e) => dispatch(currentPage(e.target.name))}>
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

                    <Nav className="flex-css-nav-link mt-4" onClick={(e) => dispatch(currentPage(e.target.name))}>
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
                </Col>
            ) : (
                    ''
                )}
        </>
    );
}
