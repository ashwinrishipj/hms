import React from "react";
import { Switch, Route } from "react-router-dom";
import ToDoList from "../Apps&Chat/todoList";

function PageNavigation (props){
  return (
      <section>
        <Switch>
          {(props.navigate === "toDoList" && (
            <Route path="/" component={ToDoList} />
          )) ||
            // (props.navigate === "home" && (
            //   <Route
            //     path="/"
            //     component={() => (
            //       <PicturesDisplay searchedContent={props.searchedContent} />
            //     )}
            //   />
            // )) ||
            (props.navigate === "messages" && "") ||
            (props.navigate === "messages" && "") ||
            (props.navigate === "settings" && "") ||
            // (props.navigate === "blog" && (
            //   <Route path="/" component={Blog} />
            // )) ||
            ""}
        </Switch>
      </section>
  );
};

export default PageNavigation;