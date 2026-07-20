import { StudyCard } from "./StudyCard";
import { LoadedDeck } from "./LoadedDeck";

export interface StudySession {

    loadedDeck: LoadedDeck;

    studyCards: StudyCard[];

    reviewCardCount: number;

    newCardCount: number;
}