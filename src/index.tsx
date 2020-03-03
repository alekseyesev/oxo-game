import React from "react";
import ReactDOM from "react-dom";
import { Store, createStore } from "redux";
import { Provider } from "react-redux";
import oxoReducers from "./redux/reducers";
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "reset-css";
import "./index.css";

const rootElement: HTMLElement | null = document.getElementById("root");
const store: Store = createStore(oxoReducers, devToolsEnhancer({}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
