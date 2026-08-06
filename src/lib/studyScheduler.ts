import { StudySession } from "../types/StudySession";
import { LoadedDeck } from "../types/LoadedDeck";
import { Card } from "../types/Card";
import { UserProgress } from "../types/UserProgress";
import { INITIAL_REVIEW_CARDS, MAX_NEW_CARDS, REVIEWS_PER_NEW_CARD, TARGET_SESSION_SIZE, AGAIN_DELAY } from "./constants";
import { CardProgress } from "../types/CardProgress";
import { StudyCard } from "../types/StudyCard";
import { StudyCardType } from "../types/StudyCard";

function sessionFull(studyCards: StudyCard[]): boolean {
    return studyCards.length >= TARGET_SESSION_SIZE;
}

function isCardDue(cardProgress: CardProgress): boolean {
    const nextReviewDate = new Date(cardProgress.nextReview)
    const now = new Date()

    return  nextReviewDate <= now;
}

function addStudyCard(
    studyCards: StudyCard[],
    card: Card,
    type: StudyCardType
) {
    const againCount: number = 0;
    studyCards.push({card, type, againCount});
}

function categorizeCards(
    loadedDeck: LoadedDeck,
    progressMap: Map<string, CardProgress>
): {
    dueReviewCards: Card[];
    newCards: Card[];
    practiceReviewCards: Card[];
} {
    const deckCards = loadedDeck.deck.cards;
    const dueReviewCards: Card[] = [];
    const newCards: Card[] = [];
    const practiceReviewCards: Card[] = [];

    // Separate cards into due review, practice review, and new
    for (const card of deckCards) {
        const cardProgress = progressMap.get(
            progressKey(loadedDeck.deck.id, card.id)
        );
        if (cardProgress) {
            if (isCardDue(cardProgress)) {
                dueReviewCards.push(card);
            } else {
                practiceReviewCards.push(card);
            }
        } else {
            newCards.push(card);
        }
    }

    return { dueReviewCards, newCards, practiceReviewCards };
}

function buildStudyCards(
    dueReviewCards: Card[],
    newCards: Card[],
    practiceReviewCards: Card[]
): StudyCard[] {
    // Study Session variables
    const newSlots = Math.min(
        newCards.length,
        MAX_NEW_CARDS
    );
    const practiceReviewSlots = Math.max(
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
    let initialReviewCount = 0;
    while (initialReviewCount < INITIAL_REVIEW_CARDS) {
        if (dueReviewIndex < dueReviewCards.length) {
            addStudyCard(
                studyCards,
                dueReviewCards[dueReviewIndex],
                "dueReview"
            );
            dueReviewIndex++;
            initialReviewCount++;
        }
        else if (practiceReviewIndex < practiceReviewCards.length) {
            addStudyCard(
                studyCards,
                practiceReviewCards[practiceReviewIndex],
                "practiceReview"
            );
            practiceReviewIndex++;
            initialReviewCount++;
        }
        else break;
    }
    // Attempt to add one new then two review cards
    while (!sessionFull(studyCards)) {
        let addedCard = false;

        // 1. Attempt to add a new card
        if (newIndex < newSlots && !sessionFull(studyCards)) {
            addStudyCard(
                studyCards,
                newCards[newIndex],
                "new"
            );
            newIndex++;
            addedCard = true;
        }

        // 2. Attempt to add up to two review cards
        for (let i = 0; i < REVIEWS_PER_NEW_CARD; i++) {
            if (dueReviewIndex < dueReviewCards.length &&
                !sessionFull(studyCards)
            ) {
                addStudyCard(
                    studyCards,
                    dueReviewCards[dueReviewIndex],
                    "dueReview"
                );
                dueReviewIndex++;
                addedCard = true;
            }
            else if (
                practiceReviewIndex < practiceReviewSlots &&
                practiceReviewIndex < practiceReviewCards.length &&
                !sessionFull(studyCards)
            ) {
                addStudyCard(
                    studyCards,
                    practiceReviewCards[practiceReviewIndex],
                    "practiceReview"
                );
                practiceReviewIndex++;
                addedCard = true;
            }
        }

        // If we went through a full loop pass and couldn't pull any new or review card,
        // we are officially out of available pool cards. Break immediately to prevent hangs!
        if (!addedCard) {
            break;
        }
    }

    return studyCards;
}

function progressKey(deckId: string, cardId: string): string {
    return `${deckId}:${cardId}`;
}

function sortDueReviewCards(
    dueReviewCards: Card[],
    deckId: string,
    progressMap: Map<string, CardProgress>
) {
    // Sort dueReviewCards in-place by nextReview time (earliest first)
    dueReviewCards.sort((cardA, cardB) => {
        const progressA = progressMap.get(progressKey(deckId, cardA.id));
        const progressB = progressMap.get(progressKey(deckId, cardB.id));

        if (!progressA) {
            throw new Error(`Expected CardProgress for card ${cardA.id}`);
        }
        if(!progressB) {
            throw new Error(`Expected CardProgress for card ${cardB.id}`);
        }

        const timeA = new Date(progressA.nextReview).getTime();
        const timeB = new Date(progressB.nextReview).getTime();

        return timeA - timeB;
    });
}

function shufflePracticeReviewCards(
    practiceReviewCards: Card[]
) {
    // Shuffle practice review cards in-place using Fisher-Yates
    for (let i = practiceReviewCards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [practiceReviewCards[i], practiceReviewCards[randomIndex]] =
        [practiceReviewCards[randomIndex], practiceReviewCards[i]];
    }
}

export function createStudySession(
    loadedDeck: LoadedDeck,
    userProgress: UserProgress):
    StudySession {
    // Create Map for User Progress
    const progressMap = new Map<string, CardProgress>();

    // Create Map of User Progress
    for (const progress of userProgress.cardProgress) {
        progressMap.set(
            `${progress.deckId}:${progress.cardId}`,
            progress
        );
    }

    // Categorize each card as Due Review, New, and Practice Review
    const { dueReviewCards, newCards, practiceReviewCards } =
        categorizeCards(loadedDeck, progressMap);

    // Sort the Due Review cards
    sortDueReviewCards(
        dueReviewCards,
        loadedDeck.deck.id,
        progressMap
    )

    // Shuffle Practice Review cards
    shufflePracticeReviewCards(practiceReviewCards)

    const studyCards = buildStudyCards(dueReviewCards,newCards,practiceReviewCards);

    // Create the StudySession
    return {
        loadedDeck,
        studyCards,
        dueReviewCount: dueReviewCards.length,
        practiceReviewCount: practiceReviewCards.length,
        newCardCount: newCards.length
    };
}

export function requeueStudyCard(
    studyCards: StudyCard[],
    currentCardIndex: number
): void {
    // Create copy of study card
    const copiedCard: StudyCard = {
        ...studyCards[currentCardIndex],
        againCount: studyCards[currentCardIndex].againCount + 1
    };

    // Insert card into Study Cards at correct index
    const insertIndex = Math.min(
        currentCardIndex + AGAIN_DELAY + 1,
        studyCards.length
    );
    studyCards.splice(insertIndex, 0, copiedCard);
}