import { Grade } from "../../types/CardProgress";
import { Card } from "../../types/Card";
import { useState } from "react";

interface VocabularyCardProps {
    card: Card;
    onGrade: (grade: Grade) => void;
}

export function VocabularyCard({card, onGrade}: VocabularyCardProps) {
    const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);

    return (
        <ul>
            <li>{card.front.text}</li>
                {!answerRevealed ? (
                    <button onClick={() => setAnswerRevealed(true)}>
                        Show Answer
                    </button>
                ) : (
                    <>
                        <li>{card.back.text}</li>

                        <button onClick={() => onGrade("easy")}>
                            Easy
                        </button>

                        <button onClick={() => onGrade("hard")}>
                            Hard
                        </button>
                    </>
                )}
        </ul>
    );
}