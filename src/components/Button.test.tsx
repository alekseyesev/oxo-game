import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from "./Button";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it("has rendered a button with given text", () => {
  const text: string = "Test";

  act(() => {
    render(<Button text={text} />, container);
  });
  expect((container.querySelector("button") as Element).textContent).toBe(
    "Test"
  );
});
