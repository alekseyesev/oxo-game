import React, { useCallback } from "react";
import { Action, Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { switchPlayer, move, checkWinner } from "../../redux/actions";

const inProgressSelector = createSelector(
  [(state: store): gameStatus => state.progress.status],
  (gameStatus): boolean => gameStatus === "play"
);

const classMapSelector = createSelector(
  [
    (store: store, props: ICellProps): boolean => {
      const { componentId } = props;
      const { tableMatrix } = store.settings;
      const rowIndex: number = Math.floor(componentId / tableMatrix);
      const row: number = store.events.o.movesBitmap[rowIndex];
      const indexInRow: number = componentId < tableMatrix ? componentId : componentId % tableMatrix;
      const sampleToCheck: number = 2 ** (tableMatrix - 1 - indexInRow);
      return (row & sampleToCheck) > 0;
    },
    (store: store, props: ICellProps): boolean => {
      const { componentId } = props;
      const { tableMatrix } = store.settings;
      const rowIndex: number = Math.floor(componentId / tableMatrix);
      const row: number = store.events.x.movesBitmap[rowIndex];
      const indexInRow: number = componentId < tableMatrix ? componentId : componentId % tableMatrix;
      const sampleToCheck: number = 2 ** (tableMatrix - 1 - indexInRow);
      return (row & sampleToCheck) > 0;
    }
  ],
  (oPlayer: boolean, xPlayer: boolean): ICellClassesProps => {
    const active: boolean = oPlayer || xPlayer;
    return { active, oPlayer, xPlayer };
  }
);

const WithMark: Function = (Component: React.FC<any>): React.FC<ICellProps> => {
  const ComponentWithMark: React.FC<ICellProps> = componentProps => {
    const { componentId } = componentProps;
    const tableMatrix: number = useSelector(
      (state: store) => state.settings.tableMatrix
    );
    const inProgress: boolean = useSelector(inProgressSelector);
    const classMap = useSelector((state: store) => classMapSelector(state, { componentId }));
    const dispatch: Dispatch<Action> = useDispatch();
    const placeMark = useCallback(() => {
      return inProgress
        ? () => {
            dispatch(move(tableMatrix, componentId));
            dispatch(checkWinner());
            dispatch(switchPlayer());
          }
        : () => {};
    }, [dispatch, inProgress, tableMatrix, componentId]);

    return (
      <Component onMove={placeMark} {...classMap} {...componentProps} />
    );
  };
  return ComponentWithMark;
};

export default WithMark;
