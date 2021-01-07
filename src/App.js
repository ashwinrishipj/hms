import React from "react";
import "./App.css";
import { LandingPage } from "./Login/LandingPage";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./redux/reducers";

const myStore = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={myStore}>
      <LandingPage />
    </Provider>
  );
}

export default App;
