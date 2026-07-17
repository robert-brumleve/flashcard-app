import { StudySession } from "../types/StudySession";
import { LoadedDeck } from "../types/LoadedDeck";
import { Card } from "../types/Card";
import { UserProgress } from "../types/UserProgress";
import { INITIAL_REVIEW_CARDS } from "./constants";

export function createStudySession(loadedDeck: LoadedDeck, userProgress: UserProgress): StudySession {
    const deckCards = loadedDeck.deck.cards
    const reviewCards: Card[] = [];
    const newCards: Card[] = [];
    const studyCards: Card[] = [];
    let reviewIndex = 0;
    let newIndex = 0;

    // Separate cards into review and new
    for (const card of deckCards) {
        const hasProgress = userProgress.cardProgress.some(
            cardProgress => 
                cardProgress.cardId === card.id &&
                cardProgress.deckId === loadedDeck.deck.id
        );
        if (hasProgress) {
            reviewCards.push(card);
        }
        else {
            newCards.push(card);
        }
    }

    // Add initial review cards
    while (reviewIndex < INITIAL_REVIEW_CARDS && 
        reviewIndex < reviewCards.length
    ) {
        studyCards.push(reviewCards[reviewIndex]);
        reviewIndex++;
    }
    // Alternate new and review cards
    while (reviewIndex < reviewCards.length ||
        newIndex < newCards.length
    ) {
        if (newIndex < newCards.length) {
            studyCards.push(newCards[newIndex]);
            newIndex++;
        }
        if (reviewIndex < reviewCards.length) {
            studyCards.push(reviewCards[reviewIndex]);
            reviewIndex++;
        }
    }

    // Create the StudySession
    const studySession: StudySession = {
        loadedDeck,
        studyCards,
        reviewCardCount: reviewCards.length,
        newCardCount: newCards.length
    };

    return studySession;
}