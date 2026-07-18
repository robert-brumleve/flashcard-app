import { UserProgress } from "../types/UserProgress";
import { StudySession } from "../types/StudySession";
import { useState } from "react";
import { updateCardProgress } from "../lib/progressManager";
import { Grade } from "../types/CardProgress";
import { VocabularyCard } from "./cards/VocabularyCard";
import { SpeakingCard } from "./cards/SpeakingCard";
import { Card } from "@/types/Card";

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
        // TODO: Persist UserProgress to disk.
        onStudyComplete();
    }

    const handleGrade = (grade: Grade) => {
        updateCardProgress(userProgress, deckId, currentCard.id, grade);
        goToNextCard();
    }

    const currentCard = studySession.studyCards[currentCardIndex];

    return (
        <ul>
            {!studyComplete ? (
                <>
                    {currentCard.type === "vocabulary" ? (
                        <VocabularyCard
                            key={currentCard.id}
                            card={currentCard}
                            onGrade={handleGrade}
                        />
                    ) : currentCard.type === "speaking" ? (
                        <SpeakingCard
                            key={currentCard.id}
                            card={currentCard}
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