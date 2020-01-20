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

  const onClilck: jest.Mock<void> = jest.fn();

  act(() => {
    render(<Cell onClick={onClilck} />, container);
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell"
  );

  act(() => {
    render(<Cell onClick={onClilck} active={true} />, container);
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell table__cell_active"
  );

  act(() => {
    render(<Cell onClick={onClilck} active={true} oPlayer={true} />, container);
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell table__cell_active table__cell_o"
  );
  act(() => {
    render(<Cell onClick={onClilck} active={true} xPlayer={true} />, container);
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell table__cell_active table__cell_x"
  );
});
