import { Card, CardType} from "../types/Card";
import { Side } from "../types/Side";
import { AcceptedAnswer } from "../types/AcceptedAnswer";

export interface CreateCardInput {
    type: CardType;
    front: Side;
    back: Side;
    speechThreshold?: number;
    acceptedAnswers?: AcceptedAnswer[];
}

export function createCard(
    createCardInput: CreateCardInput,
): Card {
    const card: Card = {
    // Required
        id: crypto.randomUUID(),
        type: createCardInput.type,
        front: createCardInput.front,
        back: createCardInput.back
    };

    // Optional
    if (createCardInput.speechThreshold !== undefined) {
        card.speechThreshold = createCardInput.speechThreshold;
    }

    if (createCardInput.acceptedAnswers !== undefined) {
        card.acceptedAnswers = createCardInput.acceptedAnswers;
    }

    return card;
}