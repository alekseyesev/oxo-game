import {
  constants,
  tableMatrix,
  maxScore,
  ready,
  play,
  move,
  roundEnd
} from "./actions";

const { TABLE_MATRIX, MAX_SCORE, READY, PLAY, MOVE, ROUND_END } = constants;

describe("actions", () => {
  it("should create an action to set table matrix parameter", () => {
    const rowLength: number = 8;
    const expectedAction: IActionTableMatrix = {
      type: TABLE_MATRIX,
      rowLength
    };
    expect(tableMatrix(rowLength)).toEqual(expectedAction);
  });
  it("should create an action to set max score parameter", () => {
    const score: number = 1;
    const expectedAction: IActionMaxScore = {
      type: MAX_SCORE,
      score
    };
    expect(maxScore(score)).toEqual(expectedAction);
  });
  it("should create an action to set game status to ready", () => {
    const gameStatus: gameStatus = "ready";
    const expectedAction: IActionGameStatus = {
      type: READY,
      gameStatus
    };
    expect(ready()).toEqual(expectedAction);
  });
  it("should create an action to set game status to play", () => {
    const gameStatus: gameStatus = "play";
    const expectedAction: IActionGameStatus = {
      type: PLAY,
      gameStatus
    };
    expect(play()).toEqual(expectedAction);
  });
  it("should create an action to the game move", () => {
    const tableMatrix: number = 3;
    const cellId: number = 0;
    const expectedAction: IActionMove = {
      type: MOVE,
      tableMatrix,
      cellId
    };
    expect(move(tableMatrix, cellId)).toEqual(expectedAction);
  });
  it("should create an action to the round end", () => {
    const gameStatus: gameStatus = "roundEnd";
    const expectedAction: IActionGameStatus = {
      type: ROUND_END,
      gameStatus
    };
    expect(roundEnd()).toEqual(expectedAction);
  });
});
