import { loadAllDecks, loadManifest } from "../lib/deckLoader";
import { Manifest } from "../types/Manifest";
import { DeckSelection } from "../components/HomeClient";
import { LoadedDeck } from "../types/LoadedDeck";

export default async function Home() {
    const manifest: Manifest = await loadManifest("C:/Users/user/flashcard-app/decks/manifest.json");
    const loadedDecks: LoadedDeck[] = await loadAllDecks(manifest);
    
    return (
        <DeckSelection
        loadedDecks={loadedDecks}
        />
    );
}