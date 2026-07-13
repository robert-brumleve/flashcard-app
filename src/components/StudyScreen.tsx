import { LoadedDeck } from "../types/LoadedDeck";
import { useState } from "react";

interface StudyScreenProps {
    deck: LoadedDeck
    clearSelectedDeck: () => void;
}

export function StudyScreen({deck, clearSelectedDeck}: StudyScreenProps) {
    const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
    const [studyComplete, setStudyComplete] = useState<boolean>(false);

    const showAnswer = () => {
        setAnswerRevealed(true);
    }
    const goToNextCard = () => {
        if (currentCardIndex + 1 < deck.deck.cards.length) {
            setCurrentCardIndex((index) => index + 1);
            setAnswerRevealed(false);
        }
        else setStudyComplete(true);
    }

    const returnToDeckSelection = () => {
        clearSelectedDeck();
    }
    
    return (
        <ul>
            {!studyComplete ? (
                <>
                    <li>{deck.deck.cards[currentCardIndex].front.text}</li>
                    {!answerRevealed ? (
                        <button onClick={showAnswer}>
                            Show Answer
                        </button>
                    ) : (
                        <>
                            <li>{deck.deck.cards[currentCardIndex].back.text}</li>
                            <button onClick={goToNextCard}>
                                Next Card
                            </button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <li>Study Complete</li>
                    <button onClick={returnToDeckSelection}>
                        Return to Deck Selection
                    </button>
                </>
            )}
        </ul>
    );
}