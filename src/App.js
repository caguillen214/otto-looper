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

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of heroes
  [BENCHES.SHOP]: {
    id: BENCHES.SHOP,
    slots: shuffle(CARDS),
  },
  [BENCHES.ROUTINE]: {
    id: BENCHES.ROUTINE,
    slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
  },
  [BENCHES.CHARACTER]: {
    id: BENCHES.CHARACTER,
    slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
  },
  gameId: '',
  turnCounter: 1,
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
    const rerollResp = await rollShop(gameData['character_stats'].gold); // TODO dont actually send gold
    setGameData((state) => ({
      ...state,
      ...rerollResp,
    }));
  };

  const onDragStart = useCallback((prop) => {
    const { source } = prop;
    setGameData((state) => {
      const selectedCard =  state[source.droppableId]?.slots[source.index];
      return {
        ...state,
        selectedCard,
      }
    })
  }, []);

  const onDragEnd = useCallback(({ source, destination, combine }) => {
    // the only one that is required
    if (!destination && !combine) {
      console.log('no dest')
      return;
    }
    if (combine) {
      // debugger;
    }

    setGameData((state) => {
      let resp = move(state, source, destination, combine);//.then((thing) => {resp = thing})
      return {...state, ...resp};
    });
  }, []);
  
  const { gameState, timeLeft, bench, ...groups } = gameData;
  const isDropDisabled = gameState === GAME_STATE.DONE;
  return (
    <>
      <Header gameState={gameState} timeLeft={timeLeft} endGame={endGame} />
      {( true || gameData.gameState === GAME_STATE.PLAYING ||
        gameData.gameState === GAME_STATE.DONE) && (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <div className="container">
            <div className="columns">
              <RoutineBench
                id={BENCHES.ROUTINE}
                selectedCard={gameData.selectedCard}
                cards={gameData[BENCHES.ROUTINE].slots}
                isDropDisabled={isDropDisabled}
              />
              <CharacterBench
                id={BENCHES.CHARACTER}
                characterStats={gameData[constants.CHARACTER_STATS]}
                selectedCard={gameData.selectedCard}
                cards={gameData[BENCHES.CHARACTER].slots}
                isDropDisabled={isDropDisabled}
              />
            </div>
            <div className='column col-12' style={{marginTop: '16px'}}>
              <button onClick={onRerollShop}>Reroll Shop</button>
            </div>
            <ShopBench 
              id={BENCHES.SHOP}
              selectedCard={gameData.selectedCard}
              cards={gameData[BENCHES.SHOP].slots}
              isDropDisabled={isDropDisabled} />
          </div>
        </DragDropContext>
      )}
      <Footer />
    </>
  );
}

export default App;
