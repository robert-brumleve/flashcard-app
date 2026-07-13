'use client';

import { DeckSelection } from "./DeckSelection";
import { LoadedDeck } from "../types/LoadedDeck";
import { StudyScreen } from "./StudyScreen";
import { useState } from "react";

interface HomeClientProps {
    loadedDecks: LoadedDeck[];
}

export function HomeClient({loadedDecks}: HomeClientProps) {
    const [selectedDeck, setSelectedDeck] = useState<LoadedDeck | null>(null);
    const onDeckSelected = (deck: LoadedDeck) => {
        setSelectedDeck(deck);
    };
    if (selectedDeck === null)
        return (
            <DeckSelection
            loadedDecks={loadedDecks}
            onDeckSelected={onDeckSelected}
            />
        );
    else if (selectedDeck !== null)
        return (
            <StudyScreen
            deck={selectedDeck}
            />
        );
}