export default function AnswerButton({ option, isSelected, onSelect }) {
  return (
    <button
      className={`w-full sm:w-36 px-4 py-3 border-2 rounded-2xl text-lg font-bold transition-all duration-200
        ${
          isSelected
            ? "bg-pink-600 text-white border-pink-600 shadow-lg"
            : "bg-white text-pink-600 border-pink-300 hover:bg-pink-200"
        }
      `}
      onClick={() => onSelect(option)}
    >
      {option}
    </button>
  );
}
