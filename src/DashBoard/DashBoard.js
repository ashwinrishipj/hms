import React, { useState } from "react";
import "./DashBoard.css";
import {
  Container,
  Row,
  Col,
  Breadcrumb
} from "../../node_modules/react-bootstrap";
import Navigation from "../Navbar/Navigation";
import PageNavigation from "../Navbar/pageNavigation";
import SideBar from "../Navbar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { OnScrollEvent } from "../redux/actions";

function DashBoard() {
  const dispatch = useDispatch();
  const currentPageName = useSelector(state => state.currentPage);

  const onUserScrollView = () => {
    dispatch(OnScrollEvent());
  }

  if (localStorage.getItem("userToken")) {
    return (
      <div className="dashboard">
        <Container fluid="true" onScroll={() => onUserScrollView()} >
          <Navigation />
          <Row style={{ marginLeft: "0", marginRight: "0" }}>
            <SideBar />
            <Col lg={10} style={{ paddingLeft: "0", paddingRight: "0", height: "200%" }}>
              <div className="sidebar-background">
                <Breadcrumb>
                  <Breadcrumb.Item >
                    {currentPageName}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
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
