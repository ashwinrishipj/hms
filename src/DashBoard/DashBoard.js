import React from "react";
import { withRouter } from "react-router-dom";
import "./DashBoard.css";
import {
  Nav,
  Navbar,
  Button,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Popover
} from "../../node_modules/react-bootstrap";
import Search from "../helpers/search";

const UserData = React.createContext();
export const UserConsumer = UserData.Consumer;

class DashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      handleNavigationMenu: this.handlemenu,
      navigationIsSet: true,
      loadContent: "home",
      loadUserSettings: false,
      collapsed: false,
      currentUser: true,
      profileSelected: true,
      searchedContent: "",
    };
  }

  handlemenu = () => {
    this.setState({ navigationIsSet: !this.state.navigationIsSet });
  };

  handleSearch = (searchedContent) => {
    this.setState({ loadContent: "home", searchedContent: searchedContent });
  };

  handleCall = (e) => {
    e.preventDefault();
    this.setState({
      loadContent: e.target.name,
    });
  };

  handleUserSettings = () => {
    this.setState({
      loadUserSettings: true,
    });
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleLogout = () => {
    localStorage.clear();
  };

  profileClick = (e) => {
    e.preventDefault();
    this.setState({ profileSelected: false, loadContent: e.target.name });
  };

  handleNotifications = () => {
    alert("notified:");
  };

  render() {
    return (
      <React.Fragment>
        <UserData.Provider value={this.state}>
          <Container fluid="true">
            <Row style={{ marginLeft: "0", marginRight: "0" }}>
              {this.state.navigationIsSet ? (
                <Col id="navbar" sm={2} className="leftView slideIn">
                  <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link>Appointment Scheduler</Nav.Link>
                    <Nav.Link eventKey="link-1">upload documents</Nav.Link>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                  </Nav>
                </Col>
              ) : (
                ""
              )}
              <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand onClick={this.state.handleNavigationMenu}>
                    <i class="fa fa-bars" aria-hidden="true"></i>
                  </Navbar.Brand>
                  <Nav className="mr-auto">
                    <div id="navbarSupportedContent">
                      <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                          <a
                            className="nav-link pointer fa fa-home"
                            name="home"
                            onClick={this.handleCall}
                            href="#home"
                          >
                            Home
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          name="blogs"
                          onClick={this.handleCall}
                        >
                          <a
                            className="nav-link pointer fa fa-newspaper-o "
                            name="blog"
                            href="#blog"
                          >
                            Blog
                          </a>
                        </li>
                        <li>
                          <Search/>
                        </li>
                     <li className="float-right">
                      <OverlayTrigger
                        trigger="click"
                        key="bottom"
                        rootCloseEvent="click"
                        onHide="true"
                        rootClose="true"
                        placement="bottom"
                        ref="overlay"
                        overlay={
                          <Popover
                            id={`popover-positioned-bottom`}
                            title="username"
                          >
                            <Popover.Title as="h3">{`Popover bottom`}</Popover.Title>
                            <Popover.Content>
                              <div
                                className="list-group"
                                style={{ border: "none !important" }}
                                id="list-tab"
                                role="tablist"
                              >
                                <a
                                  className="list-group-item selectItem list-group-item-action"
                                  tabIndex="0"
                                  href="#list-home"
                                  name="profile"
                                  onClick={this.profileClick}
                                >
                                  <span
                                    className=" fa fa-address-book-o mr-2"
                                    aria-hidden="true"
                                  ></span>
                                  profile
                                </a>
                                <a
                                  className="list-group-item selectItem list-group-item-action"
                                  tabIndex="1"
                                  href="#list-profile"
                                  name="messages"
                                  onClick={this.profileClick}
                                >
                                  <span
                                    className=" fa fa-envelope mr-2"
                                    aria-hidden="true"
                                  ></span>
                                  messages
                                </a>
                                <a
                                  className="list-group-item selectItem list-group-item-action"
                                  tabIndex="2"
                                  href="#list-messages"
                                  onClick={this.profileClick}
                                  name="settings"
                                >
                                  <i className="fa fa-gear mr-2"></i>
                                  settings
                                </a>
                                <a
                                  className="list-group-item selectItem list-group-item-action"
                                  tabIndex="3"
                                  href="#list-settings"
                                  name="signout"
                                  onClick={this.handleLogout}
                                >
                                  <i className="fa fa-sign-out mr-2"></i>
                                  Logout
                                </a>
                              </div>
                            </Popover.Content>
                          </Popover>
                        }
                      >
                        <Button variant="outline-dark pointer text-white">
                          <span
                            className="fa fa-user fa-lg"
                            aria-hidden="true"
                          ></span>
                          <span
                            className="fa fa-caret-down fa-xs"
                            aria-hidden="true"
                          ></span>
                        </Button>
                      </OverlayTrigger>
                      </li>
                      </ul>
                    </div>
                  </Nav>
                </Navbar>
              </Col>
            </Row>
          </Container>
        </UserData.Provider>
      </React.Fragment>
    );
  }
}

export default withRouter(DashBoard);
