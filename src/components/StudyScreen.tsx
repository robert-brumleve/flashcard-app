import { UserProgress } from "../types/UserProgress";
import { StudySession } from "../types/StudySession";
import { useState } from "react";
import { updateCardProgress } from "../lib/progressManager";
import { Grade } from "../types/CardProgress";

interface StudyScreenProps {
    studySession: StudySession
    onStudyComplete: () => void;
    userProgress: UserProgress
    deckId: string
}

export function StudyScreen({studySession, onStudyComplete, userProgress, deckId}: StudyScreenProps) {
    const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
    const [studyComplete, setStudyComplete] = useState<boolean>(false);

    const showAnswer = () => {
        setAnswerRevealed(true);
    }

    const goToNextCard = () => {
        if (currentCardIndex + 1 < studySession.studyCards.length) {
            setCurrentCardIndex((index) => index + 1);
            setAnswerRevealed(false);
        }
        else setStudyComplete(true);
    }

    const returnToDeckSelection = () => {
        // TODO: Persist UserProgress to disk.
        onStudyComplete();
    }

    const gradeButton = (grade: Grade) => {
        updateCardProgress(userProgress, deckId, currentCard.id, grade);
        goToNextCard();
    }

    const currentCard = studySession.studyCards[currentCardIndex];
    
    return (
        <ul>
            {!studyComplete ? (
                <>
                    <li>{currentCard.front.text}</li>
                    {!answerRevealed ? (
                        <button onClick={showAnswer}>
                            Show Answer
                        </button>
                    ) : (
                        <>
                            <li>{currentCard.back.text}</li>

                            <button onClick={() => gradeButton("easy")}>
                                Easy
                            </button>

                            <button onClick={() => gradeButton("hard")}>
                                Hard
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