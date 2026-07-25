import { UserProgress } from "../types/UserProgress";
import { StudySession } from "../types/StudySession";
import { useState } from "react";
import { updateCardProgress } from "../lib/progressManager";
import { Grade } from "../types/CardProgress";
import { VocabularyCard } from "./cards/VocabularyCard";
import { SpeakingCard } from "./cards/SpeakingCard";
import { saveProgressAction } from "../app/actions";

interface StudyScreenProps {
    studySession: StudySession;
    onStudyComplete: () => void;
    userProgress: UserProgress;
    deckId: string;
}

export function StudyScreen({studySession, onStudyComplete, userProgress, deckId}: StudyScreenProps) {
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
    const [studyComplete, setStudyComplete] = useState<boolean>(false);

    const goToNextCard = () => {
        if (currentCardIndex + 1 < studySession.studyCards.length) {
            setCurrentCardIndex((index) => index + 1);
        }
        else setStudyComplete(true);
    }

    const returnToDeckSelection = () => {
        onStudyComplete();
    }

    const handleGrade = (grade: Grade) => {
        if (currentCard.type !== "practiceReview") {
            updateCardProgress(userProgress, deckId, currentCard.card.id, grade);
            saveProgressAction(userProgress);
        }
        goToNextCard();
    }

    const currentCard = studySession.studyCards[currentCardIndex];

    return (
        <ul>
            {!studyComplete ? (
                <>
                    {currentCard.card.type === "vocabulary" ? (
                        <VocabularyCard
                            key={currentCard.card.id}
                            card={currentCard.card}
                            onGrade={handleGrade}
                        />
                    ) : currentCard.card.type === "speaking" ? (
                        <SpeakingCard
                            key={currentCard.card.id}
                            card={currentCard.card}
                            onGrade={handleGrade}
                        />
                    ) : null}
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