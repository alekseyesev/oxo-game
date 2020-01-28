import { constants } from "./actions";
import reducer from "./reducers";

const [TABLE_MATRIX, MAX_SCORE, READY, PLAY, MOVE, ROUND_END] = constants;

const initialState: {
  events: IEvents;
  progress: IProgress;
  settings: ISettings;
} = {
  events: {
    o: { movesBitmap: Int8Array.from([0, 0, 0]), score: 0 },
    x: { movesBitmap: Int8Array.from([0, 0, 0]), score: 0 }
  },
  progress: { status: "ready" },
  settings: { maxScore: 1, tableMatrix: 3 }
};

describe("oxo reducer", () => {
  it("should return the initial state", () => {
    expect(
      reducer(
        undefined,
        {} as
          | (ITableMatrix & IMaxScore)
          | IActionGameStatus
          | (IActionMove & IActionRoundEnd)
      )
    ).toEqual(initialState);
  });
  it("should handle TABLE_MATRIX", () => {
    const action: ITableMatrix & IMaxScore = {
      type: TABLE_MATRIX,
      rowLength: 8,
      score: 1
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...{ settings: { maxScore: 1, tableMatrix: 8 } }
    });
  });
  it("should handle MAX_SCORE", () => {
    const action: ITableMatrix & IMaxScore = {
      type: MAX_SCORE,
      rowLength: 3,
      score: 10
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...{ settings: { maxScore: 10, tableMatrix: 3 } }
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
    const action: IActionMove & IActionRoundEnd = {
      type: MOVE,
      playerId: "o",
      score: 0,
      tableMatrix: 3,
      cellId: 1
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...{
        events: {
          o: { movesBitmap: Int8Array.from([2, 0, 0]), score: 0 },
          x: { movesBitmap: Int8Array.from([0, 0, 0]), score: 0 }
        }
      }
    });
  });
  it("should handle ROUND_END", () => {
    const action: IActionMove & IActionRoundEnd = {
      type: ROUND_END,
      playerId: "x",
      score: 1,
      tableMatrix: -1,
      cellId: -1
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...{
        events: {
          o: { movesBitmap: Int8Array.from([0, 0, 0]), score: 0 },
          x: { movesBitmap: Int8Array.from([0, 0, 0]), score: 1 }
        }
      }
    });
  });
});
