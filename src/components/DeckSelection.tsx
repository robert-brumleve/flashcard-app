import { LoadedDeck } from "../types/LoadedDeck";

interface DeckSelectionProps {
    loadedDecks: LoadedDeck[],
    onDeckSelected: (loadedDeck: LoadedDeck) => void;
}

export function DeckSelection({loadedDecks, onDeckSelected}: DeckSelectionProps) {
    return (
        // Display the decks
        <ul>
            {loadedDecks.map((loadedDeck) => (
                <li key={loadedDeck.deck.id}>
                    <button
                    onClick={() => onDeckSelected(loadedDeck)}
                        >
                        {loadedDeck.deck.name}
                    </button>
                </li>
            ))}
        </ul>
    );
}