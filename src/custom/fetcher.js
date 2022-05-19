import * as constants from "./data";
import { BENCHES, EMPTY_CARD, CARDS, GAME_STATE } from "./data";
import { shuffle } from "./utils";

export const startNewGame = async () => {
    const state = {
        [BENCHES.SHOP]: {
            id: BENCHES.SHOP,
            slots: shuffle(CARDS).map((c) => ({...c, cardId: `${Math.random()}`})),
        },
        [BENCHES.ROUTINE]: {
            id: BENCHES.ROUTINE,
            // slots: [EMPTY_CARD, constants.IF_CARD_WITH_ONE_SUB, EMPTY_CARD, constants.IF_CARD_WITH_ONE_SUB2, EMPTY_CARD, EMPTY_CARD]
            slots: [EMPTY_CARD, constants.IF_CARD_WITH_ONE_SUB, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
            // slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
        },
        [BENCHES.CHARACTER]: {
            id: BENCHES.CHARACTER,
            slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
        },
        [constants.CHARACTER_STATS]: {
            [constants.ATTACK]: 2,
            [constants.DEXTERITY]: 2,
            [constants.HEALTH]: 2,
            [constants.GOLD]: 10,
            [constants.HEAL]: 2,
        },
        gameId: '',
        turnCounter: 1,
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
            slots: shuffle(CARDS).slice(0, 5).map((c) => ({...c, cardId: Math.random()})),
        },
        [constants.CHARACTER_STATS]: {
            [constants.ATTACK]: 2,
            [constants.DEXTERITY]: 2,
            [constants.HEALTH]: 2,
            [constants.GOLD]: --gold,
            [constants.HEAL]: 2,
        }
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

export const purchaseRoutineCard = async () => {
    return Promise.resolve({});
}

export const purchaseCharacterCard = async (gold, shopCards, purchasedCardInd) => { // TODO dont actually use gold here
    return Promise.resolve({
        [BENCHES.SHOP]: {
            id: BENCHES.SHOP,
            slots: shopCards,
        },
        [constants.CHARACTER_STATS]: {
            [constants.ATTACK]: 2,
            [constants.DEXTERITY]: 2,
            [constants.HEALTH]: 2,
            [constants.GOLD]: gold-3,
            [constants.HEAL]: 2,
        }
    });
}