import React from "react";
import { LoadedDeck } from "../types/LoadedDeck";

export function DeckSelection(loadedDecks: LoadedDeck[]) {
    // Define click handler function
    const onDeckSelected = (loadedDeck: LoadedDeck) => {
    console.log(loadedDeck.deck.name);
    };

    return (
        // Display the decks
        <ul>
            {loadedDecks.map((loadedDeck) => (
                <li key={loadedDeck.deck.id}>
                    <button onClick={() => onDeckSelected(loadedDeck)}>
                        {loadedDeck.deck.name}
                    </button>
                </li>
            ))}
        </ul>
    );
}