import { describe, it, expect } from "vitest";
import { calculateReviewInterval, calculateNextReview } from "../progressManager";
import { loadAllDecks, loadDeckManifest } from "../../lib/deckLoader";
import { DeckManifest } from "../../types/DeckManifest";
import { LoadedDeck } from "../../types/LoadedDeck";
import path from "path";
import { UserProgress } from "../../types/UserProgress";
import { loadUserProgress } from "../../lib/progressStorage";
import { createStudySession } from "../studyScheduler";
import { EASY_INTERVAL_MULTIPLIER, GOOD_INTERVAL_MULTIPLIER, HARD_INTERVAL_MULTIPLIER, NEW_CARD_INTERVAL_DAYS } from "../constants";

const manifestPath: string = path.join(process.cwd(), 'decks/manifest.json');
const deckManifest: DeckManifest = await loadDeckManifest(manifestPath);
const loadedDecks: LoadedDeck[] = await loadAllDecks(deckManifest);
const userId: string = 'keisuke'
const userProgress: UserProgress = await loadUserProgress(userId)
const studySession = createStudySession(loadedDecks[2], userProgress)

//////////////////////////////////
// calculateReviewInterval
//////////////////////////////////

describe("calculateReviewInterval", () => {
    it("returns 1 for a one day interval", () => {
        const lastReviewed = "2026-07-31T06:57:56.061Z";
        const nextReview = "2026-08-01T06:57:56.061Z"
        expect(calculateReviewInterval(lastReviewed, nextReview)).toBe(1);
    });
});

describe("calculateReviewInterval", () => {
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
    it("returns today + NEW_CARD_INTERVAL_DAYS for New Card graded Easy", () => {
        const date = new Date();
        const expected = new Date(date);
        expected.setDate(expected.getDate() + NEW_CARD_INTERVAL_DAYS);

        const nextReview = calculateNextReview(undefined, "easy", date, studySession.studyCards[0]);
        expect(new Date(nextReview).toISOString()).toBe(expected.toISOString());
    });
});

describe("calculateNextReview", () => {
    it("returns today + NEW_CARD_INTERVAL_DAYS for New Card graded Hard", () => {
        const date = new Date();
        const expected = new Date(date);
        expected.setDate(expected.getDate() + NEW_CARD_INTERVAL_DAYS);

        const nextReview = calculateNextReview(undefined, "hard", date, studySession.studyCards[0]);
        expect(new Date(nextReview).toISOString()).toBe(expected.toISOString());
    });
});

describe("calculateNextReview", () => {
    it("returns 10 * EASY_INTERVAL_MULTIPLIER for Review Card graded Easy", () => {
        const date = new Date();
        const expected = new Date(date);
        const previousInterval = 10;
        expected.setDate(expected.getDate() + (previousInterval * EASY_INTERVAL_MULTIPLIER));

        const nextReview = calculateNextReview(userProgress.cardProgress[0], "easy", date, studySession.studyCards[0]);
        expect(new Date(nextReview).toISOString()).toBe(expected.toISOString());
    });
});

describe("calculateNextReview", () => {
    it("returns 10 * GOOD_INTERVAL_MULTIPLIER for Review Card graded Good", () => {
        const date = new Date();
        const expected = new Date(date);
        const previousInterval = 10;
        expected.setDate(expected.getDate() + (previousInterval * GOOD_INTERVAL_MULTIPLIER));

        const nextReview = calculateNextReview(userProgress.cardProgress[0], "good", date, studySession.studyCards[0]);
        expect(new Date(nextReview).toISOString()).toBe(expected.toISOString());
    });
});

describe("calculateNextReview", () => {
    it("returns 10 * HARD_INTERVAL_MULTIPLIER for Review Card graded Good", () => {
        const date = new Date();
        const expected = new Date(date);
        const previousInterval = 10;
        expected.setDate(expected.getDate() + (previousInterval * HARD_INTERVAL_MULTIPLIER));

        const nextReview = calculateNextReview(userProgress.cardProgress[0], "hard", date, studySession.studyCards[0]);
        expect(new Date(nextReview).toISOString()).toBe(expected.toISOString());
    });
});
