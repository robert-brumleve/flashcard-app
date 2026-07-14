import { StudySession } from "../types/StudySession";
import { LoadedDeck } from "../types/LoadedDeck";

export function createStudySession(loadedDeck: LoadedDeck) {
    const studySession: StudySession = {loadedDeck, studyCards: [...loadedDeck.deck.cards]};

    return studySession;
}