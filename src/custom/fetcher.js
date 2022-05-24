import * as constants from "./data";
import { BENCHES, EMPTY_CARD, CARDS, GAME_STATE } from "./data";
import { shuffle } from "./utils";

export const startNewGame = async () => {
    const state = {
        [BENCHES.SHOP]: {
            id: BENCHES.SHOP,
            slots: shuffle(CARDS).slice(0, 5).map((c) => ({...c, cardId: `${Math.random()}`})),
        },
        [BENCHES.ROUTINE]: {
            id: BENCHES.ROUTINE,
            // slots: [EMPTY_CARD,  EMPTY_CARD, constants.IF_CARD_WITH_ONE_SUB, EMPTY_CARD, constants.IF_CARD_WITH_ONE_SUB2, EMPTY_CARD, EMPTY_CARD]
            // slots: [EMPTY_CARD, EMPTY_CARD, constants.IF_CARD_WITH_ONE_SUB, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
            slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
        },      
        [BENCHES.COMMAND]: {
            id: BENCHES.COMMAND,
            slots: [EMPTY_CARD, EMPTY_CARD, constants.IF_CARD_WITH_ONE_SUB, EMPTY_CARD, EMPTY_CARD,constants.IF_CARD_WITH_ONE_SUB2, EMPTY_CARD]
            // slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
        },
        [BENCHES.CHARACTER]: {
            id: BENCHES.CHARACTER,
            slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
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
        gameId: '',
        turnCount: 1,
        winCount: 0,
        selectedCard: null,
        gameState: GAME_STATE.PLAYING,
        timeLeft: 0,
    };
    return Promise.resolve(state);
}

export const rollShop = async (gold) => { // TODO dont actually use gold here
    return Promise.resolve({
        [BENCHES.SHOP]: {
            id: BENCHES.SHOP,
            slots: shuffle(CARDS).slice(0, 5).map((c) => ({...c, cardId: ''+Math.random()})),
        },
        gold: gold - 1,
    });
}

export const startRound = async () => {
    return Promise.resolve({});
}

export const moveIfConditionCard = async (state, source, destination) => {
    const sourceCardId = source.droppableId.split(':')[1];
    const destinationCardId = destination.droppableId.split(':')[1];
    const sourceIfCard = state[BENCHES.ROUTINE].slots.find((card) => {
        return card.cardId === sourceCardId;
    });
    const destinationIfCard = state[BENCHES.ROUTINE].slots.find((card) => {
        return card.cardId === destinationCardId;
    }); 
    const srcListClone = [...sourceIfCard.slots];
    const destListClone = source.droppableId === destination.droppableId ?
        srcListClone
        : [...destinationIfCard.slots];
    const [movedElement] = srcListClone.splice(source.index, 1);
    destListClone.splice(destination.index, 0, movedElement);
    sourceIfCard.slots = srcListClone;
    destinationIfCard.slots = destListClone;
    return Promise.resolve({
        ...state
    });
}

export const mergeCard = async () => {
    return Promise.resolve({});
}

export const sellCard = async (state, characterCards, isCharacterBuy) => {
    const baseStats = {
        attack: 2,
        dexterity: 2,
        health: 2,
        gold: 10,
        heal: 2,
    };
    characterCards.forEach((card) => {
        if (card.attack) {
            baseStats.attack += card.attack
        }
        if (card.dexterity) {
            baseStats.dexterity += card.dexterity
        }
        if (card.health) {
            baseStats.health += card.health
        }
        if (card.heal) {
            baseStats.heal += card.heal
        }
        if (card.gold) {
            baseStats.gold += card.gold
        }
    })
    console.log(state);
    return await Promise.resolve({
        character_stats: {
            ...state.character_stats,
            ...(isCharacterBuy ? baseStats : {}),
        },
        gold: state.gold+1,
    });
}

export const purchaseCard = async (state, characterCards, isCharacterBuy) => { // TODO dont actually use gold here
    const baseStats = {
        attack: 2,
        dexterity: 2,
        health: 2,
        gold: 10,
        heal: 2,
    };
    characterCards.forEach((card) => {
        if (card.attack) {
            baseStats.attack += card.attack
        }
        if (card.dexterity) {
            baseStats.dexterity += card.dexterity
        }
        if (card.health) {
            baseStats.health += card.health
        }
        if (card.heal) {
            baseStats.heal += card.heal
        }
        if (card.gold) {
            baseStats.gold += card.gold
        }
    })
    console.log(state);
    return await Promise.resolve({
        character_stats: {
            ...state.character_stats,
            ...(isCharacterBuy ? baseStats : {}),
        },
        gold: state.gold-3,
    });
}