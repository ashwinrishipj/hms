import React from "react";
import {
  Button,
  OverlayTrigger,
  Popover,
  Nav,
  Navbar
} from "react-bootstrap";
import "./navbar.css";
import Search from "./search";
import { useDispatch } from "react-redux";
import { currentPage, route,toggle } from "../redux/actions";

function Navigation() {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Navbar collapseOnSelect >
        <Navbar.Toggle aria-controls="responsive-navbar-nav navbar-background" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <i className="fa fa-bars text-light" aria-hidden="true" onClick={() => dispatch(toggle())}></i>
          <Nav className="mr-auto ml-auto">
            <div id="navbarSupportedContent">
              <ul className="navbar-nav text-center">
                <Nav className="d-flex flex-css-nav-link" >
                  <Nav.Link onClick={(e) => dispatch(currentPage(e.target.name))} name="ProfileSettings" className="text-color fa fa-user fa-1x"></Nav.Link>
                  <Nav.Link onClick={(e) => dispatch(currentPage(e.target.name))} name="MailBox" className="text-color fa fa-envelope fa-1x ml-2" > </Nav.Link>
                  <Nav.Link onClick={(e) => dispatch(route(e.target.name))} name="lockScreen" className="text-color fa fa-lock fa-1x ml-2"></Nav.Link>
                  <Nav.Link onClick={(e) => dispatch(route(e.target.name))} name="logout" className="text-color fa fa-sign-out fa-1x ml-2"> </Nav.Link>
                </Nav>
                <Search />
                <li>
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    rootCloseEvent="click"
                    onHide="true"
                    rootClose="true"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom`} title="username">
                        <Popover.Title as="h3">{`Popover bottom`}</Popover.Title>
                        <Popover.Content>
                          <div
                            className="list-group"
                            style={{ border: "none !important" }}
                            role="tablist"
                          >
                            <Nav.Link
                              className="list-group-item selectItem list-group-item-action"
                              tabIndex="0"
                              name="profile"
                              onClick={() => dispatch(currentPage("ProfileSettings"))}
                            >
                              <span
                                className=" fa fa-address-book-o mr-2"
                                aria-hidden="true"
                              ></span>
                          profile
                        </Nav.Link>
                            <Nav.Link
                              className="list-group-item selectItem list-group-item-action"
                              tabIndex="1"
                              name="messages"
                              onClick={() => dispatch(currentPage("messages"))}
                            >
                              <span
                                className=" fa fa-envelope mr-2"
                                aria-hidden="true"
                              ></span>
                          messages
                        </Nav.Link>
                            <Nav.Link
                              className="list-group-item selectItem list-group-item-action"
                              tabIndex="2"
                              onClick={() => dispatch(currentPage("settings"))}
                              name="settings"
                            >
                              <i className="fa fa-gear mr-2"></i>
                          settings
                        </Nav.Link>
                            <Nav.Link
                              className="list-group-item selectItem list-group-item-action"
                              tabIndex="3"
                              name="signout"
                              onClick={() => dispatch(currentPage("logout"))}
                            >
                              <i className="fa fa-sign-out mr-2"></i>
                          Logout
                        </Nav.Link>
                          </div>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <span className="align-end-css fa fa-gear fa-spin fa-2x mr-4" style={{color:"red"}} />
                      
                  </OverlayTrigger>
                </li>
              </ul>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
}

export default Navigation;
