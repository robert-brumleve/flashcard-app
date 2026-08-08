import { LoadedDeck } from "../types/LoadedDeck";

interface DeckSelectionProps {
    loadedDecks: LoadedDeck[];
    onStudyModeSelected: (loadedDeck: LoadedDeck) => void;
    onEditModeSelected: (loadedDeck: LoadedDeck) => void;
}

export function DeckSelection(
    {loadedDecks,
    onStudyModeSelected,
    onEditModeSelected
    }: DeckSelectionProps) {
    return (
        // Display the decks
        <ul>
            {loadedDecks.map((loadedDeck) => (
                <li key={loadedDeck.deck.id}>
                    <h1>{loadedDeck.deck.name}</h1>
                    <button
                        onClick={() => onStudyModeSelected(loadedDeck)}
                    >
                        Study
                    </button>
                    <button
                        onClick={() => onEditModeSelected(loadedDeck)}
                    >
                        Edit
                    </button>
                </li>
            ))}
        </ul>
    );
}