import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Cell from "./Cell";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it("has proper class names", () => {
  act(() => {
    render(<Cell />, container);
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell"
  );

  act(() => {
    render(<Cell active={true} />, container);
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell table__cell_active"
  );

  act(() => {
    render(<Cell active={true} oPlayer={true} />, container);
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell table__cell_active table__cell_o"
  );
  act(() => {
    render(<Cell active={true} xPlayer={true} />, container);
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell table__cell_active table__cell_x"
  );
});
