import { CardProgress, Grade } from "../types/CardProgress";
import { UserProgress } from "../types/UserProgress";
import { EASY_INTERVAL_MULTIPLIER, GOOD_INTERVAL_MULTIPLIER, HARD_INTERVAL_MULTIPLIER, AGAIN_INTERVAL_MULTIPLIER, NEW_CARD_INTERVAL_DAYS } from "../lib/constants";
import { StudyCard } from "@/types/StudyCard";

export function addDays(
    originalDate: Date,
    daysToAdd: number
): Date {
    // Clone the date
    const cloneDate = new Date(originalDate.getTime());
    cloneDate.setDate(cloneDate.getDate() + daysToAdd);
    return cloneDate;
}

export function calculateNextReview(
    currentProgress: CardProgress | undefined,
    grade: Grade,
    reviewDate: Date,
    studyCard: StudyCard
): Date {
    // Set review for new cards
    if (currentProgress === undefined) {
        return addDays(reviewDate, NEW_CARD_INTERVAL_DAYS);
    }

    // Calculate previous review interval
    const previousInterval = calculateReviewInterval(
        currentProgress.lastReviewed,
        currentProgress.nextReview
    )

    // Calculate new review interval
    let interval = previousInterval;

    for (let i = 0; i < studyCard.againCount; i++) {
        interval *= AGAIN_INTERVAL_MULTIPLIER;
    }

    switch (grade) {
        case "easy":
            interval *= EASY_INTERVAL_MULTIPLIER;
            break;
        case "good":
            interval *= GOOD_INTERVAL_MULTIPLIER;
            break;
        case "hard":
            interval *= HARD_INTERVAL_MULTIPLIER;
            break;
        default:
            throw new Error(`Unexpected grade: ${grade}`);
    }
    interval = Math.max(1, interval);

    return addDays(reviewDate, interval);
}

export function calculateReviewInterval(
    lastReviewed: string,
    nextReview: string
): number {
    const lastReviewedDate: Date = new Date(lastReviewed);
    const nextReviewDate: Date = new Date(nextReview);

    const intervalInMs: number =
        nextReviewDate.getTime() - lastReviewedDate.getTime();
    const intervalInDays: number =
        Math.round(intervalInMs / (1000 * 60 * 60 * 24));

    return intervalInDays;
}

export function updateCardProgress(
    userProgress: UserProgress,
    deckId: string,
    grade: Grade,
    studyCard: StudyCard
) {
    if (grade === "again") {
        return;
    }
    
    const cardId = studyCard.card.id;

    // Find CardProgress
    let cardProgress: CardProgress | undefined = 
        userProgress.cardProgress.find(
            card =>
                card.deckId === deckId && card.cardId === cardId);

    const reviewDate = new Date();

    // Calculate next review date
    const nextReview = calculateNextReview(
        cardProgress,
        grade,
        reviewDate,
        studyCard
    );

    // Update CardProgress
    if (!cardProgress) {
    cardProgress = {
        deckId,
        cardId,
        reviewCount: 0,
        lastReviewGrade: "good", // temporary value
        lastReviewed: "",
        nextReview: ""
    };

    userProgress.cardProgress.push(cardProgress);
}
    cardProgress.reviewCount++;
    cardProgress.lastReviewGrade = grade;
    cardProgress.lastReviewed = reviewDate.toISOString();
    cardProgress.nextReview = nextReview.toISOString();
}