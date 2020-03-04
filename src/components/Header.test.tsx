import React from "react";
import { Store, createStore } from "redux";
import { Provider } from "react-redux";
import oxoReducers from "../redux/reducers";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Header from "./Header";

let container: Element;

const store: Store = createStore(oxoReducers);

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it("has rendered a header element with its children", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
      container
    );
  });
  expect((container.querySelectorAll("header") as NodeList).length).toBe(1);

  act(() => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
      container
    );
  });
  expect((container.querySelectorAll("svg") as NodeList).length).toBe(1);

  act(() => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
      container
    );
  });
  expect((container.querySelectorAll(".player") as NodeList).length).toBe(2);
});
