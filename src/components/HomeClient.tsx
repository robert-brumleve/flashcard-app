'use client';

import { DeckSelection } from "./DeckSelection";
import { LoadedDeck } from "../types/LoadedDeck";
import { StudyScreen } from "./StudyScreen";
import { useState } from "react";
import { createStudySession } from "@/lib/studySessionBuilder";

interface HomeClientProps {
    loadedDecks: LoadedDeck[];
}

export function HomeClient({loadedDecks}: HomeClientProps) {
    const [selectedDeck, setSelectedDeck] = useState<LoadedDeck | null>(null);
    const onDeckSelected = (deck: LoadedDeck) => {
        setSelectedDeck(deck);
    };
    const clearSelectedDeck = () => {
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
        const studySession = createStudySession(selectedDeck)
        return (
            <StudyScreen
            studySession={studySession}
            clearSelectedDeck={clearSelectedDeck}
            />
        );
    }
}