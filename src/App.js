import React, {useState, useCallback, useEffect} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import * as constants from "./custom/data";
import { CARDS, BENCHES, EMPTY_CARD } from './custom/data';
import { shuffle, move, GAME_STATE } from './custom/utils';

import Modal from './components/Modal';
import Header from './components/Header';
import RoutineBench from './components/RoutineBench';
import ShopBench from './components/ShopBench';
import CharacterBench from './components/CharacterBench';
import Footer from './components/Footer';
import { rollShop, startNewGame } from './custom/fetcher';
import CommandBench from './components/CommandBench';
import DiscardBench from './components/DiscardBench';
import UltBench from './components/UltBench';

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of heroes
  [BENCHES.SHOP]: {
    id: BENCHES.SHOP,
    slots: shuffle(CARDS).slice(0, 5),
  },
  [BENCHES.ROUTINE]: {
    id: BENCHES.ROUTINE,
    slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
  },  
  [BENCHES.COMMAND]: {
    id: BENCHES.COMMAND,
    slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
  },
  [BENCHES.CHARACTER]: {
    id: BENCHES.CHARACTER,
    slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
  },
  [BENCHES.DISCARD]: {
    id: BENCHES.DISCARD,
    slots: []
  },
  [BENCHES.ULT]: {
    id: BENCHES.ULT,
    slots: []
  },
  [constants.CHARACTER_STATS]: {
    [constants.ATTACK]: 2,
    [constants.DEXTERITY]: 2,
    [constants.HEALTH]: 2,
    [constants.GOLD]: 10,
    [constants.HEAL]: 2,
  },
  gold: 10,
  gameId: '',
  turnCount: 1,
  winCount: 0,
  selectedCard: null,
  gameState: GAME_STATE.READY,
  timeLeft: 0,
};

function App() {
  // const initialState = await startNewGame();
  const [gameData, setGameData] = useState(initialState);

  const startGame = async () => {
    const startNewGameResp = await startNewGame();
    setGameData(gameData => 
      ({
        ...gameData,
        ...startNewGameResp
      })
    );
  };
  
  useEffect(() => {
    startGame();
  }, []);

  const endGame = () => {

    setGameData(gameData => 
      ({
        ...gameData,
        gameState: GAME_STATE.DONE,
      })
    );
  };

  const resetGame = () => {
    // setState(initialState);
  };

  const onRerollShop = async () => {
    const rerollResp = await rollShop(gameData.gold); // TODO dont actually send gold
    setGameData((state) => ({
      ...state,
      ...rerollResp,
    }));
  };

  const onDragStart = (prop) => {
    const { source } = prop;
    setGameData((state) => {
      const selectedCard =  state[source.droppableId]?.slots[source.index];
      return {
        ...state,
        selectedCard,
      }
    })
  };

  const onDragEnd = ({ source, destination, combine }) => {
    // the only one that is required
    if (!combine) {
      setGameData((state) => ({...state, selectedCard: null}))
      return;
    }
    move(gameData, source, destination, combine).then((resp) => {
      setGameData((state) => {
        // let resp = move(state, source, destination, combine);//.then((thing) => {resp = thing})
        return {...state, ...resp};
      });
    })
    // setGameData((state) => {
    //   let resp = move(state, source, destination, combine);//.then((thing) => {resp = thing})
    //   return {...state, ...resp};
    // });
  };
  
  const { gameState, timeLeft, bench, ...groups } = gameData;
  const isDropDisabled = gameState === GAME_STATE.DONE;
  return (
    <>
      <Header
        gameState={gameState}
        timeLeft={timeLeft}
        endGame={endGame}
        currentGold={gameData.gold}
        turnCount={gameData.turnCount}
        winCount={gameData.winCount}/>
      {( gameData.gameState === GAME_STATE.PLAYING ) && (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <div className="container">
            <div className="columns">
              <div className="columns column col-8 routine-container">
                <div className="divider col-12" data-content={'ROUTINE'} />
                <div className="column col-10">
                  <CommandBench
                    id={BENCHES.COMMAND}
                    selectedCard={gameData.selectedCard}
                    cards={gameData[BENCHES.COMMAND].slots}
                    isDropDisabled={isDropDisabled}
                  />
                  <RoutineBench
                    id={BENCHES.ROUTINE}
                    selectedCard={gameData.selectedCard}
                    cards={gameData[BENCHES.ROUTINE].slots}
                    isDropDisabled={isDropDisabled}
                  />
                </div>
                <UltBench
                  id={BENCHES.ULT}
                  cards={gameData[BENCHES.ULT].slots}
                  selectedCard={gameData.selectedCard}
                  isDropDisabled={isDropDisabled} />
                <div className="columns column col-12">
                  <ShopBench 
                    id={BENCHES.SHOP}
                    selectedCard={gameData.selectedCard}
                    cards={gameData[BENCHES.SHOP].slots}
                    isDropDisabled={isDropDisabled} />
                  <DiscardBench 
                    id={BENCHES.DISCARD}
                    selectedCard={gameData.selectedCard}
                    isDropDisabled={isDropDisabled} />
                </div>
                <div className='column col-12' style={{marginTop: '16px'}}>
                  <button onClick={onRerollShop}>Reroll Shop</button>
                </div>
              </div>
              <CharacterBench
                id={BENCHES.CHARACTER}
                characterStats={gameData[constants.CHARACTER_STATS]}
                selectedCard={gameData.selectedCard}
                cards={gameData[BENCHES.CHARACTER].slots}
                level={~~(gameData.turnCount / 3)+1}
                isDropDisabled={isDropDisabled}
              />
            </div>

          </div>
        </DragDropContext>
      )}
      <Footer />
    </>
  );
}

export default App;
