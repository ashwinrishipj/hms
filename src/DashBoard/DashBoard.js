import React, { useState } from "react";
import "./DashBoard.css";
import {
  Nav,
  Container,
  Row,
  Col,
  Navbar,
  Breadcrumb
} from "../../node_modules/react-bootstrap";
import Navigation from "../Navbar/Navigation";
import PageNavigation from "../Navbar/pageNavigation";
import SideBar from "../Navbar/SideBar";
import { useDispatch,useSelector } from "react-redux";
import { toggle } from "../redux/actions";

function DashBoard() {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.currentPage);

  if (localStorage.getItem("userToken")) {
    return (
      <React.Fragment>
        <Container fluid="true">
          <Row style={{ marginLeft: "0", marginRight: "0" }}>
            <SideBar />
            <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
              <div className="display-content">
                <Navbar style={{backgroundColor: "#dae0e5"}}>
                  <Navbar.Brand onClick={() => dispatch(toggle())}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </Navbar.Brand>
                  <Nav className="mr-auto">
                    <Navigation />
                  </Nav>
                </Navbar>
                <Breadcrumb style={{backgroundColor:"whitesmoke"}}>
                <Breadcrumb.Item   style={{color:"red"}} >{currentPage}</Breadcrumb.Item>
              </Breadcrumb>
                <PageNavigation />
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

export default DashBoard;
