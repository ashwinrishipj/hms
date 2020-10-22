import React from "react";
import {
  Button,
  OverlayTrigger,
  Popover,
  Nav,
  Row,
} from "react-bootstrap";
import "./navbar.css";
import { UserConsumer } from "../DashBoard/DashBoard";
import Search from "./search";

function Navigation() {
  return (
    <React.Fragment>
      <UserConsumer>
        {({ handleCall, profileClick, handleLogout, handleSearch }) => (
          <div id="navbarSupportedContent ">
            <ul className="navbar-nav ml-4 text-center">
              <li className="nav-item ml-4 ">
                <Nav.Link
                  className="nav-link pointer fa fa-home"
                  name="home"
                  onClick={handleCall}
                  href="#home"
                >
                  Home
                </Nav.Link>
              </li>
                <Search className="ml-2" displayImages={handleSearch} />
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
                        id="list-tab"
                        role="tablist"
                      >
                        <Nav.Link
                          className="list-group-item selectItem list-group-item-action"
                          tabIndex="0"
                          href="#list-home"
                          name="profile"
                          onClick={profileClick}
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
                          href="#list-profile"
                          name="messages"
                          onClick={profileClick}
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
                          href="#list-messages"
                          onClick={profileClick}
                          name="settings"
                        >
                          <i className="fa fa-gear mr-2"></i>
                          settings
                        </Nav.Link>
                        <Nav.Link
                          className="list-group-item selectItem list-group-item-action"
                          tabIndex="3"
                          href=""
                          name="signout"
                          onClick={handleLogout}
                        >
                          <i className="fa fa-sign-out mr-2"></i>
                          Logout
                        </Nav.Link>
                      </div>
                    </Popover.Content>
                  </Popover>
                }
              >
                <Button className="align-end-css fa fa-user f-lg" variant="bg-red text-warning outline-dark">
                 
                 <i className="fa fa-caret-down fa-lg mt-2 ml-1"/>
                </Button>
              </OverlayTrigger>
              </li>
              </ul>
          </div>
        )}
       
      </UserConsumer>
    </React.Fragment>
  );
}

export default Navigation;
