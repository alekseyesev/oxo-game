import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Player from "./Player";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it("has rendered a player component with props", () => {
  const playerId: playerId = "o";
  const score: number = 0;

  act(() => {
    render(<Player playerId={playerId} score={score} />, container);
  });
  expect((container.querySelectorAll(".player") as NodeList).length).toBe(1);

  act(() => {
    render(<Player playerId={playerId} score={score} />, container);
  });
  expect(
    (container.querySelector(".player__name") as Element).textContent
  ).toBe(`Игрок ${playerId.toUpperCase()}`);

  act(() => {
    render(<Player playerId={playerId} score={score} />, container);
  });
  expect(
    (container.querySelector(".player__score") as Element).textContent
  ).toBe(`${score}`);
});
