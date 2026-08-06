import { describe, it, expect, beforeEach } from "vitest";
import { LoadedDeck } from "../../types/LoadedDeck";
import path from "path";
import { UserProgress } from "../../types/UserProgress";
import { loadUserProgress } from "../../lib/progressStorage";
import { createStudySession, requeueStudyCard } from "../studyScheduler";
import { loadDeck } from "../deckLoader";
import { AGAIN_DELAY, INITIAL_REVIEW_CARDS } from "../constants";
import { updateCardProgress } from "../progressManager";

const userId: string = 'testUser';
const userProgress: UserProgress = await loadUserProgress(userId);
const emptyDeckPath: string = path.join(process.cwd(), 'decks/test/test_empty/deck.json');
const allNewDeckPath: string = path.join(process.cwd(), 'decks/test/test_all_new/deck.json');
const enoughDueDeckPath: string = path.join(process.cwd(), 'decks/test/test_enough_due/deck.json');
const NotEnoughDueDeckPath: string = path.join(process.cwd(), 'decks/test/test_not_enough_due/deck.json')

describe("studyScheduler Tests", () => {
    let emptyDeck: LoadedDeck;
    let allNewDeck: LoadedDeck;
    let enoughDueDeck: LoadedDeck;
    let notEnoughDueDeck: LoadedDeck;

    // Load ALL file dependencies sequentially before running tests
    beforeEach(async () => {
        emptyDeck = await loadDeck(emptyDeckPath);
        allNewDeck = await loadDeck(allNewDeckPath);
        enoughDueDeck = await loadDeck(enoughDueDeckPath);
        notEnoughDueDeck = await loadDeck(NotEnoughDueDeckPath);
    });

    it("Empty deck length", () => {
        const studySession = createStudySession(emptyDeck, userProgress);
        expect(studySession.studyCards.length).toBe(0);
    });

    it("All new cards", () => {
        const studySession = createStudySession(allNewDeck, userProgress);

        expect(studySession.studyCards.length).toBe(8);
        studySession.studyCards.forEach((card, i) => {
            expect(card.type).toBe("new");
        });
    });

    it("Enough due cards", () => {
        const studySession = createStudySession(enoughDueDeck, userProgress);

        for (let i = 0; i < INITIAL_REVIEW_CARDS; i++) {
            expect(studySession.studyCards[i].type).toBe("dueReview");
        }
    });

    it("Not enough due cards", () => {
        const studySession = createStudySession(notEnoughDueDeck, userProgress);

        for (let i = 0; i < INITIAL_REVIEW_CARDS; i++) {
            expect(studySession.studyCards[i].type).toEqual(expect.toBeOneOf(["dueReview", "practiceReview"]));
        }
    });

    it("Requeue", () => {
        const studySession = createStudySession(notEnoughDueDeck, userProgress);

        requeueStudyCard(studySession.studyCards, 1);

        expect(studySession.studyCards[1 + AGAIN_DELAY + 1].card.id).toBe("test2")
    });
});
