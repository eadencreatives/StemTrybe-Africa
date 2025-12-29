import { useState } from 'react';

export default function PracticeQuestions({ questions = [] }) {
  const [answers, setAnswers] = useState({});

  if (!questions || questions.length === 0) return null;

  const handleSelect = (qIdx, choice) => {
    setAnswers(prev => ({ ...prev, [qIdx]: choice }));
  };

  return (
    <section className="practice-questions">
      <h3>Practice questions</h3>
      {questions.map((q, i) => (
        <div key={i} className="question">
          <p>{i + 1}. {q.question}</p>
          {q.choices && q.choices.map((c, j) => (
            <label key={j}>
              <input type="radio" name={`q${i}`} onChange={() => handleSelect(i, c)} checked={answers[i] === c} /> {c}
            </label>
          ))}
        </div>
      ))}
    </section>
  );
}
