export const CHARACTER_STATS = 'character_stats';
export const ATTACK = 'attack';
export const DEXTERITY = 'dexterity';
export const HEALTH = 'health';
export const GOLD = 'gold';
export const HEAL = 'heal';
export const ARMOR = 'armor';

export const GAME_STATE = {
  READY: 'ready',
  PLAYING: 'playing',
  BATTLE: 'battle',
  DONE: 'done',
};

export const BENCHES = {
  SHOP: 'shop',
  CHARACTER: 'character',
  ROUTINE: 'routine',
  COMMAND: 'command',
  DISCARD: 'discard',
  ULT: 'ult',
};

export const COMICS = {
  DC: 'dc',
  MARVEL: 'marvel',
};

export const CARD_TYPES = {
  ROUTINE: 'routine',
  COMMAND: 'command',
  CHARACTER: 'character',
  EMPTY: 'empty',
  ULT: 'ult',
}

export const IF_CONDITIONS = [
    'IS ATTACK',
    'IS BLOCK',
    'IS CHARGE',
    'HAS MORE ATTACK',
    'HAS MORE HEALTH',
  ];

export const EMPTY_CARD = {
  name: 'empty',
  type: CARD_TYPES.EMPTY
}

export const IF_CARD_WITH_ONE_SUB = {
  name: 'if',
  type: CARD_TYPES.COMMAND,
  cardId: `${Math.random()}`,
  slots: [
    // {
    //   name: 'atk',
    //   type: CARD_TYPES.COMMAND,
    //   cardId: `${Math.random()}`,
    //   exp: 1,
    // }
  ],
  conditionExp: 1,
  rangeExp: 4,
  condition: 3,
  targettingEnemy: false,
};
export const IF_CARD_WITH_ONE_SUB2 = {
  name: 'if',
  type: CARD_TYPES.COMMAND,
  cardId: `${Math.random()}`,
  slots: [
    // {
    //   name: 'block',
    //   type: CARD_TYPES.ROUTINE,
    //   cardId: `${Math.random()}`,
    //   exp: 1,
    // }
  ],
  conditionExp: 4,
  rangeExp: 1,
  condition: 0,
  targettingEnemy: true,
};

export const CARDS = [
  {
    name: 'if',
    type: CARD_TYPES.COMMAND,
    cardId: `${Math.random()}`,
    conditionExp: 1,
    rangeExp: 1,
    slots: [],
    condition: 0,
    targettingEnemy: true,
  },  
  {
    name: 'loop',
    type: CARD_TYPES.COMMAND,
    cardId: `${Math.random()}`,
    counterExp: 4,
    rangeExp: 7,
  },
  {
    name: 'atk1',
    type: CARD_TYPES.CHARACTER,
    cardId: `${Math.random()}`,
    exp: 1,
    attack: 1,
  },
  {
    name: 'health1',
    type: CARD_TYPES.CHARACTER,
    cardId: `${Math.random()}`,
    exp: 1,
    health: 1,
  },
  {
    name: 'gold1',
    type: CARD_TYPES.CHARACTER,
    cardId: `${Math.random()}`,
    exp: 1,
    gold: 1,
  },
  {
    name: 'atk2',
    type: CARD_TYPES.CHARACTER,
    cardId: `${Math.random()}`,
    exp: 1,
    attack: 2,
  },
  {
    name: 'block1',
    type: CARD_TYPES.CHARACTER,
    cardId: `${Math.random()}`,
    exp: 1,
    dexterity: 1,
  },
  {
    name: 'ult1',
    type: CARD_TYPES.ULT,
    cardId: `${Math.random()}`,
    exp: 1,
  },
  {
    name: 'ult2',
    type: CARD_TYPES.ULT,
    cardId: `${Math.random()}`,
    exp: 1,
  },
  {
    name: 'atk',
    type: CARD_TYPES.ROUTINE,
    cardId: `${Math.random()}`,
    exp: 1,
  },
  {
    name: 'block',
    type: CARD_TYPES.ROUTINE,
    cardId: `${Math.random()}`,
    exp: 1,
  },
  {
    name: 'heal',
    type: CARD_TYPES.ROUTINE,
    cardId: `${Math.random()}`,
    exp: 1,
    heal: 1,
  },
];

export const newAttackCard = () => ({
  name: 'atk',
  type: CARD_TYPES.ROUTINE,
  cardId: `${Math.random()}`,
  exp: 1,
})
export const newBlockCard = () => ({
  name: 'block',
  type: CARD_TYPES.ROUTINE,
  cardId: `${Math.random()}`,
  exp: 1,
})