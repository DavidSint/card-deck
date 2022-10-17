export interface ICards {
  cardIds: number[];
  unicodeChars: string[];
}

export interface IDrawCardsFromDeck {
  numberOfCards: number;
  deckCardIds: number[];
  drawnCards: number[];
}
