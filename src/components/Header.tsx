import React from "react";
import Player from "./Player";
import WithScore from "./hoc/WithScore";
import { ReactComponent as Logo } from "../logo.svg";

const Header: React.FC<{}> = () => {
  const PlayerOWithScore: React.FC<IPlayerProps | {}> = WithScore(Player, "o");
  const PlayerXWithScore: React.FC<IPlayerProps | {}> = WithScore(Player, "x");
  return (
    <header className="oxo__header">
      <PlayerOWithScore />
      <div className="oxo__logo">
        <Logo />
      </div>
      <PlayerXWithScore />
    </header>
  );
};

export default Header;
