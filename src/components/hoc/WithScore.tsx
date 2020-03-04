import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const WithScore: Function = (
  Component: React.FC<any>,
  playerId: playerId
): React.FC<IPlayerProps> => {
  const scoreSelector = createSelector(
    [(state: store): IEvents => state.events],
    (events): number => events[playerId].score
  );

  const ComponentWithScore: React.FC<IPlayerProps> = componentProps => {
    const score: number = useSelector(scoreSelector);

    return <Component playerId={playerId} score={score} {...componentProps} />;
  };
  return ComponentWithScore;
};

export default WithScore;
