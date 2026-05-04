import { useSelector, useDispatch } from "react-redux";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { incrementQuizParticipated } from "../feature/auth/authSlice.js";

export default function QuizPage({ id }) {
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const quiz = quizzes.find((quiz) => quiz._id === id);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
  if (difficulty=="Easy") {
    return "bg-green-700";
  } else if (difficulty=="Medium") {
    return "bg-yellow-700";
  } else {
    return "bg-red-700";
  }
};

  const backToTriviaPage = () => {
    navigate("/trivia");
  };

  const startQuiz = async () => {
    try {
      if (quiz.live === "No") {
        await dispatch(incrementQuizParticipated()).unwrap();
      }
    } catch (err) {
      // Handle error
    }
    navigate("/quizStart", {
      state: { _id: id, from: "quiz" },
    });
  };

  if (!quiz) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-white">
        <h1 className="text-2xl font-bold text-gray-700">Quiz not found.</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-poppins w-full justify-center items-center bg-gradient-to-r from-[#392a5c] to-[#030008]">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-5xl min-h-[70vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 gap-6">
          <IoMdArrowBack color="black" size={36} onClick={backToTriviaPage} className="cursor-pointer" />
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 text-left">
            {quiz.title}
          </h1>
          <h2 className="text-lg md:text-2xl font-semibold text-blue-700">Description</h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">{quiz.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block bg-blue-700 text-white text-lg font-bold px-5 py-2 rounded-2xl shadow">
              {quiz.questions.length} Questions
            </span>
            <span className={`inline-block ${getDifficultyColor(quiz.difficulty)} text-white text-lg font-bold px-5 py-2 rounded-2xl shadow`}>
              {quiz.difficulty}
            </span>
          </div>
          <button
            className="w-full md:w-1/2 py-3 mt-2 bg-yellow-500 text-black font-semibold text-lg rounded-lg hover:bg-yellow-400 transition"
            onClick={startQuiz}
          >
            Start Quiz
          </button>

          <div className="text-black font-poppins text-md">
            <span className="font-bold">Note:- </span>
            <ul>
              <li className="ml-1 font-light">◼️ Leaving Quiz half-way can affect your accuracy on the leaderboard.</li>
              <li className="ml-1 font-light">◼️ Don't refresh the window while attempting the quiz.</li>
            </ul>
          </div>
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-4">
          <img
            src={quiz.image}
            alt={quiz.title}
            className="rounded-xl shadow-lg w-full object-cover max-h-96"
          />
        </div>
      </div>
    </div>
  );
}
