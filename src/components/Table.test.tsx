import React from "react";
import { Store, createStore } from "redux";
import { Provider } from "react-redux";
import oxoReducers from "../redux/reducers";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Table from "./Table";

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

it("has proper class names", () => {
  const cellCount: number = 9;

  act(() => {
    render(
      <Provider store={store}>
        <Table inProgress={false} cellCount={cellCount} />
      </Provider>,
      container
    );
  });
  expect((container.querySelector("div") as Element).className).toBe("table");

  act(() => {
    render(
      <Provider store={store}>
        <Table inProgress={true} cellCount={cellCount} />
      </Provider>,
      container
    );
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table table_active"
  );
});

it("renders with 64 cells", () => {
  const cellCount: number = 64;

  act(() => {
    render(
      <Provider store={store}>
        <Table cellCount={cellCount} />
      </Provider>,
      container
    );
  });
  expect(
    (container.querySelectorAll(".table__cell") as NodeListOf<Element>).length
  ).toBe(64);
});
