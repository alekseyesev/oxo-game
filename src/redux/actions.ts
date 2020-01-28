const TABLE_MATRIX: string = "TABLE_MATRIX";
const MAX_SCORE: string = "MAX_SCORE";
const READY: string = "READY";
const PLAY: string = "PLAY";
const MOVE: string = "MOVE";
const ROUND_END: string = "ROUND_END";

export const constants: Array<string> = [
  TABLE_MATRIX,
  MAX_SCORE,
  READY,
  PLAY,
  MOVE,
  ROUND_END
];

export const tableMatrix = (rowLength: number): ITableMatrix => {
  return {
    type: TABLE_MATRIX,
    rowLength
  };
};

export const maxScore = (score: number): IMaxScore => {
  return {
    type: MAX_SCORE,
    score
  };
};

export const ready = (gameStatus: gameStatus): IActionGameStatus => {
  return {
    type: READY,
    gameStatus
  };
};

export const play = (gameStatus: gameStatus): IActionGameStatus => {
  return {
    type: PLAY,
    gameStatus
  };
};

export const move = (
  playerId: playerId,
  tableMatrix: number,
  cellId: number
): IActionMove => {
  return {
    type: MOVE,
    playerId,
    tableMatrix,
    cellId
  };
};

export const roundEnd = (
  playerId: playerId,
  score: number
): IActionRoundEnd => {
  return {
    type: ROUND_END,
    playerId,
    score
  };
};
