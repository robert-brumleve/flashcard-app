import { Deck } from "../types/Deck";
import { Card } from "../types/Card";

export function addCard(deck: Deck, card: Card): Deck {
    return {
        ...deck,
        cards: [...deck.cards, card]
    };
}