import React from "react";
import {
  Button,
  OverlayTrigger,
  Popover,
  Nav,
  Row,
} from "react-bootstrap";
import "./navbar.css";
import Search from "./search";
import {useDispatch} from "react-redux";
import {currentPage} from "../redux/actions";

function Navigation() {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
          <div id="navbarSupportedContent" style={{color:"#1c2324 !important"}}>
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Nav.Link
                  className="nav-link pointer fa fa-home"
                  name="home"
                  onClick={()=> dispatch(currentPage("home"))}
                >
                  Home
                </Nav.Link>
              </li>
                <Search className="ml-2" />
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
                          onClick={()=> dispatch(currentPage("ProfileSettings"))}
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
                          onClick={()=> dispatch(currentPage("messages"))}
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
                          onClick={()=> dispatch(currentPage("settings"))}
                          name="settings"
                        >
                          <i className="fa fa-gear mr-2"></i>
                          settings
                        </Nav.Link>
                        <Nav.Link
                          className="list-group-item selectItem list-group-item-action"
                          tabIndex="3"
                          name="signout"
                          onClick={()=> dispatch(currentPage("logout"))}
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
    </React.Fragment>
  );
}

export default Navigation;
