import { Card } from "./Card";

export type StudyCardType =
    | "new"
    | "dueReview"
    | "practiceReview";

export interface StudyCard {

    card: Card;
    
    type: StudyCardType;
}