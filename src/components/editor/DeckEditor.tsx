import { LoadedDeck } from "../../types/LoadedDeck";

interface DeckEditorProps {
    loadedDeck: LoadedDeck;
    onDeckDeselected: () => void;
}

export function DeckEditor({
    loadedDeck,
    onDeckDeselected
}: DeckEditorProps) {
    return (
        <ul>
            <h1>{loadedDeck.deck.name}</h1>

            <h2>{loadedDeck.deck.cards.length} cards in deck</h2>

            <button>+ Add Card</button>

            {loadedDeck.deck.cards.map((card) => (
                <li key={card.id}>
                    {card.id}
                </li>
            ))}
            <button
                onClick={onDeckDeselected}
            >
                Return to Deck Selection
            </button>
        </ul>
    );
}