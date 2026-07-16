export interface ManifestEntry {

    path: string;

    enabled: boolean;
}

export interface DeckManifest {

    version: number;

    decks: ManifestEntry[];
}