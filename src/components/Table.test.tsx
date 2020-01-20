import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Table from "./Table";

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
  const placeMark: jest.Mock<void> = jest.fn();
  const cells: Array<ICellProps> = [{ onClick: () => {} }];

  act(() => {
    render(
      <Table inProgress={false} placeMark={placeMark} cells={cells} />,
      container
    );
  });
  expect((container.querySelector("div") as Element).className).toBe("table");

  act(() => {
    render(
      <Table inProgress={true} placeMark={placeMark} cells={cells} />,
      container
    );
  });
  expect((container.querySelector("div") as Element).className).toBe(
    "table table_active"
  );
});

it("renders with 9 cells", () => {
  const placeMark: jest.Mock<void> = jest.fn();
  const cells: Array<ICellProps> = Array(9).fill({ onClick: () => {} });

  act(() => {
    render(<Table placeMark={placeMark} cells={cells} />, container);
  });
  expect(
    (container.querySelectorAll(".table__cell") as NodeListOf<Element>).length
  ).toBe(9);
});
