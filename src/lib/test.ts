import { loadAllDecks, loadDeckManifest } from "../lib/deckLoader";
import { DeckManifest } from "../types/DeckManifest";
import { LoadedDeck } from "../types/LoadedDeck";
import { HomeClient } from "../components/HomeClient";
import path from "path";
import { UserProgress } from "../types/UserProgress";
import { loadUserProgress } from "../lib/progressStorage";
import { createStudySession } from "./studyScheduler";
import { saveProgressAction } from "@/app/actions";


    const manifestPath: string = path.join(process.cwd(), 'decks/manifest.json');
    const deckManifest: DeckManifest = await loadDeckManifest(manifestPath);
    const loadedDecks: LoadedDeck[] = await loadAllDecks(deckManifest);
    const userId: string = 'keisuke'
    const userProgress: UserProgress = await loadUserProgress(userId)

    //const studySession = createStudySession(loadedDecks[1], userProgress)
saveProgressAction(userProgress);