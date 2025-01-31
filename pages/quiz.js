import { useState, useEffect } from "react";

const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showMedia, setShowMedia] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  const questions = [
    {
      question: "What did Rizel say about my style?",
      options: ["Cute bb", "My boo", "Rat egg", "So pogi"],
      answer: "Rat egg",
      questionMedia: "/question1.png",
      answerMedia: "/answer1.jpg",
    },
    {
      question: "What made Rizel laugh so much?",
      options: ["Kurt's dumb face", "A random joke", "Just laughing", "A chemistry question"],
      answer: "A chemistry question",
      questionMedia: "/question2.png",
      answerMedia: "/answer2.jpg",
    },
    {
      question: "When did this message happen?",
      options: ["After 1st call", "After 1st kiss", "After 1st date", "After 1st hug"],
      answer: "After 1st date",
      questionMedia: "/question3.jpg",
      answerMedia: "/answer3.jpg",
    },
    {
      question: "What did Rizel say about Kurt's edit?",
      options: ["Bobo", "Buang", "Sabog", "Hakdog"],
      answer: "Buang",
      questionMedia: "/question4.png",
      answerMedia: "/answer4.jpg",
    },
    {
      question: "How did Rizel describe her hand?",
      options: ["Heart", "Oblong", "Egg", "Zero"],
      answer: "Oblong",
      questionMedia: "/question5.png",
      answerMedia: "/answer5.jpg",
    },
    {
      question: "How did Kurt react to Rizel's photo?",
      options: ["LULUSAWIN MO KO", "SOBRANG GANDA SHET", "MAMAMATAY NA KO", "GF KO TO"],
      answer: "LULUSAWIN MO KO",
      questionMedia: "/question6.jpg",
      answerMedia: "/answer6.jpg",
    },
    {
      question: "What was Mallows looking at?",
      options: ["Banana", "Nuggets", "Zip-tie", "Bottle Cap"],
      answer: "Zip-tie",
      questionMedia: "/question7.png",
      answerMedia: "/answer7.jpg",
    },
    {
      question: "Where was Rizel's photo taken?",
      options: ["In MOA", "DLSU HSI", "Random CR", "Cebu Pacific"],
      answer: "Cebu Pacific",
      questionMedia: "/question8.png",
      answerMedia: "/answer8.jpg",
    },
    {
      question: "What did Rizel caption her selfies?",
      options: ["Blessing your night", "My bangs so pretty", "I love you my bb", "Making your day better"],
      answer: "Blessing your night",
      questionMedia: "/question9.png",
      answerMedia: "/answer9.jpg",
    },
    {
      question: "What was Kurt's reaction to Rizel's selfie?",
      options: ["👅", "😘", "😳", "😍"],
      answer: "👅",
      questionMedia: "/question10.jpg",
      answerMedia: "/answer10.jpg",
    },
  ];

  const totalQuestions = questions.length;

  useEffect(() => {
    if (questionIndex >= totalQuestions) {
      setQuizFinished(true);
    }
  }, [questionIndex, totalQuestions]);

  if (!quizFinished && questionIndex >= totalQuestions) {
    return null; // or loading state while transitioning to results
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === questions[questionIndex].answer) {
      setCorrectAnswers((prev) => prev + 1);
      setShowMedia(true);
    } else {
      setWrongAnswers((prev) => [...prev, { question: questions[questionIndex].question, chosen: selectedOption, correct: questions[questionIndex].answer }]);
      setQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleNext = () => {
    setLoadingNext(true); // Start transition effect
    setTimeout(() => {
      setQuestionIndex((prev) => prev + 1);
      setShowMedia(false);
      setSelectedOption(null);
      setLoadingNext(false); // End transition effect
    }, 300); // Adjust delay as needed
  };

  const restartQuiz = () => {
    setQuestionIndex(0);
    setShowMedia(false);
    setSelectedOption(null);
    setCorrectAnswers(0);
    setWrongAnswers([]);
    setQuizFinished(false);
  };

  const getMediaComponent = (mediaPath) => {
    const extension = mediaPath.split(".").pop().toLowerCase();
    if (extension === "mp4") {
      return <video src={mediaPath} controls className="w-full max-w-md rounded-lg mb-6" autoPlay />;
    }
    return <img src={mediaPath} alt="Media content" className="w-full max-w-md rounded-lg mb-6" />;
  };

  if (quizFinished) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Conditional Background Video */}
        <video 
          autoPlay
          muted
          loop
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={quizFinished ? "/resultbg.mp4" : "/quizbg.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center text-white">
          {correctAnswers === totalQuestions ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">Will you be my Valentine? ❤️🥺🥰</h1>
              <video src="/EndingVideo.mp4" controls className="w-full max-w-md rounded-lg mb-6 mx-auto" />
            </div>
          ) : (
            <div className="text-center bg-black/30 p-8 rounded-xl backdrop-blur-sm">
              <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">Oops! You got {correctAnswers}/{totalQuestions} correct.</h1>
              <h2 className="text-lg font-semibold mb-4 drop-shadow">Here’s what you got wrong:</h2>
              <ul className="text-left mb-4">
                {wrongAnswers.map((item, index) => (
                  <li key={index} className="mb-2">
                    ❌ <strong>{item.question}</strong> - You chose <span className="text-red-300">{item.chosen}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={restartQuiz} 
                className="px-6 py-2 bg-red-500/90 text-white rounded-lg hover:bg-red-600 backdrop-blur-sm transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video 
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={quizFinished ? "/resultbg.mp4" : "/quizbg.mp4"} type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center text-white">
        {showMedia ? (
          <div className="text-center bg-black/10 p-8 rounded-xl backdrop-blur-sm">
            <h1 className="text-2xl font-bold mb-4 drop-shadow">You answered right!</h1>
            {getMediaComponent(questions[questionIndex]?.answerMedia)} {/* Added optional chaining */}
            <button 
              onClick={handleNext} 
              className="mt-2 px-6 py-2 bg-red-500/90 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              {questionIndex === totalQuestions - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        ) : (
          <div className={`transition-opacity duration-300 ${loadingNext ? "opacity-0" : "opacity-100"}`}>
            <h1 className="text-2xl font-bold mb-4 drop-shadow-lg">
              {questions[questionIndex]?.question}
            </h1>
            {questions[questionIndex]?.questionMedia && getMediaComponent(questions[questionIndex].questionMedia)}
            
            <div className="grid grid-cols-2 gap-4">
              {questions[questionIndex]?.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    selectedOption === option 
                      ? 'bg-green-700/90' 
                      : 'bg-green-500/70 hover:bg-green-600/90'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`mt-4 px-6 py-2 ${
                selectedOption 
                  ? 'bg-red-500/90 hover:bg-red-600' 
                  : 'bg-gray-400/50 cursor-not-allowed'
              } text-white rounded-lg transition-all`}
            >
              Submit Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;