import { Card } from "./Card";
import { LoadedDeck } from "./LoadedDeck";

export interface StudySession {

    loadedDeck: LoadedDeck;

    studyCards: Card[];
}