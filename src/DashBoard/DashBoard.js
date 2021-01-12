import React, { useState } from "react";
import "./DashBoard.css";
import {
  Container,
  Row,
  Col
} from "../../node_modules/react-bootstrap";
import Navigation from "../Navbar/Navigation";
import PageNavigation from "../Navbar/pageNavigation";
import SideBar from "../Navbar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { toggle, OnScrollEvent } from "../redux/actions";

function DashBoard() {
  const dispatch = useDispatch();

  const onUserScrollView = () => {
    dispatch(OnScrollEvent());
  }

  if (localStorage.getItem("userToken")) {
    return (
      <div>
        <Container fluid="true" onScroll={() => onUserScrollView()} className="dashboard">
          <Navigation />
          <Row style={{ marginLeft: "0", marginRight: "0" }}>
            <SideBar />
            <Col lg={10} style={{ paddingLeft: "0", paddingRight: "0" }}>
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
