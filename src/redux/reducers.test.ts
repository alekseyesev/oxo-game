import { constants } from "./actions";
import reducer from "./reducers";

const { TABLE_MATRIX, MAX_SCORE, READY, PLAY, MOVE, ROUND_END } = constants;

const initialState: {
  events: IEvents;
  progress: IProgress;
  settings: ISettings;
} = {
  events: {
    o: {
      winner: "not yet",
      currentPlayer: true,
      movesBitmap: Int8Array.from([0, 0, 0]),
      score: 0
    },
    x: {
      winner: "not yet",
      currentPlayer: false,
      movesBitmap: Int8Array.from([0, 0, 0]),
      score: 0
    }
  },
  progress: { status: "ready" },
  settings: { tableMatrix: 3, maxScore: 1, maxRound: 2 }
};

describe("oxo reducer", () => {
  it("should return the initial state", () => {
    expect(
      reducer(
        undefined,
        {} as
          | (IActionTableMatrix & IActionMaxScore & IActionMaxRound)
          | IActionGameStatus
          | (IActionMove & IActionGameStatus)
      )
    ).toEqual(initialState);
  });
  it("should handle TABLE_MATRIX", () => {
    const action: IActionTableMatrix & IActionMaxScore & IActionMaxRound = {
      type: TABLE_MATRIX,
      rowLength: 8,
      score: 1,
      round: 2
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...{ settings: { tableMatrix: 8, maxScore: 1, maxRound: 2 } }
    });
  });
  it("should handle MAX_SCORE", () => {
    const action: IActionTableMatrix & IActionMaxScore & IActionMaxRound = {
      type: MAX_SCORE,
      rowLength: 3,
      score: 10,
      round: 2
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...{ settings: { tableMatrix: 3, maxScore: 10, maxRound: 2 } }
    });
  });
  it("should handle READY", () => {
    const action: IActionGameStatus = {
      type: READY,
      gameStatus: "ready"
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...{ progress: { status: "ready" } }
    });
  });
  it("should handle PLAY", () => {
    const action: IActionGameStatus = {
      type: PLAY,
      gameStatus: "play"
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...{ progress: { status: "play" } }
    });
  });
  it("should handle MOVE", () => {
    const action: IActionMove & IActionGameStatus = {
      type: MOVE,
      gameStatus: "play",
      tableMatrix: 3,
      cellId: 1
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...{
        events: {
          o: {
            winner: "not yet",
            currentPlayer: true,
            movesBitmap: Int8Array.from([2, 0, 0]),
            score: 0
          },
          x: {
            winner: "not yet",
            currentPlayer: false,
            movesBitmap: Int8Array.from([0, 0, 0]),
            score: 0
          }
        }
      }
    });
  });
  it("should handle ROUND_END", () => {
    const action: IActionGameStatus = {
      type: ROUND_END,
      gameStatus: "roundEnd"
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...{ progress: { status: "roundEnd" } }
    });
  });
});
