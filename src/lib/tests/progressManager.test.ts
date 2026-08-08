import { describe, it, expect, beforeEach } from "vitest";
import { calculateReviewInterval, calculateNextReview, addDays, updateCardProgress } from "../progressManager";
import { LoadedDeck } from "../../types/LoadedDeck";
import { StudySession } from "../../types/StudySession";
import { StudyCard } from "../../types/StudyCard";
import path from "path";
import { UserProgress } from "../../types/UserProgress";
import { loadUserProgress } from "../../lib/progressStorage";
import { createStudySession } from "../studyScheduler";
import { AGAIN_INTERVAL_MULTIPLIER, EASY_INTERVAL_MULTIPLIER, GOOD_INTERVAL_MULTIPLIER, HARD_INTERVAL_MULTIPLIER, NEW_CARD_INTERVAL_DAYS } from "../constants";
import { loadDeck } from "../deckStorage";

const testDeckPath: string = path.join(process.cwd(), 'decks/test/test_1/deck.json');
const userId: string = 'testUser';

//////////////////////////////////
// calculateReviewInterval
//////////////////////////////////

describe("calculateReviewInterval", () => {
    it("returns 1 for a one day interval", () => {
        const lastReviewed = "2026-07-31T06:57:56.061Z";
        const nextReview = "2026-08-01T06:57:56.061Z"
        expect(calculateReviewInterval(lastReviewed, nextReview)).toBe(1);
    });

    it("returns 7 for a seven day interval", () => {
        const lastReviewed = "2026-07-20T06:57:56.061Z";
        const nextReview = "2026-07-27T06:57:56.061Z"
        expect(calculateReviewInterval(lastReviewed, nextReview)).toBe(7);
    });
});

//////////////////////////////////
// calculateNextReview
//////////////////////////////////

describe("calculateNextReview", () => {
    let userProgress: UserProgress;
    let studySession: StudySession;
    let testDeck: LoadedDeck;

    beforeEach(async () => {
        testDeck = await loadDeck(testDeckPath);
        userProgress = await loadUserProgress(userId);
        studySession = createStudySession(testDeck, userProgress);
    });

    it("returns today + NEW_CARD_INTERVAL_DAYS for New Card graded Easy", () => {
        const date = new Date("2026-01-01T12:00:00Z");
        const expected = addDays(date, NEW_CARD_INTERVAL_DAYS);

        const nextReview = calculateNextReview(undefined, "easy", date, studySession.studyCards[0]);
        expect(expected.toISOString()).toBe(nextReview.toISOString());
    });

    it("returns today + NEW_CARD_INTERVAL_DAYS for New Card graded Hard", () => {
        const date = new Date("2026-01-01T12:00:00Z");
        const expected = addDays(date, NEW_CARD_INTERVAL_DAYS);

        const nextReview = calculateNextReview(undefined, "hard", date, studySession.studyCards[0]);
        expect(expected.toISOString()).toBe(nextReview.toISOString());
    });

    it("returns 10 * EASY_INTERVAL_MULTIPLIER for Review Card graded Easy", () => {
        const date = new Date("2026-01-01T12:00:00Z");
        const previousInterval = 10;
        const interval = previousInterval * EASY_INTERVAL_MULTIPLIER;
        const expected = addDays(date, interval);

        const nextReview = calculateNextReview(userProgress.cardProgress[0], "easy", date, studySession.studyCards[0]);
        expect(expected.toISOString()).toBe(nextReview.toISOString());
    });

    it("returns 10 * GOOD_INTERVAL_MULTIPLIER for Review Card graded Good", () => {
        const date = new Date("2026-01-01T12:00:00Z");
        const previousInterval = 10;
        const interval = previousInterval * GOOD_INTERVAL_MULTIPLIER;
        const expected = addDays(date, interval);

        const nextReview = calculateNextReview(userProgress.cardProgress[0], "good", date, studySession.studyCards[0]);
        expect(expected.toISOString()).toBe(nextReview.toISOString());
    });

    it("returns 10 * HARD_INTERVAL_MULTIPLIER for Review Card graded Hard", () => {
        const date = new Date("2026-01-01T12:00:00Z");
        const previousInterval = 10;
        const interval = previousInterval * HARD_INTERVAL_MULTIPLIER;
        const expected = addDays(date, interval);

        const nextReview = calculateNextReview(userProgress.cardProgress[0], "hard", date, studySession.studyCards[0]);
        expect(expected.toISOString()).toBe(nextReview.toISOString());
    });

    it("Again x1, 10 days, Good Review card", () => {
        const date = new Date("2026-01-01T12:00:00Z");
        const previousInterval = 10;
        const againCount = 1;
        studySession.studyCards[1].againCount = againCount;
        const interval = Math.max(1,
            previousInterval *
            (AGAIN_INTERVAL_MULTIPLIER ** againCount) *
            GOOD_INTERVAL_MULTIPLIER
        );
        const expected = addDays(date, interval);

        const nextReview = calculateNextReview(userProgress.cardProgress[1], "good", date, studySession.studyCards[1]);
        expect(expected.toISOString()).toBe(nextReview.toISOString());
    });

    it("Again x2, 10 days, Good Review card", () => {
        const date = new Date("2026-01-01T12:00:00Z");
        const previousInterval = 10;
        const againCount = 2;
        studySession.studyCards[1].againCount = againCount;
        const interval = Math.max(1,
            previousInterval *
            (AGAIN_INTERVAL_MULTIPLIER ** againCount) *
            GOOD_INTERVAL_MULTIPLIER
        );
        const expected = addDays(date, interval);

        const nextReview = calculateNextReview(userProgress.cardProgress[1], "good", date, studySession.studyCards[1]);
        expect(expected.toISOString()).toBe(nextReview.toISOString());
    });

    it("Again x1, 1 year, Good Review card", () => {
        const date = new Date("2026-01-01T12:00:00Z");
        const previousInterval = 365;
        const againCount = 1;
        studySession.studyCards[2].againCount = againCount;
        const interval = Math.max(1,
            previousInterval *
            (AGAIN_INTERVAL_MULTIPLIER ** againCount) *
            GOOD_INTERVAL_MULTIPLIER
        );
        const expected = addDays(date, interval);

        const nextReview = calculateNextReview(userProgress.cardProgress[2], "good", date, studySession.studyCards[2]);
        expect(expected.toISOString()).toBe(nextReview.toISOString());
    });

    it("Again x2, 1 year, Good Review card", () => {
        const date = new Date("2026-01-01T12:00:00Z");
        const previousInterval = 365;
        const againCount = 2;
        studySession.studyCards[2].againCount = againCount;
        const interval = Math.max(1,
            previousInterval *
            (AGAIN_INTERVAL_MULTIPLIER ** againCount) *
            GOOD_INTERVAL_MULTIPLIER
        );
        const expected = addDays(date, interval);

        const nextReview = calculateNextReview(userProgress.cardProgress[2], "good", date, studySession.studyCards[2]);
        expect(expected.toISOString()).toBe(nextReview.toISOString());
    });
});

