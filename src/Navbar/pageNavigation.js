import React from "react";
import { Switch, Route } from "react-router-dom";
import AppointmentSchedule from "../Appointments/AppointmentSchedule";
import AppointmentLists from "../Appointments/ScheduledAppointmentList";
import ToDoList from "../Apps&Chat/todoList";
import EventCalendar from "../Calendar/Calendar";
import Chat from "../Chat/Chat";
import MailBox from "../Chat/MailBox";
import VideoCall from "../Chat/VideoCall";
import Home from "../Home/home";
import Notes from "../Notes/Notes";
import { useSelector } from "react-redux";
import ProfileSettings from "../ProfileSettings/Profiles";

function PageNavigation() {
  const navigateTo = useSelector(state => state.currentPage);

  return (
    <>
      <Switch>
        {(navigateTo === "toDoList" && (
          <Route path="/" component={ToDoList} />
        )) ||
          (navigateTo === "calendar" && (
            <Route
              path="/"
              component={() => (
                <EventCalendar />
              )}
            />
          )) ||
          (navigateTo === "appointments" && (
            <Route
              path="/"
              component={() => (
                <AppointmentSchedule />
              )}
            />)) ||
          (navigateTo === "appointmentLists" && (
            <Route
              path="/"
              component={() => (
                <AppointmentLists />
              )}
            />)) ||
          (navigateTo === "home" && (
            <Route
              path="/"
              component={() => (
                <Home />
              )}
            />)) ||
          (navigateTo === "notes" &&
            (
              <Route
                path="/"
                component={() => (
                  <Notes />
                )}
              />)) ||
          (navigateTo === "chat" &&
            (
              <Route
                path="/"
                component={() => (
                  <Chat />
                )}
              />)) || (navigateTo === "MailBox" &&
                (
                  <Route
                    path="/"
                    component={() => (
                      <MailBox />
                    )}
                  />)) ||
          (navigateTo === "VideoCall" &&
            (
              <Route
                path="/"
                component={() => (
                  <VideoCall />
                )}
              />)) ||
          (navigateTo === "ProfileSettings" &&
            (
              <Route
                path="/"
                component={() => (
                  <ProfileSettings />
                )}
              />)) ||
          ""}
      </Switch>
    </>
  );
};

export default PageNavigation;