import React from "react";
import Table from "./components/Table";
import WithCellCountAndProgress from "./components/hoc/WithCellCountAndProgress";
import Button from "./components/Button";
import WithAction from "./components/hoc/WithAction";
import { Action, Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { roundEnd, calculatePlayerScore } from "./redux/actions";
import { ReactComponent as Logo } from "./logo.svg";

const shouldRoundEndSelector = createSelector(
  [
    (store: store): winner => store.events.o.winner,
    (store: store): winner => store.events.x.winner
  ],
  (oWinner, xWinner): boolean => oWinner !== "not yet" || xWinner !== "not yet"
);

const App: React.FC = () => {
  const shouldRoundEnd = useSelector(shouldRoundEndSelector);
  const dispatch: Dispatch<Action> = useDispatch();
  const TableWithCellCountAndProgress: React.FC = WithCellCountAndProgress(
    Table
  );
  const ButtonWithActionReady: React.FC<IButtonProps> = WithAction(
    Button,
    "ready"
  );
  const ButtonWithActionPlay: React.FC<IButtonProps> = WithAction(
    Button,
    "play"
  );

  shouldRoundEnd && dispatch(roundEnd()) && dispatch(calculatePlayerScore(1));

  return (
    <div className="oxo">
      <header className="oxo__header">
        <div className="player">
          <div className="player__name">Игрок O</div>
          <div className="player__score">0</div>
        </div>
        <div className="oxo__logo">
          <Logo />
        </div>
        <div className="player">
          <div className="player__name">Игрок X</div>
          <div className="player__score">0</div>
        </div>
      </header>
      <TableWithCellCountAndProgress />
      <div className="oxo__action-panel action-panel">
        <ButtonWithActionReady additionalClasses={["action-panel__button"]} text="Начать игру" />
        <ButtonWithActionPlay additionalClasses={["action-panel__button"]} text="Завершить игру" />
      </div>
    </div>
  );
};

export default App;