//////////////////////////////////
// updateCardProgress
//////////////////////////////////

describe("updateCardProgress", () => {
    let userProgress: UserProgress;
    let studySession: StudySession;
    let testDeck: LoadedDeck;

    beforeEach(async () => {
        testDeck = await loadDeck(testDeckPath);
        userProgress = await loadUserProgress(userId);
        studySession = createStudySession(testDeck, userProgress);
    });

    it("New card", () => {
        const endOfCardProgress: number = userProgress.cardProgress.length;
        updateCardProgress(
            userProgress,
            testDeck.deck.id,
            "good",
            studySession.studyCards[2]
        );
        const date = new Date();
        const nextReview = calculateNextReview(
            userProgress.cardProgress[endOfCardProgress],
            "good",
            date,
            studySession.studyCards[2]
        );

        expect(userProgress.cardProgress[endOfCardProgress]).toBeDefined();
        expect(userProgress.cardProgress[endOfCardProgress].reviewCount).toBe(1);
        expect(userProgress.cardProgress[endOfCardProgress].lastReviewGrade).toBe("good");
        expect(userProgress.cardProgress[endOfCardProgress].nextReview).toBe(nextReview.toISOString());
    });

    it("Existing card, good grade", () => {
        const card = studySession.studyCards.find(
            card =>
                card.card.id === userProgress.cardProgress[1].cardId
        );
        if (!card) {
            throw new Error("Expected study card to exist");
        }
        updateCardProgress(
            userProgress,
            testDeck.deck.id,
            "good",
            card
        );
        const date = new Date();
        const nextReview = calculateNextReview(
            userProgress.cardProgress[1],
            "good",
            date,
            card
        );

        expect(userProgress.cardProgress[1].reviewCount).toBe(2);
        expect(userProgress.cardProgress[1].lastReviewGrade).toBe("good");
        expect(userProgress.cardProgress[1].nextReview).toBe(nextReview.toISOString());
    });

    it("Existing card, again grade", () => {
        userProgress.cardProgress[1].reviewCount = 1;
        updateCardProgress(
            userProgress,
            testDeck.deck.id,
            "again",
            studySession.studyCards[1]
        );

        expect(userProgress.cardProgress[1].reviewCount).toBe(1);
    });
});