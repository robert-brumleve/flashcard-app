import { describe, it, expect, beforeEach } from "vitest";
import { Deck } from "../../types/Deck";
import { createCard, CreateCardInput } from "../cardFactory";
import { Card } from "../../types/Card";
import { addCard } from "../deckEditor";

describe("createCard", () => {
    let vocabCardInput: CreateCardInput;
    let vocabCard: Card;
    let speakCardInput: CreateCardInput;
    let speakCard: Card;
    beforeEach(() => {
        // Vocabulary Card
        vocabCardInput = {
            type: "vocabulary",
            front: {
                text: "testCardFront",
                images: [],
                audio: []
            },
            back: {
                text: "testCardBack",
                images: [],
                audio: []
            }
        }
        vocabCard = createCard(vocabCardInput);

        // Speaking Card
        speakCardInput = {
            type: "speaking",
            front: {
                text: "testCardFront",
                images: [],
                audio: []
            },
            back: {
                text: "testCardBack",
                images: [],
                audio: []
            },
            speechThreshold: 5,
            acceptedAnswers: [
                {
                    text: "testCardBack",
                    primary: true
                }
            ]
        }
        speakCard = createCard(speakCardInput);
    });

    it("create a vocabulary card", () => {
        expect(vocabCard.type).toBe("vocabulary");
        expect(vocabCard.id).toEqual(expect.any(String));
        expect(vocabCard.front).toEqual(vocabCardInput.front);
        expect(vocabCard.back).toEqual(vocabCardInput.back);
        expect(vocabCard).not.toHaveProperty("speechThreshold");
        expect(vocabCard).not.toHaveProperty("acceptedAnswers");
    });

    it("create a speaking card", () => {
        expect(speakCard.type).toBe("speaking");
        expect(speakCard.id).toEqual(expect.any(String));
        expect(speakCard.front).toEqual(speakCardInput.front);
        expect(speakCard.back).toEqual(speakCardInput.back);
        expect(speakCard.acceptedAnswers).toEqual(speakCardInput.acceptedAnswers);
        expect(speakCard.speechThreshold).toBe(speakCardInput.speechThreshold);
    });

    it("create different IDs for cards", () => {
        expect(vocabCard.id).not.toBe(speakCard.id);
    });
});

describe("addCard", () => {
    it("adds a card to the end of the deck", () => {
        // Create test card
        const testCardInput: CreateCardInput = {
            type: "vocabulary",
            front: {
                text: "vocabCardFront",
                images: [],
                audio: []
            },
            back: {
                text: "vocabCardBack",
                images: [],
                audio: []
            }
        }
        const testCard: Card = createCard(testCardInput);

        // Create test deck
        const deck: Deck = {
            id: "testId",
            name: "testName",
            version: 1,
            cards: [
                {
                    id: "speakCardId",
                    type: "speaking",
                    front: {
                        text: "speakCardFront",
                        images: [],
                        audio: []
                    },
                    back: {
                        text: "speakCardBack",
                        images: [],
                        audio: []
                    },
                    speechThreshold: 5,
                    acceptedAnswers: [
                        {
                            text: "acceptedAnswer",
                            primary: true
                        }
                    ]
                }
            ]
        };

        // Add card to deck
        const updatedDeck = addCard(deck, testCard);

        expect(updatedDeck.cards).toHaveLength(2);
        expect(updatedDeck.cards[updatedDeck.cards.length - 1]).toBe(testCard);
        expect(deck.cards).toHaveLength(1);
    });
});