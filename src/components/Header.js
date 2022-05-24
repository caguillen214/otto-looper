import React from 'react';

import { GAME_STATE, getSeconds } from '../custom/utils';

const Header = ({ timeLeft, gameState, startBattle, turnCount,  winCount, currentGold}) => (
  <header className="navbar">
    {gameState === GAME_STATE.PLAYING && (
      <>
        <b>Turn #{turnCount} &nbsp;&nbsp; Wins: {winCount}/10</b>
        <div>
          <b>Current Gold: {currentGold}</b>
        </div>
        <button className="btn btn-default" onClick={startBattle}>
          Start Battle
        </button>
      </>
    )}
  </header>
);

export default Header;
