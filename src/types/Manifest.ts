export interface ManifestEntry {

    path: string;

    enabled: boolean;
}

export interface Manifest {

    version: number;

    decks: ManifestEntry[];
}