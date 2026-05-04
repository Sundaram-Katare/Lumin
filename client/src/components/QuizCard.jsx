import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function QuizCard({ quiz }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const openQuiz = () => {
    setOpen(true);
    navigate("/quiz", {
      state: { _id: quiz._id, from: "Trivia" }
    });
  };

    const getDifficultyColor = (difficulty) => {
  if (difficulty=="Easy") {
    return "bg-green-700";
  } else if (difficulty=="Medium") {
    return "bg-yellow-700";
  } else {
    return "bg-red-700";
  }
};

  return (
    <motion.div
      className="p-6 bg-white rounded-3xl border-4 border-blue-200 flex flex-col items-center max-w-xs mx-auto shadow-2xl transition-all duration-300 hover:scale-105 sm:max-w-sm md:max-w-md"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.01 }}
    >
      {/* Decorative icon */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4 flex items-center justify-center">
        <img
          src={quiz.image}
          className="border rounded-xl h-full w-full object-cover"
          alt={quiz.title || "Quiz"}
        />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-center mb-1 text-gray-800">
        {quiz.title}
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <span className={`inline-block ${getDifficultyColor(quiz.difficulty)} text-white text-lg font-bold px-5 py-2 rounded-2xl shadow`}>
          {quiz.difficulty}
        </span>
      </div>

      <p className="text-gray-500 text-center mb-6 px-2 sm:px-4 text-sm sm:text-base">
        Create, customize, and challenge your friends!
      </p>

      {/* "Get Started" button */}
      <div className="w-full px-2 sm:px-4">
        <button
          onClick={openQuiz}
          className="w-full py-2 sm:py-3 px-4 sm:px-5 rounded-xl text-white font-semibold shadow-lg transition-transform transform hover:scale-105 bg-[#ff7514]"
        >
          Get Started
        </button>
      </div>
    </motion.div>
  );
}
