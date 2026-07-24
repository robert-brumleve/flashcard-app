import { StudySession } from "../types/StudySession";
import { LoadedDeck } from "../types/LoadedDeck";
import { Card } from "../types/Card";
import { UserProgress } from "../types/UserProgress";
import { INITIAL_REVIEW_CARDS, MAX_NEW_CARDS, TARGET_SESSION_SIZE } from "./constants";
import { CardProgress } from "../types/CardProgress";
import { StudyCard } from "../types/StudyCard";

function sessionFull(studyCards: StudyCard[]): boolean {
    return studyCards.length >= TARGET_SESSION_SIZE;
}

function isCardDue(cardProgress: CardProgress): boolean {
    const nextReviewDate = new Date(cardProgress.nextReview)
    const now = new Date()

    return  nextReviewDate <= now;
}

export function createStudySession(
    loadedDeck: LoadedDeck,
    userProgress: UserProgress):
    StudySession {
    const deckCards = loadedDeck.deck.cards
    const dueReviewCards: Card[] = [];
    const newCards: Card[] = [];
    const practiceReviewCards: Card[] = [];

// Separate cards into due review, practice review, and new
    for (const card of deckCards) {
        const cardProgress = userProgress.cardProgress.find(
            cardProgress => 
                cardProgress.cardId === card.id &&
                cardProgress.deckId === loadedDeck.deck.id
        );
        if (cardProgress) {
            if (isCardDue(cardProgress)) {
                dueReviewCards.push(card);
            }
            else {
                practiceReviewCards.push(card);
            }
        }
        else {
            newCards.push(card);
        }
    }

    const newSlots = Math.min(
        newCards.length,
        MAX_NEW_CARDS
    );
    const practiceReviewLimit = Math.max(
        0,
        TARGET_SESSION_SIZE
            - dueReviewCards.length
            - newSlots
    );
    let dueReviewIndex = 0;
    let newIndex = 0;
    let practiceReviewIndex = 0;
    const studyCards: StudyCard[] = [];

    // Add initial due review cards
    while (dueReviewIndex < INITIAL_REVIEW_CARDS && 
        dueReviewIndex < dueReviewCards.length
    ) {
        studyCards.push({
            card: dueReviewCards[dueReviewIndex],
            type: "dueReview" });
        dueReviewIndex++;
    }
    // Attempt to add one new then two review cards
    while (studyCards.length < TARGET_SESSION_SIZE &&
        (dueReviewIndex < dueReviewCards.length ||
        newIndex < newCards.length ||
        practiceReviewIndex < practiceReviewCards.length)
    ) {
        if (newIndex < newSlots &&
            !sessionFull(studyCards)
        ) {
            studyCards.push({
                card: newCards[newIndex],
                type: "new"});
            newIndex++;
        }
        if (dueReviewIndex < dueReviewCards.length &&
            !sessionFull(studyCards)
        ) {
            studyCards.push({
                card: dueReviewCards[dueReviewIndex],
                type: "dueReview" });
            dueReviewIndex++;
        }
        if (practiceReviewIndex < practiceReviewLimit &&
            practiceReviewIndex < practiceReviewCards.length &&
            !sessionFull(studyCards)
        ) {
            studyCards.push({
                card: practiceReviewCards[practiceReviewIndex],
                type: "practiceReview" });
            practiceReviewIndex++;
        }
        else if (dueReviewIndex < dueReviewCards.length &&
            !sessionFull(studyCards)
        ) {
            studyCards.push({
                card: dueReviewCards[dueReviewIndex],
                type: "dueReview" });
            dueReviewIndex++;
        }
    }

    // Create the StudySession
    const studySession: StudySession = {
        loadedDeck,
        studyCards,
        reviewCardCount: dueReviewCards.length + practiceReviewCards.length,
        newCardCount: newCards.length
    };

    return studySession;
}