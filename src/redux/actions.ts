const TABLE_MATRIX: string = "TABLE_MATRIX";
const MAX_SCORE: string = "MAX_SCORE";
const MAX_ROUND: string = "MAX_ROUND";
const READY: string = "READY";
const PLAY: string = "PLAY";
const ROUND_END: string = "ROUND_END";
const GAME_END: string = "GAME_END";
const MOVE: string = "MOVE";
const CHECK_WINNER: string = "CHECK_WINNER";
const SWITCH_PLAYER: string = "SWITCH_PLAYER";
const CALCULATE_PLAYER_SCORE: string = "CALCULATE_PLAYER_SCORE";

export const constants: IConstants = {
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
};

export const tableMatrix = (rowLength: number): IActionTableMatrix => {
  return {
    type: TABLE_MATRIX,
    rowLength
  };
};

export const maxScore = (score: number): IActionMaxScore => {
  return {
    type: MAX_SCORE,
    score
  };
};

export const maxRound = (round: maxRound): IActionMaxRound => {
  return {
    type: MAX_ROUND,
    round
  };
};

export const ready = (): IActionGameStatus => {
  return {
    type: READY,
    gameStatus: "ready"
  };
};

export const play = (): IActionGameStatus => {
  return {
    type: PLAY,
    gameStatus: "play"
  };
};

export const roundEnd = (): IActionGameStatus => {
  return {
    type: ROUND_END,
    gameStatus: "roundEnd"
  };
};

export const gameEnd = (): IActionGameStatus => {
  return {
    type: GAME_END,
    gameStatus: "gameEnd"
  };
};

export const move = (
  tableMatrix: number,
  cellId: number
): IActionMove => {
  return {
    type: MOVE,
    tableMatrix,
    cellId
  };
};

export const checkWinner = (): IActionPlayer => {
  return {
    type: CHECK_WINNER
  };
};

export const calculatePlayerScore = (
  score: number
): IActionCalculatePlayerScore => {
  return {
    type: CALCULATE_PLAYER_SCORE,
    score
  };
};

export const switchPlayer = (): IActionPlayer => {
  return {
    type: SWITCH_PLAYER
  };
};
