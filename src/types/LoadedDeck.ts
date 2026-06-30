import { Deck } from "./Deck";

export interface LoadedDeck {

    deck: Deck;

    deckPath: string;

    assetsPath: string;

    imagePath: string;

    audioPath: string;
}