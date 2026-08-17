import { useState } from "react";
import { LoadedDeck } from "../../types/LoadedDeck";
import { CardEditor } from "./CardEditor";

interface DeckEditorProps {
    loadedDeck: LoadedDeck;
    onDeckDeselected: () => void;
    onDeckUpdated: (loadedDeck: LoadedDeck) => void;
}

export function DeckEditor({
    loadedDeck,
    onDeckDeselected,
    onDeckUpdated
}: DeckEditorProps) {
    const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
    const handleDeckUpdated = (updatedDeck: LoadedDeck) => {
        onDeckUpdated(updatedDeck);
        setIsAddingCard(false);
    };
    if (isAddingCard) {
        return (
            <CardEditor
                loadedDeck={loadedDeck}
                handleDeckUpdated={handleDeckUpdated}
            />
        );
    }
    return (
        <ul>
            <h1>{loadedDeck.deck.name}</h1>

            <h2>{loadedDeck.deck.cards.length} cards in deck</h2>

            <button
                onClick={() => setIsAddingCard(true)}
            >
                + Add Card
            </button>

            {loadedDeck.deck.cards.map((card) => (
                <li key={card.id}>
                    {card.type}
                    {card.front.text}
                    {card.back.text}
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