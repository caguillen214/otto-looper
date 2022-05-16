import { CARDS, CARD_TYPES, COMICS } from './data';

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

// method to handle to the heroe cards movement
export const move = (state, source, destination, combine) => {
  const srcListClone = [...state[source.droppableId].slots];
  var destListClone;
  if (combine) {
    if (combine.draggableId.includes(CARD_TYPES.EMPTY)) {
      destListClone = [...state[combine.droppableId].slots]
      destListClone.splice(source.index, 1);
      // TODO: Change how this works it is a terrible way to get index
      const index = combine.draggableId.charAt(combine.draggableId.length - 1);
      destination = {droppableId: combine.droppableId, index};
    }
  } else {
    destListClone =
      source.droppableId === destination.droppableId
        ? srcListClone
        : [...state[destination.droppableId].slots];
  }
  const [movedElement] = srcListClone.splice(source.index, 1);
  destListClone.splice(destination.index, 0, movedElement);


  return {
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
  };
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
