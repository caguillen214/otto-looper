import * as constants from "./data";
import { BENCHES, EMPTY_CARD, CARDS, GAME_STATE } from "./data";
import { shuffle } from "./utils";

export const startNewGame = async () => {
    const state = {
        [BENCHES.SHOP]: {
            id: BENCHES.SHOP,
            slots: shuffle(CARDS).map((c) => ({...c, cardId: Math.random()})),
        },
        [BENCHES.ROUTINE]: {
            id: BENCHES.ROUTINE,
            slots: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD]
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