import { useState } from "react";
import AnswerButton from "./AnswerButton";

export default function Question({ questionData, onAnswerSubmit }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <div className="flex flex-col items-center bg-pink-100 p-6 rounded-3xl shadow-xl border-2 border-pink-300 w-full max-w-md">
      <img src={questionData.image} alt="Question" className="w-60 h-40 rounded-xl shadow-md border-2 border-pink-300" />
      <h3 className="text-xl text-pink-700 font-bold mt-4 text-center">{questionData.question}</h3>

      <div className="grid grid-cols-2 gap-4 mt-6 w-full">
        {questionData.options.map((option) => (
          <AnswerButton
            key={option}
            option={option}
            isSelected={selectedAnswer === option}
            onSelect={setSelectedAnswer}
          />
        ))}
      </div>

      <button
        className={`mt-6 px-6 py-3 font-bold text-lg rounded-xl w-full sm:w-auto transition-all duration-200 
          ${selectedAnswer ? "bg-red-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
        `}
        disabled={!selectedAnswer}
        onClick={() => onAnswerSubmit(selectedAnswer)}
      >
        Submit
      </button>
    </div>
  );
}
