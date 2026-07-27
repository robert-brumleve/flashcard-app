export type Grade =
    | "easy"
    | "good"
    | "hard"
    | "again";

export interface CardProgress {

    deckId: string;

    cardId: string;

    reviewCount: number;
    
    lastReviewGrade: Grade;

    lastReviewed: string;
    
    nextReview: string;
}