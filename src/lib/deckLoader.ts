import { Deck } from "../types/Deck";
import { LoadedDeck } from "../types/LoadedDeck";
import { validateDeck } from "./validators/deckValidator";
import { readFile } from "fs/promises";
import path from 'path';
import { ASSETS_FOLDER_NAME } from "./constants";

export async function loadDeck(deckPath: string): Promise<LoadedDeck> {
    // Read file
    const json = await readFile(deckPath, "utf8");

    // Parse JSON
    const deck: Deck = JSON.parse(json);

    //Validate
    const validationResult = validateDeck(deck);

    // Throw if invalid
    if (!validationResult.valid)
        throw validationResult.errors;

    // Get path to assets directory
    const deckFolderPath = path.dirname(deckPath);
    const deckRootPath = path.resolve(deckFolderPath, '..');
    const assetsFolderPath = path.join(deckRootPath, ASSETS_FOLDER_NAME);

    // Build LoadedDeck
    const loadedDeck: LoadedDeck = {
        deck: deck,
        deckPath: deckPath,
        assetsPath: assetsFolderPath
    }

    return loadedDeck;
}