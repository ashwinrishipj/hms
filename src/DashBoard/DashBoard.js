import React from "react";
import { withRouter } from "react-router-dom";
import "./DashBoard.css";
import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "../../node_modules/react-bootstrap";

const UserData = React.createContext();
export const UserConsumer = UserData.Consumer;

class DashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      handleNavigationMenu: this.handlemenu,
      navigationIsSet: true,
    };
  }

  handlemenu = () => {
    this.setState({ navigationIsSet : !this.state.navigationIsSet});
  };

  render() {
    return (
      <React.Fragment>
        <UserData.Provider value={this.state}>
          <Container fluid="true">
            <Row style={{ marginLeft: "0", marginRight: "0" }}>
              {this.state.navigationIsSet ? (
                <Col id ="navbar" sm={2} className="leftView slideIn">
                  <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link>Active</Nav.Link>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                  </Nav>
                </Col>
              ) : (
                <Col id ="navbar" sm={1} className="leftView slideOut">
                  <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link>Active</Nav.Link>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                  </Nav>
                </Col>
              )}
              <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand onClick={this.state.handleNavigationMenu}>
                    <i class="fa fa-bars" aria-hidden="true"></i>
                  </Navbar.Brand>
                  <Nav className="mr-auto">
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Search"
                      className="mr-sm-2"
                    />
                    <Button variant="outline-info">Search</Button>
                  </Form>
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
