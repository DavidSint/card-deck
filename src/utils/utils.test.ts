import { expect, test } from "vitest";
import {
  dealDeck,
  shuffleCards,
  sortCards,
  convertCardIdsToCardChars,
  drawCardsFromDeck,
  getSuite,
  getColourFromSuite,
} from "./index";
import { ICards } from "../types";

import { beforeAll } from "vitest";

const resData = {
  cardIds: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
  ],
  unicodeChars: [
    "🃒",
    "🃓",
    "🃔",
    "🃕",
    "🃖",
    "🃗",
    "🃘",
    "🃙",
    "🃚",
    "🃛",
    "🃝",
    "🃞",
    "🃑",
    "🂢",
    "🂣",
    "🂤",
    "🂥",
    "🂦",
    "🂧",
    "🂨",
    "🂩",
    "🂪",
    "🂫",
    "🂭",
    "🂮",
    "🂡",
    "🂲",
    "🂳",
    "🂴",
    "🂵",
    "🂶",
    "🂷",
    "🂸",
    "🂹",
    "🂺",
    "🂻",
    "🂽",
    "🂾",
    "🂱",
    "🃂",
    "🃃",
    "🃄",
    "🃅",
    "🃆",
    "🃇",
    "🃈",
    "🃉",
    "🃊",
    "🃋",
    "🃍",
    "🃎",
    "🃁",
  ],
};

let deck: ICards;
let shuffledCards: number[];

beforeAll(async () => {
  deck = dealDeck();
  shuffledCards = shuffleCards(deck.cardIds);
});

test("should deal deck", () => {
  expect(deck).toStrictEqual({
    cardIds: resData.cardIds,
    unicodeChars: resData.unicodeChars,
  });
});

test("should shuffle deck", () => {
  expect(shuffledCards).not.toEqual({
    cardIds: resData.cardIds,
    unicodeChars: resData.unicodeChars,
  });
});

test("should sort shuffled deck", () => {
  expect(sortCards(shuffledCards)).toStrictEqual(resData.cardIds);
});

test("should convert cardIds to unicode chars", () => {
  const cardChars = convertCardIdsToCardChars(deck.cardIds);
  expect(cardChars).toStrictEqual(resData.unicodeChars);
});

test("should draw a single card from the deck", () => {
  const [singleCard, deckRemainder] = drawCardsFromDeck({
    numberOfCards: 1,
    deckCardIds: deck.cardIds,
    drawnCards: [],
  });

  expect(singleCard).toStrictEqual([resData.cardIds[0]]);
  expect(deckRemainder).toStrictEqual(resData.cardIds.slice(1));
});

test("should draw a multiple cards from the deck", () => {
  const [fiveCards, deckRemainder] = drawCardsFromDeck({
    numberOfCards: 5,
    deckCardIds: deck.cardIds,
    drawnCards: [],
  });

  expect(fiveCards).toStrictEqual(resData.cardIds.slice(0, 5));
  expect(deckRemainder).toStrictEqual(resData.cardIds.slice(5));
});

test("should get the right suite from a given card", () => {
  const twoOfClubs = getSuite(0);
  const twoOfSpades = getSuite(13);
  const twoOfHearts = getSuite(26);
  const twoOfDiamonds = getSuite(39);

  expect(twoOfClubs).toStrictEqual("D");
  expect(twoOfSpades).toStrictEqual("A");
  expect(twoOfHearts).toStrictEqual("B");
  expect(twoOfDiamonds).toStrictEqual("C");
});

test("should get the right colour from a given card", () => {
  const clubs = getColourFromSuite("D");
  const spades = getColourFromSuite("A");
  const hearts = getColourFromSuite("B");
  const diamonds = getColourFromSuite("C");

  expect(clubs).toStrictEqual("black");
  expect(spades).toStrictEqual("black");
  expect(hearts).toStrictEqual("red");
  expect(diamonds).toStrictEqual("red");
});
