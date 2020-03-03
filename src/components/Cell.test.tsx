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
  const componentId: number = 0;
  const onMove: jest.Mock<Function> = jest.fn();

  act(() => {
    render(<Cell componentId={componentId} onMove={onMove} />, container);
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell"
  );

  act(() => {
    render(
      <Cell componentId={componentId} onMove={onMove} active={true} />,
      container
    );
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell table__cell_active"
  );

  act(() => {
    render(
      <Cell
        componentId={componentId}
        onMove={onMove}
        active={true}
        oPlayer={true}
      />,
      container
    );
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell table__cell_active table__cell_o"
  );
  act(() => {
    render(
      <Cell
        componentId={componentId}
        onMove={onMove}
        active={true}
        xPlayer={true}
      />,
      container
    );
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table__cell table__cell_active table__cell_x"
  );
});
