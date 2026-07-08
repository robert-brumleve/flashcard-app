import { Deck } from "../../types/Deck";
import { Card } from "../../types/Card";
import { ValidationResult } from "../../types/ValidationResult";

export function validateDeck(deck: Deck): ValidationResult {
    const errors: string[] = [];

    //*** Validate Deck ***
    // Check if ID exists and isn't blank.
    if (isNullOrEmptyString(deck.id))
        errors.push(`Deck Name "${deck.name}": ID is required.`)
    // Check if Name exists and isn't blank.
    if (isNullOrEmptyString(deck.name))
        errors.push(`Deck ID "${deck.id}": Name is required.`)
    // Check if Cards array exists.
    if (!Array.isArray(deck.cards))
        errors.push(`Deck Name "${deck.name}": Cards array is required.`)

    //*** Validate Card ***
    for (const i in deck.cards) {
        const card: Card = deck.cards[i]
        // Check if ID exists.
        if (isNullOrEmptyString(card.id))
            errors.push(`Card Order "${card.order}": ID is required.`)
        // Check if Order exists.
        if (!Number.isInteger(card.order))
            errors.push(`Deck ID "${card.id}": Order is required.`)
        // Check if Type exists.
        // enter code here
        // Check if Front exists.
        // enter code here
        // Check if Back exists.
        // enter code here
    }
    return {
        valid: errors.length === 0,
        errors
    };
}

function isNullOrEmptyString(id: string | null | undefined): boolean {
    // catch undefined and null
    if (id == null)
        return true;
    // catch empty string and IDs with only white spaces
    if (id.trim() === "")
        return true;
    return false
}