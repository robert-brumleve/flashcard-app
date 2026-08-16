import { useState } from "react";
import { CardType } from "../../types/Card";
import { LoadedDeck } from "../../types/LoadedDeck";
import { Deck } from "../../types/Deck";
import { CreateCardInput, createCard } from "../../lib/cardFactory";
import { addCard } from "../../lib/deckEditor";

interface CardEditorProps {
    loadedDeck: LoadedDeck;
    handleDeckUpdated: (loadedDeck: LoadedDeck) => void;
}

export function CardEditor ({
    loadedDeck,
    handleDeckUpdated,
}: CardEditorProps) {
    const [cardType, setCardType] = useState<CardType>("vocabulary");
    const [frontText, setFrontText] = useState("");
    const [backText, setBackText] = useState("");
    const rowStyle = {
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        marginBottom: '15px'
    };
    const labelStyle = {
        width: "150px"
    };
    const handleSubmit = (event: React.SubmitEvent) => {
        event.preventDefault();

        const input: CreateCardInput = {
            type: cardType,
            front: {
                text: frontText,
                images: [],
                audio: []
            },
            back: {
                text: backText,
                images: [],
                audio: []
            }
        };

        const card = createCard(input);
        const updatedDeck = addCard(loadedDeck.deck, card);
        handleDeckUpdated({
            ...loadedDeck,
            deck: updatedDeck
        });
    };

    return(
        <form onSubmit={handleSubmit}>
            <div style={rowStyle}>
                <label
                    htmlFor="card-type"
                    style={labelStyle}
                >
                    Card Type:
                </label>
                <select
                    id="card-type"
                    value={cardType}
                    onChange={(event) => setCardType(event.target.value as CardType)}
                >
                    <option value="vocabulary">Vocabulary</option>
                    <option value="speaking">Speaking</option>
                </select>
            </div>
            <div style={rowStyle}>
                <label
                    htmlFor="front-text"
                    style={labelStyle}
                >
                    Front Text:
                </label>
                <input
                    id="front-text"
                    type="text"
                    value={frontText}
                    onChange={(event) => setFrontText(event.target.value)}
                />
            </div>
            <div style={rowStyle}>
                <label
                    htmlFor="back-text"
                    style={labelStyle}
                >
                    Back Text:
                </label>
                <input
                    id="back-text"
                    type="text"
                    value={backText}
                    onChange={(event) => setBackText(event.target.value)}
                />
            </div>
            {cardType === "speaking" && (
                <>
                    <div style={rowStyle}>
                        <label
                            htmlFor="speech-threshold"
                            style={labelStyle}
                        >
                            Speech Threshold:
                        </label>
                        <input
                            id="speech-threshold"
                            type="number"
                        />
                    </div>
                    <div style={rowStyle}>
                        <label
                            htmlFor="accepted-answer"
                            style={labelStyle}
                        >
                            Accepted Answer:
                        </label>
                        <input
                            id="accepted-answer"
                            type="text"
                        />
                    </div>
                </>
            )}
            <div style={rowStyle}>
                <button type="submit">
                    Add Card
                </button>
            </div>
        </form>
    )
}