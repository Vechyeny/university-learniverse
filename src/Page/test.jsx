import React, { useState } from "react";

const questions = [
  {
    id: "Q1",
    question: "What is your favorite color?",
    answers: [
      { id: "A1", answer: "Red" },
      { id: "A2", answer: "Blue" },
      { id: "A3", answer: "Green" },
      { id: "A4", answer: "Yellow" },
    ],
  },
  {
    id: "Q2",
    question: "What is your favorite form of expression?",
    answers: [
      { id: "A1", answer: "Science" },
      { id: "A2", answer: "Art" },
      { id: "A3", answer: "Medical" },
      { id: "A4", answer: "Lecturing" },
    ],
  },
  {
    id: "Q3",
    question: "What is your favorite form expression?",
    answers: [
      { id: "A1", answer: "Science" },
      { id: "A2", answer: "Art" },
      { id: "A3", answer: "Medical" },
      { id: "A4", answer: "Lecturing" },
    ],
  },
];

const jobProfessions = [
  { answer: "A1", profession: "Scientist" },
  { answer: "A2", profession: "Artist" },
  { answer: "A3", rofession: "Doctor" },
  { answer: "A4", profession: "Professor" },
];

const Test = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedProfession, setSelectedProfession] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isAllAnswered = Object.keys(answers).length === questions.length;
    setIsFormSubmitted(isAllAnswered);

    let profession = null;

    if (isAllAnswered) {
      const selectedAnswerIds = Object.values(answers);
      const selectedAnswerCounts = selectedAnswerIds.reduce(
        (counts, answerId) => {
          counts[answerId] = (counts[answerId] || 0) + 1;
          return counts;
        },
        {}
      );

      const mostSelectedAnswerId = Object.keys(selectedAnswerCounts).reduce(
        (a, b) => (selectedAnswerCounts[a] > selectedAnswerCounts[b] ? a : b)
      );
      console.log("most selectedAnswer : ", mostSelectedAnswerId);

      profession = jobProfessions.find(
        (job) => job.answer === mostSelectedAnswerId
      );
      console.log(profession);
      if (profession) {
        setSelectedProfession(profession.profession);
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerChange = (questionId, answerId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="mt-10">
      {!isFormSubmitted && (
        <form
          onSubmit={handleFormSubmit}
          className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl font-bold mb-4">
            {currentQuestion.question}
          </h1>
          {currentQuestion.answers.map((answer) => (
            <div key={answer.id} className="mb-2">
              <label htmlFor={answer.id} className="flex items-center">
                <input
                  type="radio"
                  id={answer.id}
                  name="answer"
                  value={answer.id}
                  checked={answers[currentQuestion.id] === answer.id}
                  onChange={() =>
                    handleAnswerChange(currentQuestion.id, answer.id)
                  }
                  className="mr-2 cursor-pointer"
                />
                <span>{answer.answer}</span>
              </label>
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Next
          </button>
        </form>
      )}

      {isFormSubmitted && Object.keys(answers).length === questions.length && (
        <div className="mt-4">
          <p className="text-lg font-bold">Recommended Job Profession:</p>
          <p>{selectedProfession}</p>
        </div>
      )}

      {/* For Debugging: Display selected answers */}
      {/* {isFormSubmitted && (
        <div className="mt-4">
          <p>Debug - Selected Answers:</p>
          <pre>{JSON.stringify(answers, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default Test;
