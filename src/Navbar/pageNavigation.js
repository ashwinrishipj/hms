import React from "react";
import { Switch, Route } from "react-router-dom";
import AppointmentSchedule from "../Appointments/AppointmentSchedule";
import ToDoList from "../Apps&Chat/todoList";
import EventCalendar from "../Calendar/Calendar";
import Notes from "../Notes/Notes";

function PageNavigation (props){
  return (
      <section>
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
            (props.navigate === "settings" && "") ||
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
      </section>
  );
};

export default PageNavigation;