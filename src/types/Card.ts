import { Side } from "./Side";
import { AcceptedAnswer } from "./AcceptedAnswer";

export type CardType =
    | "vocabulary"
    | "speaking";

export interface Card {
    
    id: string;

    order: number;

    type: CardType;

    speechThreshold: number;

    front: Side;

    back: Side;

    acceptedAnswers?: AcceptedAnswer[];
}