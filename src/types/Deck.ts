import { Card } from "./Card";

export interface Deck {
    
    id: string;

    name: string;

    version: number;

    cards: Card[];
}