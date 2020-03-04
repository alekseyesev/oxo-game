import { combineReducers } from "redux";
import { constants } from "./actions";
import { calculateScore, calculateMovesBitmap, getWinnerStatus } from "./reducer-utils";

const {
  TABLE_MATRIX,
  MAX_SCORE,
  MAX_ROUND,
  READY,
  PLAY,
  ROUND_END,
  GAME_END,
  MOVE,
  CHECK_WINNER,
  CALCULATE_PLAYER_SCORE,
  SWITCH_PLAYER
} = constants;

const settings = (
  state: ISettings = { tableMatrix: 3, maxScore: 1, maxRound: 2 },
  action: IActionTableMatrix & IActionMaxScore & IActionMaxRound
): ISettings => {
  switch (action.type) {
    case TABLE_MATRIX:
      return { ...state, ...{ tableMatrix: action.rowLength } };
    case MAX_SCORE:
      return { ...state, ...{ maxScore: action.score } };
    case MAX_ROUND:
      return { ...state, ...{ maxRound: action.score } };
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
    case ROUND_END:
    case GAME_END:
      return { ...state, ...{ status: action.gameStatus } };
    default:
      return state;
  }
};

const events = (
  state: IEvents = {
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
  action: IActionMove & IActionPlayer & IActionCalculatePlayerScore
): IEvents => {
  let playerId: playerId = (state.o.currentPlayer && "o") || "x";
  switch (action.type) {
    case MOVE:
      return {
        ...state,
        ...{
          [playerId]: {
            ...state[playerId],
            ...{
              movesBitmap: calculateMovesBitmap(
                state[playerId].movesBitmap,
                action.tableMatrix,
                action.cellId
              )
            }
          }
        }
      };
    case CHECK_WINNER:
      return {
        ...state,
        ...{
          [playerId]: {
            ...state[playerId],
            ...{
              winner: getWinnerStatus(state[playerId].movesBitmap)
            }
          }
        }
      };
    case SWITCH_PLAYER:
      return {
        ...state,
        ...{
          [playerId]: {
            ...state[playerId],
            ...{
              currentPlayer: false
            }
          },
          [playerId === "o" ? "x" : "o"]: {
            ...state[playerId === "o" ? "x" : "o"],
            ...{
              currentPlayer: true
            }
          }
        }
      };
    case CALCULATE_PLAYER_SCORE:
      playerId = (state.o.currentPlayer && "x") || "o";
      return {
        ...state,
        ...{
          [playerId]: {
            ...state[playerId],
            ...{
              score:
                (state[playerId].score = calculateScore(
                  state[playerId].score,
                  action.score
                )) && state[playerId].score
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
