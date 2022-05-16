import React from 'react';

import { GAME_STATE, getSeconds } from '../custom/utils';

const Header = ({ timeLeft, gameState, endGame }) => (
  <header className="navbar">
    {gameState === GAME_STATE.PLAYING && (
      <>
        Some Header stuff
        <button className="btn btn-default" onClick={endGame}>
          End Game
        </button>
      </>
    )}
  </header>
);

export default Header;
