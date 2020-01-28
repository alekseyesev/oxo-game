import { combineReducers } from "redux";
import { constants } from "./actions";
import { calculateScore, calculateMovesBitmap } from "./reducer-utils";

const [TABLE_MATRIX, MAX_SCORE, READY, PLAY, MOVE, ROUND_END] = constants;

const settings = (
  state: ISettings = { tableMatrix: 3, maxScore: 1 },
  action: ITableMatrix & IMaxScore
): ISettings => {
  switch (action.type) {
    case TABLE_MATRIX:
      return { ...state, ...{ tableMatrix: action.rowLength } };
    case MAX_SCORE:
      return { ...state, ...{ maxScore: action.score } };
    default:
      return state;
  }
};

const progress = (
  state: IProgress = { status: "ready" },
  action: IActionGameStatus
): IProgress => {
  switch (action.type) {
    case READY:
    case PLAY:
      return { ...state, ...{ status: action.gameStatus } };
    default:
      return state;
  }
};

const events = (
  state: IEvents = {
    o: { movesBitmap: new Int8Array([0, 0, 0]), score: 0 },
    x: { movesBitmap: new Int8Array([0, 0, 0]), score: 0 }
  },
  action: IActionMove & IActionRoundEnd
): IEvents => {
  switch (action.type) {
    case MOVE:
      return {
        ...state,
        ...{
          [action.playerId]: {
            ...state[action.playerId],
            ...{
              movesBitmap: calculateMovesBitmap(
                state[action.playerId].movesBitmap,
                action.tableMatrix,
                action.cellId
              )
            }
          }
        }
      };
    case ROUND_END:
      return {
        ...state,
        ...{
          [action.playerId]: {
            ...state[action.playerId],
            ...{
              score:
                (state[action.playerId].score = calculateScore(
                  state[action.playerId].score,
                  action.score
                )) && state[action.playerId].score
            }
          }
        }
      };
    default:
      return state;
  }
};

const reducers = {
  settings,
  progress,
  events
};

const oxoReducers = combineReducers(reducers);

export default oxoReducers;
