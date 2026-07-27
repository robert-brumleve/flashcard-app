import { UserProgress } from "../types/UserProgress";
import { StudySession } from "../types/StudySession";
import { useState } from "react";
import { updateCardProgress } from "../lib/progressManager";
import { Grade } from "../types/CardProgress";
import { VocabularyCard } from "./cards/VocabularyCard";
import { SpeakingCard } from "./cards/SpeakingCard";
import { saveProgressAction } from "../app/actions";
import { requeueStudyCard } from "../lib/studyScheduler";

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
        // If card is graded "Again", requeue it
        if (grade === "again") {
            requeueStudyCard(studySession.studyCards, currentCardIndex);
        }
        // If card type is not practiceReview,
        // update and save Card Progress
        else if (currentCard.type !== "practiceReview") {
            updateCardProgress(
                userProgress,
                studySession.loadedDeck.deck.id,
                grade,
                currentCard);
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
                    <li>Study Session Complete</li>
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <td>Due Reviews</td>
                                <td>{studySession.dueReviewCount}</td>
                            </tr>
                            <tr>
                                <td>Practice Reviews</td>
                                <td>{studySession.practiceReviewCount}</td>
                            </tr>
                            <tr>
                                <td>New Cards</td>
                                <td>{studySession.newCardCount}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button onClick={returnToDeckSelection}>
                        Return to Deck Selection
                    </button>
                </>
            )}
        </ul>
    );
}