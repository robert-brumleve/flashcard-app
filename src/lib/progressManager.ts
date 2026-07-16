import { CardProgress, Grade } from "../types/CardProgress";
import { UserProgress } from "../types/UserProgress";

export function updateCardProgress(userProgress: UserProgress, deckId: string, cardId: string, grade: Grade) {
    // Find CardProgress
    const cardProgress: CardProgress | undefined = userProgress.cardProgress.find(card => card.deckId === deckId && card.cardId === cardId);

    // Update CardProgress
    if (cardProgress) {
    cardProgress.reviewCount++;
    cardProgress.lastReviewGrade = grade;
    }
    else {
        const newCardProgress: CardProgress = {
            deckId,
            cardId,
            reviewCount: 1,
            lastReviewGrade: grade
        }
        
        userProgress.cardProgress.push(newCardProgress)
    }
}