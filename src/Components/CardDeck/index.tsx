import { useState } from "react";
import {
  dealDeck,
  shuffleCards,
  sortCards,
  convertCardIdsToCardChars,
  drawCardsFromDeck,
  getSuite,
  getColourFromSuite,
} from "../../utils";
import { ICards } from "../../types";
import "./card-deck.css";

export function CardDeck() {
  const [deck, setDeck] = useState(dealDeck());

  const [drawPile, setDrawPile] = useState<ICards>({
    cardIds: [],
    unicodeChars: [],
  });

  const [drawCount, setDrawCount] = useState(1);

  return (
    <>
      <aside>
        <h2>Controls</h2>
        <div id="control-panel">
          <button
            onClick={() => {
              const shuffledDeck = shuffleCards(deck.cardIds);
              setDeck({
                cardIds: shuffledDeck,
                unicodeChars: convertCardIdsToCardChars(shuffledDeck),
              });
            }}
          >
            Shuffle Deck
          </button>
          <div id="draw-count-field-group">
            <span>
              <label htmlFor="drawCount">
                How many cards would you like to draw?
              </label>
              <input
                type="number"
                id="drawCount"
                name="drawCount"
                min="1"
                max="52"
                value={drawCount}
                onInput={(e) =>
                  setDrawCount(Number((e.target as HTMLInputElement).value))
                }
              />
            </span>
            <button
              onClick={() => {
                const [newDrawPile, newDeck] = drawCardsFromDeck({
                  numberOfCards: drawCount,
                  deckCardIds: deck.cardIds,
                  drawnCards: drawPile.cardIds,
                });
                setDrawPile({
                  cardIds: newDrawPile,
                  unicodeChars: convertCardIdsToCardChars(newDrawPile),
                });
                setDeck({
                  cardIds: newDeck,
                  unicodeChars: convertCardIdsToCardChars(newDeck),
                });
              }}
            >
              Draw Cards
            </button>
          </div>
          {!!drawPile.unicodeChars.length && (
            <button
              onClick={() => {
                // Assumption: All drawn cards are sorted, not just the newly drawn cards
                const sortedDrawPile = sortCards(drawPile.cardIds);
                setDrawPile({
                  cardIds: sortedDrawPile,
                  unicodeChars: convertCardIdsToCardChars(sortedDrawPile),
                });
              }}
            >
              Sort Draw Pile
            </button>
          )}
          <button
            onClick={() => {
              setDeck(dealDeck());
              setDrawPile({ cardIds: [], unicodeChars: [] });
            }}
          >
            Refresh Deck and Draw Pile
          </button>
        </div>
      </aside>
      <main>
        {!!drawPile.unicodeChars.length && (
          <div>
            <h2>Draw Pile</h2>
            <ol>
              {drawPile.unicodeChars.map((card, idx) => (
                <li
                  key={drawPile.cardIds[idx]}
                  className={getColourFromSuite(
                    getSuite(drawPile.cardIds[idx])
                  )}
                >
                  {card}
                </li>
              ))}
            </ol>
          </div>
        )}
        <div>
          <h2>Deck</h2>
          <ol>
            {deck.unicodeChars.map((card, idx) => (
              <li
                key={deck.cardIds[idx]}
                className={getColourFromSuite(getSuite(deck.cardIds[idx]))}
              >
                {card}
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}
