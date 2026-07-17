import { loadAllDecks, loadDeckManifest } from "../lib/deckLoader";
import { DeckManifest } from "../types/DeckManifest";
import { LoadedDeck } from "../types/LoadedDeck";
import path from "path";
import { UserProgress } from "../types/UserProgress";
import { loadUserProgress } from "../lib/progressStorage";
import { StudySession } from "@/types/StudySession";
import { createStudySession } from "./studyScheduler";

const manifestPath: string = path.join(process.cwd(), 'decks/manifest.json');
const deckManifest: DeckManifest = await loadDeckManifest(manifestPath);
const loadedDecks: LoadedDeck[] = await loadAllDecks(deckManifest);
const userProgressPath: string = path.join(process.cwd(), 'users/keisuke/progress.json');
const userProgress: UserProgress = await loadUserProgress(userProgressPath)
const studySession: StudySession = createStudySession(loadedDecks[1], userProgress)