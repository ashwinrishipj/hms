import React from "react";
import { Switch, Route } from "react-router-dom";
import AppointmentSchedule from "../Appointments/AppointmentSchedule";
import AppointmentLists from "../Appointments/ScheduledAppointmentList";
import ToDoList from "../Apps&Chat/todoList";
import EventCalendar from "../Calendar/Calendar";
import Home from "../Home/home";
import Notes from "../Notes/Notes";

function PageNavigation (props){
  return (
      <>
        <Switch>
          {(props.navigate === "toDoList" && (
            <Route path="/" component={ToDoList} />
          )) ||
            (props.navigate === "calendar" && (
              <Route
                path="/"
                component={() => (
                  <EventCalendar />
                )}
              />
            )) ||
            (props.navigate === "appointments" && (
                <Route
                  path="/"
                  component={() => (
                   <AppointmentSchedule />
                  )}
                />)) ||
                (props.navigate === "appointmentLists" && (
                  <Route
                    path="/"
                    component={() => (
                     <AppointmentLists />
                    )}
                  />)) ||
            (props.navigate === "home" &&  (
              <Route
                path="/"
                component={() => (
                 <Home />
                )}
              />)) ||
            (props.navigate === "notes" && 
            (
              <Route
                path="/"
                component={() => (
                 <Notes />
                )}
              />)) ||
            // (props.navigate === "blog" && (
            //   <Route path="/" component={Blog} />
            // )) ||
            ""}
        </Switch>
      </>
  );
};

export default PageNavigation;