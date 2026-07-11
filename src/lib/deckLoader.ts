import { Deck } from "../types/Deck";
import { LoadedDeck } from "../types/LoadedDeck";
import { validateDeck } from "./validators/deckValidator";
import { readFile } from "fs/promises";
import path from 'path';
import { ASSETS_FOLDER_NAME } from "./constants";
import { readdir } from "fs/promises";

export async function findDeckFiles(dirPath: string, results: string[] = []): Promise<string[]> {
    // Read directory
    const files = await readdir(dirPath, {withFileTypes: true});

    // Loop through each entry
    for (const file of files) {
        const filePath = path.join(dirPath, file.name);

        // Recursive call if directory
        if (file.isDirectory()) {
            await findDeckFiles(filePath, results);

        // Add deck.json files to results
        } else if (file.name === "deck.json")
            results.push(filePath);
    }

    return results
}

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

export async function loadAllDecks(decksPath: string): Promise<LoadedDeck[]> {
    // Ask findDeckFiles() for every deck.json
    const deckFiles = await findDeckFiles(decksPath);

    // Create an empty LoadedDeck array
    const loadedDecks: LoadedDeck[] = [];

    for (const deckPath of deckFiles) {
        // Load the deck
        const loadedDeck = await loadDeck(deckPath);

        // Add the deck to the LoadedDeck array
        loadedDecks.push(loadedDeck);
    }

    return loadedDecks;
}