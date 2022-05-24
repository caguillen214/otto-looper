import React from 'react';
import { BENCHES, CARDS, CARD_TYPES, COMICS, EMPTY_CARD } from './data';
import { moveIfConditionCard, purchaseCard, purchaseRoutineCard, sellCard } from './fetcher';

// the Knuth shuffle algorithm
export const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// method to handle points calculation based on sort order as well as grouping
function calculateScore(groupedHeroes, comics) {
  const correctOrder = [].filter(hero => hero.comics === comics).sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  );

  return groupedHeroes.reduce((score, { name }, index) => {
    const maxPoint = 0;
    const heroIndex = correctOrder.findIndex(hero => hero.name === name);
    const penalty = heroIndex >= 0 ? Math.abs(index - heroIndex) : maxPoint;
    console.log({ name, points: maxPoint - penalty });
    return score + (maxPoint - penalty);
  }, 0);
}

export function getTotalScore(groups, timeLeft) {
  const gameScore = Object.values(COMICS).reduce(
    (sum, comicsName) => sum + calculateScore(groups[comicsName], comicsName),
    0
  );
  const timeBonus = getSeconds(timeLeft);
  return gameScore ? gameScore + timeBonus : 0;
}

export const makeExpBars = (exp, level) => {
  const expBars = [];
  for (let i = 0; i < 3; i++) {
    const toPush = <div key={i} className={i < exp % 3 ? 'exp-bar' : 'exp-bar exp-bar-empty'}></div>
    expBars.push(toPush);
  }
  return expBars;
}

// method to handle to the heroe cards movement
export const move = async (state, source, destination, combine) => {
  const srcListClone = [...state[source.droppableId].slots];
  var destListClone;
  const [combineCardName, combineCardId] = combine.draggableId.split(':');
  destListClone = [...state[combine.droppableId].slots]

  if (source.droppableId === combine.droppableId) {
    let combineInd = combineCardName.includes(CARD_TYPES.EMPTY)
      ? combineCardId 
      : destListClone.findIndex((card) => card.cardId === combineCardId);
    
    // If they are the same card combine, else swap
    if (combineCardName === srcListClone[source.index].name) {
      const [movedElement] = destListClone.splice(source.index, 1, EMPTY_CARD);
      const combinedCard = destListClone[combineInd];
      combinedCard.exp += movedElement.exp;
      combinedCard.conditionExp += movedElement.conditionExp;
      combinedCard.rangeExp += movedElement.rangeExp;
    } else {
      [destListClone[source.index], destListClone[combineInd]] = [destListClone[combineInd], destListClone[source.index]]
    }
  }
  else { // Different source
    if (combineCardName.includes(CARD_TYPES.EMPTY)) {
      const [movedElement] = srcListClone.splice(source.index, 1, EMPTY_CARD);
      // const index = combine.draggableId.charAt(combine.draggableId.length - 1);
      destListClone.splice(combineCardId, 1, movedElement);
    }
    else { // Combine with nonempty and must be the same name
      // If they are the same card combine, else swap
      if (combineCardName === srcListClone[source.index].name) {
        const [movedElement] = srcListClone.splice(source.index, 1, EMPTY_CARD);
        const combinedCard = destListClone.find((card) => card.cardId === combineCardId);
        combinedCard.exp += movedElement.exp;
        combinedCard.conditionExp += movedElement.conditionExp;
        combinedCard.rangeExp += movedElement.rangeExp;
      }
      else {
        return Promise.resolve({selectedCard: null});
      }
      // const combinedCard = destListClone.find((card) => {
      //   return card.cardId === combineCardId;
      // }); 
    }
  }

  let otherResp = {};
  if (combine.droppableId === BENCHES.DISCARD) {
    if (source.droppableId === BENCHES.SHOP) {
      return Promise.resolve({selectedCard: null});
    }
    otherResp = await sellCard(state, srcListClone, source.droppableId === BENCHES.CHARACTER)
  }
  if (source.droppableId === BENCHES.SHOP) {
    otherResp = await purchaseCard(state, destListClone, combine.droppableId === BENCHES.CHARACTER)
  }

  return Promise.resolve({
    ...otherResp,
    selectedCard: null,
    ...(source.droppableId === combine.droppableId
      ? {}
      : {
          [source.droppableId]: {
            ...source,
            slots: srcListClone,
          },
        }),
    [combine.droppableId]: {
      id: combine.droppableId,
      slots: destListClone,
    }
  });
};

// method to get time left
export const getTimeLeft = deadline => deadline - Date.now();

// method to get time left in seconds
export const getSeconds = timeLeft => Math.floor(timeLeft / 1000);

// enums for representing the game state
export const GAME_STATE = {
  READY: 'ready',
  PLAYING: 'playing',
  DONE: 'done',
};
