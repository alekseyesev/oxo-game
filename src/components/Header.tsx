import React from "react";
import { ReactComponent as Logo } from "./logo.svg";

const Header: React.FC<{}> = () => {
  return (
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
  );
};

export default Header;
