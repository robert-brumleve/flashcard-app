import { loadAllDecks, loadManifest } from "../lib/deckLoader";
import { Manifest } from "../types/Manifest";
import { LoadedDeck } from "../types/LoadedDeck";
import { HomeClient } from "../components/HomeClient";

export default async function Home() {
    const manifest: Manifest = await loadManifest("C:/Users/user/flashcard-app/decks/manifest.json");
    const loadedDecks: LoadedDeck[] = await loadAllDecks(manifest);
    
    return (
        <HomeClient
        loadedDecks={loadedDecks}
        />
    );
}