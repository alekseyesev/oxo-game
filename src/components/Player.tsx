import React from "react";

const Player: React.FC<IPlayerProps> = props => {
  const { playerId, score } = props;
  return (
    <div className="player">
      <div className="player__name">Игрок {playerId.toUpperCase()}</div>
      <div className="player__score">{score}</div>
    </div>
  );
};

export default Player;
