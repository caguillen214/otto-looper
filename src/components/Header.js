import React from 'react';
import Button from '@mui/material/Button';

import { GAME_STATE, getSeconds } from '../custom/utils';

const Header = ({ timeLeft, gameState, startBattle, turnCount,  winCount, currentGold}) => (
  <header className="navbar">
    {gameState === GAME_STATE.PLAYING && (
      <>
        <b>Turn #{turnCount} &nbsp;&nbsp; Wins: {winCount}/10</b>
        <div>
          <b>Current Gold: {currentGold}</b>
        </div>
        <Button className="btn btn-default" onClick={startBattle}>
          Start Battle
        </Button>
      </>
    )}
  </header>
);

export default Header;
