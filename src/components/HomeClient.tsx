'use client';

import { LoadedDeck } from "../types/LoadedDeck";

interface DeckSelectionProps {
    loadedDecks: LoadedDeck[];
}

export function DeckSelection({loadedDecks}: DeckSelectionProps) {
    // Selected deck
    const onDeckSelected = () => {
    console.log("Clicked!");
};

    return (
        // Display the decks
        <ul>
            {loadedDecks.map((loadedDeck) => (
                <li key={loadedDeck.deck.id}>
                    <button onClick={onDeckSelected}>
                        {loadedDeck.deck.name}
                    </button>
                </li>
            ))}
        </ul>
    );
}