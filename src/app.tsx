import React from "react";
import ReactDOM from "react-dom";
import "./static/kenedi.min.scss";
import { Provider } from "react-redux";
import configureStore, { history } from "./configureStore";
import { ConnectedRouter } from "connected-react-router";
import { Routes } from "./routes";
import "csspin/csspin.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
