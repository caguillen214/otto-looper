import React from 'react';
import { BENCHES, CARDS, CARD_TYPES, COMICS } from './data';
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

const moveIfCond = async (state, source, destination, combine) => {
  // console.log(state);
  // console.log(source);
  // console.log(destination);
  // console.log(combine);
  if (combine) {
    const srcListClone = state[source.droppableId].slots
    const [movedElement] = srcListClone.splice(source.index, 1);
    if (movedElement.name !== 'if') {
      // const sourceCardId = source.droppableId.split(':')[1];
      const combineCardId = combine.draggableId.split(':')[1];
      // const sourceIfCard = state[source.droppableId].slots.find((card) => {
      //     return card.cardId === sourceCardId;
      // });
      const combineIfCard = state[BENCHES.ROUTINE].slots.find((card) => {
          return card.cardId === combineCardId;
      }); 
      // const srcListClone = [...sourceIfCard.slots];
      const combineListClone = [...combineIfCard.slots];
      // const [movedElement] = srcListClone.splice(source.index, 1);
      combineListClone.splice(combine.index, 0, movedElement);
      // sourceIfCard.slots = srcListClone;
      combineIfCard.slots = combineListClone;
      return Promise.resolve({
          ...state
      });
    } else {

    }
    console.log(movedElement);
    return state;
  }
  return await moveIfConditionCard(state, source, destination);
}

// method to handle to the heroe cards movement
export const move = async (state, source, destination, combine) => {
  // if (source?.droppableId.startsWith('if-slots') || combine?.draggableId.startsWith('if')) {
  //   const resp = moveIfCond(state, source, destination, combine);
  //   return resp;
  // }
  const srcListClone = [...state[source.droppableId].slots];
  const [movedElement] = srcListClone.splice(source.index, 1);
  let shouldDoSplice = true;
  var destListClone;
  if (combine) {
    destListClone = [...state[combine.droppableId].slots]
    destination = {droppableId: combine.droppableId}
    if (combine.draggableId.includes(CARD_TYPES.EMPTY)) {
      if (source.droppableId === destination.droppableId) {
        return Promise.resolve({selectedCard: null});
      }
      // TODO: Change how this works it is a terrible way to get index
      const index = combine.draggableId.charAt(combine.draggableId.length - 1);
      destListClone.splice(index, 1);
      destination = {...destination, index};
    } else {
      const combineCardId = combine.draggableId.split(':')[1];
      const combinedCard = destListClone.find((card) => {
        return card.cardId === combineCardId;
      }); 
      console.log(combinedCard)
      if (movedElement.name !== combinedCard.name) {
        return Promise.resolve({selectedCard: null});
      } else {
        combinedCard.exp += movedElement.exp;
        combinedCard.conditionExp += movedElement.conditionExp;
        combinedCard.rangeExp += movedElement.rangeExp;
        shouldDoSplice = false;
      }
    }
  } else {
      destListClone = source.droppableId === destination.droppableId 
        ? srcListClone 
        : [...state[destination.droppableId].slots];
  }

  if (shouldDoSplice) {
    destListClone.splice(destination.index, 0, movedElement);
  }

  if (!combine && source.droppableId !== destination.droppableId ) {
    // Remove an empty slot if needed
    destListClone.splice(destListClone.findIndex((card) => {
      return card.type === 'empty'//CARD_TYPES.EMPTY
    }), 1);
  }

  let otherResp = {};
  if (destination.droppableId === BENCHES.DISCARD) {
    if (source.droppableId === BENCHES.SHOP) {
      return Promise.resolve({selectedCard: null});
    }
    otherResp = await sellCard(state, srcListClone, source.droppableId === BENCHES.CHARACTER)
  }
  if (source.droppableId === BENCHES.SHOP && destination.droppableId) {
    console.log(destListClone)
    otherResp = await purchaseCard(state, destListClone, destination.droppableId === BENCHES.CHARACTER)
  }

  return Promise.resolve({
    ...otherResp,
    selectedCard: null,
    [source.droppableId]: {
      ...source,
      slots: srcListClone,
    },
    ...(source.droppableId === destination.droppableId
      ? {}
      : {
          [destination.droppableId]: {
            ...destination,
            slots: destListClone,
          }
        }),
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
