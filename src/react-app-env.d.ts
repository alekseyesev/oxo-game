/// <reference types="react-scripts" />

type store = { events: IEvents; progress: IProgress; settings: ISettings };

type gameStatus = "ready" | "play" | "roundEnd" | "gameEnd";

type playerId = "o" | "x";

type maxRound = 2 | 3 | 4 | 5 | 6 | 7 | 8;

type winner = "not yet" | "round" | "game";

type bitFilterCache = {
  filter: Array<number>;
  rightShift: number;
};

interface IConstants {
  TABLE_MATRIX: string;
  MAX_SCORE: string;
  MAX_ROUND: string;
  READY: string;
  PLAY: string;
  ROUND_END: string;
  GAME_END: string;
  MOVE: string;
  CHECK_WINNER: string;
  SWITCH_PLAYER: string;
  CALCULATE_PLAYER_SCORE: string;
}

interface ITableProps {
  inProgress?: boolean;
  cellCount: number;
}

interface ICellProps extends ICellClassesProps {
  componentId: number;
  onMove?: () => Function;
}

interface ICellClassesProps {
  active?: boolean;
  oPlayer?: boolean;
  xPlayer?: boolean;
}

interface IScore {
  score: number;
}
interface IMovesBitmap {
  movesBitmap: Int8Array;
}

interface IPlayer {
  playerId: playerId;
}

interface IPlayerData extends IScore, IMovesBitmap {
  currentPlayer: boolean;
  winner: winner;
}

interface ISettings {
  tableMatrix: number;
  maxScore: number;
  maxRound: number;
}

interface IProgress {
  status: gameStatus;
}

interface IEvents {
  o: IPlayerData;
  x: IPlayerData;
}

interface IAction {
  type: string;
}

interface IActionGameStatus extends IAction {
  gameStatus: gameStatus;
}

interface IActionTableMatrix extends IAction {
  rowLength: number;
}

interface IActionMaxScore extends IAction, IScore {}

interface IActionMaxRound extends IAction {
  round: maxRound;
}

interface IActionMove extends IAction {
  tableMatrix: number;
  cellId: number;
}

interface IActionPlayer extends IAction {}

interface IActionCalculatePlayerScore extends IAction, IScore {}

interface IButtonProps {
  text: string;
  additionalClasses?: Array<string>;
  onClick?: () => void;
}
