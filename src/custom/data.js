export const CHARACTER_STATS = 'character_stats';
export const ATTACK = 'attack';
export const DEXTERITY = 'dexterity';
export const HEALTH = 'health';
export const GOLD = 'gold';
export const HEAL = 'heal';

export const GAME_STATE = {
  READY: 'ready',
  PLAYING: 'playing',
  DONE: 'done',
};

export const BENCHES = {
  SHOP: 'shop',
  CHARACTER: 'character',
  ROUTINE: 'routine',
};

export const COMICS = {
  DC: 'dc',
  MARVEL: 'marvel',
};

export const CARD_TYPES = {
  ROUTINE: 'routine',
  STAT_MOD: 'stat_mod',
  EMPTY: 'empty',
}

export const EMPTY_CARD = {
  name: 'empty',
  type: CARD_TYPES.EMPTY
}

export const IF_CARD_WITH_ONE_SUB = {
  name: 'if',
  type: CARD_TYPES.ROUTINE,
  cardId: `${Math.random()}`,
  slots: [
    {
      name: 'atk',
      type: CARD_TYPES.ROUTINE,
      cardId: `${Math.random()}`,
      exp: 1,
    }
  ],
  conditionExp: 1,
  rangeExp: 1,
};
export const IF_CARD_WITH_ONE_SUB2 = {
  name: 'if',
  type: CARD_TYPES.ROUTINE,
  cardId: `${Math.random()}`,
  slots: [
    {
      name: 'block',
      type: CARD_TYPES.ROUTINE,
      cardId: `${Math.random()}`,
      exp: 1,
    }
  ],
  conditionExp: 4,
  rangeExp: 1,
};

export const CARDS = [
  {
    name: 'if',
    type: CARD_TYPES.ROUTINE,
    cardId: `${Math.random()}`,
  },
  {
    name: 'atk1',
    type: CARD_TYPES.STAT_MOD,
    cardId: `${Math.random()}`,
  },
  {
    name: 'atk2',
    type: CARD_TYPES.STAT_MOD,
    cardId: `${Math.random()}`,
  },
  {
    name: 'block1',
    type: CARD_TYPES.STAT_MOD,
    cardId: `${Math.random()}`,
  },
  {
    name: 'atk',
    type: CARD_TYPES.ROUTINE,
    cardId: `${Math.random()}`,
  },
  {
    name: 'block',
    type: CARD_TYPES.ROUTINE,
    cardId: `${Math.random()}`,
  },
];
