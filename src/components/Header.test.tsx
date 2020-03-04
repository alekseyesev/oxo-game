import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Header from "./Header";

let container: Element;

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
    render(<Header />, container);
  });
  expect((container.querySelectorAll("header") as NodeList).length).toBe(1);

  act(() => {
    render(<Header />, container);
  });
  expect((container.querySelectorAll("svg") as NodeList).length).toBe(1);

  act(() => {
    render(<Header />, container);
  });
  expect((container.querySelectorAll(".player") as NodeList).length).toBe(2);
});
