import React from "react";
import "./DashBoard.css";
import {
  Nav,
  Container,
  Row,
  Col,
  Navbar,
} from "../../node_modules/react-bootstrap";
import Navigation from "../Navbar/Navigation";
import PageNavigation from "../Navbar/pageNavigation";

const UserData = React.createContext();
export const UserConsumer = UserData.Consumer;

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
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
    this.props.updateRoute("login");
  };

  profileClick = (e) => {
    e.preventDefault();
    alert("Its under development. Please choose from sidebar & thank you so much for logging in! :)")
    // this.setState({ profileSelected: false, loadContent: e.target.name });
  };

  handleNotifications = () => {
    alert("notified:");
  };

  render() {
    if (localStorage.getItem("userToken")) {
      return (
        <React.Fragment>
          <Container fluid="true">
          <Navbar bg="dark" variant="dark">
                  <Navbar.Brand onClick={this.handleMenu}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </Navbar.Brand>
                  <Nav className="mr-auto">
                    <UserData.Provider value={this.state}>
                      <Navigation />
                    </UserData.Provider>
                  </Nav>
                </Navbar>
            <Row style={{ marginLeft: "0", marginRight: "0" }}>
              {this.state.navigationIsSet ? (
                <Col sm={2} className="navbar-flex-css leftView slideIn">
                  <div>
                    <img src={require('../helpers/Profile.png')} width="50px" height="50px"/>
                    <Nav className="sidebar-profile-navbar-align mt-4 ml-4">
                      <Nav.Link onClick={()=> this.props.updateRoute("lockScreen")} className="shadow-sm fa fa-lock fa-2x "></Nav.Link>
                      <Nav.Link onClick={()=> this.handleLogout()} className="shadow-sm fa fa-sign-out fa-2x ml-4">
                        {" "}
                      </Nav.Link>
                    </Nav>
                  </div>

                  <Nav className="flex_css_for_navigation mt-4" onClick={this.handleCall}>
                    <span className="flex-css-nav-link text-warning">Basics:</span>
                    <Nav.Link className="flex-css-nav-link fa fa-home mt-2" name="home"> Home</Nav.Link>
                    <Nav.Link className="flex-css-nav-link fa fa-hospital-o mt-2" name="appointments">
                      {" "}
                      Appointment Scheduler
                    </Nav.Link>
                    <Nav.Link className="flex-css-nav-link fa fa fa-list mt-2" name="appointmentLists">
                      {" "}
                      Apointment Lists
                    </Nav.Link>
                  </Nav>

                  <Nav className="flex_css_for_navigation mt-4" onClick={this.handleCall}>
                    <span className="text-warning">Apps & chat:</span>
                    <Nav.Link name="toDoList" className="flex-css-nav-link fa fa-tasks mt-2">
                      {" "}
                      To-do List
                    </Nav.Link>
                    <Nav.Link name="calendar" className="flex-css-nav-link fa fa-calendar mt-2">
                      {" "}
                      Calendar
                    </Nav.Link>
                    <Nav.Link name="notes" className=" flex-css-nav-link fa fa-sticky-note-o mt-2">
                      {" "}
                      Notes
                    </Nav.Link>
                  </Nav>
                </Col>
              ) : (
                  ""
                )}
              <Col style={{ paddingLeft: "0", paddingRight: "0" ,backgroundColor:"#f8f9fa"}}>
                <div className="display-content">
                  <PageNavigation navigate={this.state.loadContent} />
                </div>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    }
    else {
      return (
        <>
          {this.props.updateRoute("login")}
        </>
      )
    }

  }
}

export default DashBoard;
