import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const cellCountSelector = createSelector(
  (store: store): number => store.settings.tableMatrix,
  (tableMatrix: number): number => tableMatrix ** 2
);

const inProgressSelector = createSelector(
  (store: store): gameStatus => store.progress.status,
  (status: gameStatus): boolean => status === "play"
);

const WithCellCountAndProgress: Function = (
  Component: React.FC<any>
): React.FC<ITableProps> => {
  const ComponentWithCellCountAndProgress: React.FC<ITableProps> = componentProps => {
    const cellCount: number = useSelector(cellCountSelector);
    const inProgress: boolean = useSelector(inProgressSelector);
    return <Component cellCount={cellCount} inProgress={inProgress} {...componentProps} />;
  };
  return ComponentWithCellCountAndProgress;
};

export default WithCellCountAndProgress;
