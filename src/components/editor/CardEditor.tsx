import { useState } from "react";
import { CardType } from "../../types/Card";
import { LoadedDeck } from "../../types/LoadedDeck";
import { CreateCardInput, createCard } from "../../lib/cardFactory";
import { addCard } from "../../lib/deckEditor";
import { AcceptedAnswer } from "../../types/AcceptedAnswer";

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
    const [speechThreshold, setSpeechThreshold] = useState<number>(5);
    const [acceptedAnswers, setAcceptedAnswers] = useState<string[]>([]);
    const rowStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        gap: '10px', 
        marginBottom: '15px'
    };
    const labelStyle = {
        width: "150px"
    };
    const answers: AcceptedAnswer[] = [
    {
        text: frontText,
        primary: true
    },
    ...acceptedAnswers.map((text) => ({
        text,
        primary: false
    }))
];
    const handleSubmit = (event: React.SubmitEvent) => {
        event.preventDefault();
        let input: CreateCardInput;

        if (cardType === "vocabulary") {
            input = {
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
        }
        else {
            input = {
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
                },
                speechThreshold: speechThreshold,
                acceptedAnswers: answers
            };
        }

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
                            value={speechThreshold}
                            onChange={(event) => setSpeechThreshold(Number(event.target.value))}
                        />
                    </div>
                    <div style={rowStyle}>
                        <label style={labelStyle}>
                            Accepted Answers:
                        </label>
                        <div>
                            {acceptedAnswers.map((answer, index) => (
                                <div key={index} style={rowStyle}>
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(event) => {
                                            const updatedAnswers = [...acceptedAnswers];
                                            updatedAnswers[index] = event.target.value;
                                            setAcceptedAnswers(updatedAnswers);
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAcceptedAnswers(
                                                acceptedAnswers.filter((_, i) => i !== index)
                                            );
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => setAcceptedAnswers([...acceptedAnswers, ""])}
                            >
                                + Add Answer
                            </button>
                        </div>
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