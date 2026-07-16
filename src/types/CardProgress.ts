export type Grade = "easy" | "hard";

export interface CardProgress {

    deckId: string;

    cardId: string;

    reviewCount: number;
    
    lastReviewGrade: Grade;
}