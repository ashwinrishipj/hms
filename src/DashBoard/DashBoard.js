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
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../redux/actions";

function DashBoard() {
  const dispatch = useDispatch();

  if (localStorage.getItem("userToken")) {
    return (
      <div>
        <Container fluid="true" className="dashboard">
          <Row style={{ marginLeft: "0", marginRight: "0" }}>
            <SideBar />
            <Col lg={10} style={{ paddingLeft: "0", paddingRight: "0" }}>
              <Navigation />
              <PageNavigation />
            </Col>
          </Row>
        </Container>
      </div >

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
