import {
  constants,
  tableMatrix,
  maxScore,
  ready,
  play,
  move,
  roundEnd
} from "./actions";

const [TABLE_MATRIX, MAX_SCORE, READY, PLAY, MOVE, ROUND_END] = constants;

describe("actions", () => {
  it("should create an action to set table matrix parameter", () => {
    const rowLength: number = 8;
    const expectedAction: ITableMatrix = {
      type: TABLE_MATRIX,
      rowLength
    };
    expect(tableMatrix(rowLength)).toEqual(expectedAction);
  });
  it("should create an action to set max score parameter", () => {
    const score: number = 1;
    const expectedAction: IMaxScore = {
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
    expect(ready(gameStatus)).toEqual(expectedAction);
  });
  it("should create an action to set game status to play", () => {
    const gameStatus: gameStatus = "play";
    const expectedAction: IActionGameStatus = {
      type: PLAY,
      gameStatus
    };
    expect(play(gameStatus)).toEqual(expectedAction);
  });
  it("should create an action to the game move", () => {
    const playerId: playerId = "o";
    const tableMatrix: number = 3;
    const cellId: number = 0;
    const expectedAction: IActionMove = {
      type: MOVE,
      playerId,
      tableMatrix,
      cellId
    };
    expect(move(playerId, tableMatrix, cellId)).toEqual(expectedAction);
  });
  it("should create an action to the round end", () => {
    const playerId: playerId = "x";
    const score: number = 1;
    const expectedAction: IActionRoundEnd = {
      type: ROUND_END,
      playerId,
      score
    };
    expect(roundEnd(playerId, score)).toEqual(expectedAction);
  });
});
