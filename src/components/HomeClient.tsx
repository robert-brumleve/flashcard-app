'use client';

import { DeckSelection } from "./DeckSelection";
import { LoadedDeck } from "../types/LoadedDeck";
import { StudyScreen } from "./StudyScreen";
import { useState } from "react";
import { createStudySession } from "../lib/studyScheduler";
import { UserProgress } from "../types/UserProgress";
import { NoStudyCards } from "./NoStudyCards";

interface HomeClientProps {
    loadedDecks: LoadedDeck[];
    userProgress: UserProgress;
}

export function HomeClient({loadedDecks, userProgress}: HomeClientProps) {
    const [selectedDeck, setSelectedDeck] = useState<LoadedDeck | null>(null);
    const onDeckSelected = (deck: LoadedDeck) => {
        setSelectedDeck(deck);
    };
    const onStudyComplete = () => {
        setSelectedDeck(null);
    }
    if (selectedDeck === null)
        return (
            <DeckSelection
                loadedDecks={loadedDecks}
                onDeckSelected={onDeckSelected}
            />
        );
    else if (selectedDeck !== null) {
        const studySession = createStudySession(selectedDeck, userProgress)
        if (studySession.studyCards.length === 0) {
            return (
                <NoStudyCards
                    setSelectedDeck={setSelectedDeck}
                />
            )
        }
        return (
            <StudyScreen
                studySession={studySession}
                onStudyComplete={onStudyComplete}
                userProgress={userProgress}
                deckId={selectedDeck.deck.id}
            />
        );
    }
}