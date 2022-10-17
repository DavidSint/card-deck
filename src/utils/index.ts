import { CARD_SUITES, CARD_VALUES } from "./consts";
import { IDrawCardsFromDeck } from "../types";

// Only the Ids 0-51 are valid. Jokers are not included
function isValidId(cardId: number) {
  return cardId < 0 || cardId > 51;
}

// The cardIds are grouped into their suites so by looking at the ID and checking which range it's in, you can determine the suite
function getSuite(cardId: number) {
  if (isValidId(cardId)) throw new Error(`${cardId} is an invalid cardId`);
  if (cardId <= 12) return CARD_SUITES[0];
  else if (cardId <= 25) return CARD_SUITES[1];
  else if (cardId <= 38) return CARD_SUITES[2];
  else return CARD_SUITES[3];
}

// There are 13 cards in each suite so if you mod the cardId by 13, you will be left with the correct card value
function getValue(cardId: number) {
  if (isValidId(cardId)) throw new Error(`${cardId} is an invalid cardId`);
  const cardValueId = cardId % 13;

  return CARD_VALUES[cardValueId];
}

// We use the unicode card characters for this project, the CARD_SUITES and CARD_VALUES correspond with the unicode character code final two hex values. This function uses that to get the right card character.
function getUnicodeCardChar(cardId: number) {
  if (isValidId(cardId)) throw new Error(`${cardId} is an invalid cardId`);
  const unicodeCharId = `0x1F0${getSuite(cardId)}${getValue(cardId)}`;
  return String.fromCodePoint(Number(unicodeCharId));
}

function convertCardIdsToCardChars(cards: number[]) {
  return cards.map((card) => getUnicodeCardChar(card));
}

function dealDeck() {
  let deck: number[] = [];
  for (let i = 0; i <= 51; i++) {
    deck[i] = i;
  }
  return {
    cardIds: deck,
    unicodeChars: convertCardIdsToCardChars(deck),
  };
}

// Using Durstenfeld's version of the Fishher-Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffleCards(cardIds: number[]) {
  const shuffledDeck = [...cardIds];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}

function sortCards(cards: number[]) {
  return cards.sort((cardA, cardB) => cardA - cardB);
}

function drawCardsFromDeck({
  numberOfCards,
  deckCardIds,
  drawnCards,
}: IDrawCardsFromDeck): [number[], number[]] {
  const idxToSplit = numberOfCards;
  const newDeck = deckCardIds.slice(idxToSplit);
  // Assumption: drawn cards are drawn at the same time, and not one by one (if one-by-one the order of them would need to be reversed before being put in the draw pile)
  const newDrawnCards = [...drawnCards, ...deckCardIds.slice(0, idxToSplit)];

  return [newDrawnCards, newDeck];
}

function getColourFromSuite(suite: string) {
  if (suite === "B" || suite === "C") return "red";
  return "black";
}

export {
  dealDeck,
  shuffleCards,
  sortCards,
  convertCardIdsToCardChars,
  drawCardsFromDeck,
  getSuite,
  getColourFromSuite,
};
