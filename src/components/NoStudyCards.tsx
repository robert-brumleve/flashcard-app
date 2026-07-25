interface NoStudyCardsProps {
    setSelectedDeck: (deck: null) => void;
}

export function NoStudyCards({setSelectedDeck}: NoStudyCardsProps) {
    return (
        <ul>            
            <li>No cards to study.</li>
            <button onClick={() => setSelectedDeck(null)}>
                Return to Deck Selection
            </button>
        </ul>
    );
}