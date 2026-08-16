'use client';

import { DeckSelection } from "./DeckSelection";
import { LoadedDeck } from "../types/LoadedDeck";
import { StudyScreen } from "./StudyScreen";
import { useState } from "react";
import { createStudySession } from "../lib/studyScheduler";
import { UserProgress } from "../types/UserProgress";
import { NoStudyCards } from "./NoStudyCards";
import { AppMode } from "../types/AppMode";
import { DeckEditor } from "./editor/DeckEditor";

interface HomeClientProps {
    loadedDecks: LoadedDeck[];
    userProgress: UserProgress;
}

export function HomeClient({loadedDecks, userProgress}: HomeClientProps) {
    const [selectedDeck, setSelectedDeck] = useState<LoadedDeck | null>(null);
    const [appMode, setAppMode] = useState<AppMode>("study");
    const onStudyModeSelected = (deck: LoadedDeck) => {
        setSelectedDeck(deck);
        setAppMode("study");
    };
    const onEditModeSelected = (deck: LoadedDeck) => {
        setSelectedDeck(deck);
        setAppMode("edit");
    };
    const onDeckDeselected = () => {
        setSelectedDeck(null);
    }
    const onDeckUpdated = (updatedDeck: LoadedDeck) => {
        setSelectedDeck(updatedDeck);
    };
    if (selectedDeck === null) {
        return (
            <DeckSelection
                loadedDecks={loadedDecks}
                onStudyModeSelected={onStudyModeSelected}
                onEditModeSelected={onEditModeSelected}
            />
        );
    }
    if (appMode === "edit") {
        return (
            <DeckEditor
                loadedDeck={selectedDeck}
                onDeckDeselected={onDeckDeselected}
                onDeckUpdated={onDeckUpdated}
            />
        );
    }
    const studySession = createStudySession(selectedDeck, userProgress);
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
            onDeckDeselected={onDeckDeselected}
            userProgress={userProgress}
            deckId={selectedDeck.deck.id}
        />
    );
}