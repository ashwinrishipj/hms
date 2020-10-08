import React from "react";
import {
  Button,
  OverlayTrigger,
  Popover,
  Nav,
} from "../../node_modules/react-bootstrap";
import "./navbar.css";
import { UserConsumer } from "../DashBoard/DashBoard";
import Search from "./search";

function Navigation() {
  return (
    <React.Fragment>
      <UserConsumer>
        {({ handleCall, profileClick, handleLogout, handleSearch }) => (
          <div id="navbarSupportedContent">
            <ul className="navbar-nav navbar-flex-css ml-4">
              <li className="nav-item ml-4">
                <Nav.Link
                  className="nav-link pointer fa fa-home"
                  name="home"
                  onClick={handleCall}
                  href="#home"
                >
                  Home
                </Nav.Link>
              </li>
              <li className="nav-item ml-4" name="blogs" onClick={handleCall}>
                <Nav.Link
                  className="nav-link pointer fa fa-newspaper-o "
                  name="blog"
                  href="#blog"
                >
                  Blog
                </Nav.Link>
              </li>
                <Search displayImages={handleSearch} />
              </ul>
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
                          href="#list-settings"
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
                <Button  className="profile-flex-css" variant="outline-dark pointer text-white">
                  <span className="fa fa-user fa-lg" aria-hidden="true"></span>
                  <span
                    className="fa fa-caret-down fa-xs"
                    aria-hidden="true"
                  ></span>
                </Button>
              </OverlayTrigger>
          </div>
        )}
      </UserConsumer>
    </React.Fragment>
  );
}

export default Navigation;
