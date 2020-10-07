import React from "react";
import { withRouter } from "react-router-dom";
import "./DashBoard.css";
import {
  Nav,
  Container,
  Row,
  Col,
  Navbar,
} from "../../node_modules/react-bootstrap";
import Navigation from "../Navbar/navbar";

const UserData = React.createContext();
export const UserConsumer = UserData.Consumer;

class DashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      navigationIsSet: true,
      loadContent: "home",
      loadUserSettings: false,
      collapsed: false,
      currentUser: true,
      profileSelected: true,
      searchedContent: "",
      handleLogout: this.handleLogout,
      handleCall: this.handleCall,
      profileClick: this.profileClick,
      handleSearch: this.handleSearch,
    };
  }

  handleMenu = () => {
    this.setState({ navigationIsSet: !this.state.navigationIsSet });
  };

  handleSearch = (searchedContent) => {
    alert(searchedContent);
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
        <Container fluid="true">
          <Row style={{ marginLeft: "0", marginRight: "0" }}>
            {this.state.navigationIsSet ? (
              <Col sm={2} className="leftView slideIn ">
                <div className="sidebar-profile ">
                  <span className="text-light">Ashwin Rishi</span>
                  <Nav className="sidebar-profile-navbar-align mt-4">
                    <Nav.Link className="shadow-sm fa fa-user fa-1x ">
                      {" "}
                    </Nav.Link>
                    <Nav.Link className="shadow-sm fa fa-lock fa-1x "></Nav.Link>
                    <Nav.Link className="shadow-sm fa fa-envelope fa-1x">
                      {" "}
                    </Nav.Link>
                    <Nav.Link className="shadow-sm fa fa-sign-out fa-1x">
                      {" "}
                    </Nav.Link>
                  </Nav>
                  </div>
                 
                  <Nav className="flex-css mt-4">
                    <span className="text-warning">Basics:</span>
                    <Nav.Link className="fa fa-home mt-2"> Home</Nav.Link>
                    <Nav.Link className="fa fa-hospital-o mt-2">
                      {" "}
                      Appointments
                    </Nav.Link>
                    <Nav.Link className="fa fa-file-text mt-2">
                      {" "}
                      Documents
                    </Nav.Link>
                  </Nav>

                  <Nav className="flex-css mt-4">
                    <span className="text-warning">Apps & chat:</span>
                    <Nav.Link className="fa fa-tasks mt-2">
                      {" "}
                      To-do List
                    </Nav.Link>
                    <Nav.Link className="fa fa-calendar mt-2">
                      {" "}
                      Calendar
                    </Nav.Link>
                    <Nav.Link className="fa fa-sticky-note-o mt-2">
                      {" "}
                      Notes
                    </Nav.Link>
                  </Nav>
              </Col>
            ) : (
              ""
            )}
            <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
              <UserData.Provider value={this.state}>
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand onClick={this.handleMenu}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </Navbar.Brand>
                  <Nav className="mr-auto">
                    <Navigation />
                  </Nav>
                </Navbar>
              </UserData.Provider>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(DashBoard);
