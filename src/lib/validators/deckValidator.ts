import { Deck } from "../../types/Deck";
import { ValidationResult } from "../../types/ValidationResult";

export function validateDeck(deck: Deck): ValidationResult {
    const errors: string[] = [];

    //*** Validate Deck ***
    // Check if ID exists and isn't blank.
    if (!validateID(deck.id))
        errors.push(`Deck "${deck.name}": ID is required.`)
    // Check if Name exists and isn't blank.
    // enter code here
    // Check if Cards array exists.
    // enter code here

    //*** Validate Card ***
    // Check if ID exists.
    // enter code here
    // Check if Order exists.
    // enter code here
    // Check if Type exists.
    // enter code here
    // Check if Front exists.
    // enter code here
    // Check if Back exists.
    // enter code here

    return {
        valid: errors.length === 0,
        errors
    };
}

function validateID(id: string): boolean {
    //catch undefined and null
    if (id == null)
        return false;
    // catch empty string and IDs with only white spaces
    if (id.trim() === "")
        return false;
    return true
}