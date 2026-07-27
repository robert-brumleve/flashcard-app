import { Grade } from "../../types/CardProgress";
import { Card } from "../../types/Card";
import { useState } from "react";

interface SpeakingCardProps {
    card: Card;
    onGrade: (grade: Grade) => void;
}

export function SpeakingCard({card, onGrade}: SpeakingCardProps) {
    const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
    const [grade, setGrade] = useState<Grade>('easy');

    const handleGrade = (grade: Grade) => {
        setAnswerRevealed(true);
        setGrade(grade);
    }

    return (
        <ul>
            <li>{card.front.text}</li>
                {!answerRevealed ? (
                    <>
                        <button onClick={() => handleGrade("easy")}>
                            Speak
                        </button>

                        <button onClick={() => handleGrade("again")}>
                            I don't know
                        </button>
                    </>
                ) : (
                    <>
                        <li>{card.back.text}</li>

                        <button onClick={() => onGrade(grade)}>
                            Next
                        </button>
                    </>
                )}
        </ul>
    );
}