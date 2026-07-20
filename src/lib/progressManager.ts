import { CardProgress, Grade } from "../types/CardProgress";
import { UserProgress } from "../types/UserProgress";
import { EASY_INTERVAL_DAYS, HARD_INTERVAL_DAYS, NEW_CARD_INTERVAL_DAYS } from "../lib/constants";


function addDays(originalDate: Date, daysToAdd: number): Date {
    // Clone the date
    const cloneDate = new Date(originalDate.getTime());
    cloneDate.setDate(cloneDate.getDate() + daysToAdd);
    return cloneDate;
}

function calculateNextReview(
    currentProgress: CardProgress | undefined,
    grade: Grade,
    reviewDate: Date
): Date {
    // Set review interval
    const interval: number =
        grade === "hard" ? HARD_INTERVAL_DAYS
        : grade === "easy" ? EASY_INTERVAL_DAYS
        : NEW_CARD_INTERVAL_DAYS;

    const newReview = addDays(reviewDate, interval);
    
    return newReview;
}

export function updateCardProgress(
    userProgress: UserProgress,
    deckId: string,
    cardId: string,
    grade: Grade) {
    // Find CardProgress
    const cardProgress: CardProgress | undefined = 
        userProgress.cardProgress.find(
            card =>
                card.deckId === deckId && card.cardId === cardId);

    const reviewDate = new Date();

    // Calculate next review date
    const nextReview = calculateNextReview(
        cardProgress,
        grade,
        reviewDate
    );
    
    // Update CardProgress
    if (cardProgress) {
    cardProgress.reviewCount++;
    cardProgress.lastReviewGrade = grade;
    cardProgress.lastReviewed = reviewDate.toISOString();
    cardProgress.nextReview = nextReview.toISOString();
    }
    else {
        const newCardProgress: CardProgress = {
            deckId,
            cardId,
            reviewCount: 1,
            lastReviewGrade: grade,
            lastReviewed: reviewDate.toISOString(),
            nextReview: nextReview.toISOString()
        }
        
        userProgress.cardProgress.push(newCardProgress)
    }
}