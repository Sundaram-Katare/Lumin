import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementPoints } from "../feature/auth/authSlice.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Navbar from "../components/Navbar";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

export default function QuizStart() {
  const location = useLocation();
  const { _id, from } = location.state || {};

  const quizzes = useSelector((state) => state.quiz.quizzes);
  const quiz = quizzes.find((q) => q._id === _id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setAnswers(Array(quiz?.questions.length).fill(null));
  }, [quiz]);

  if (!quiz) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <h1 className="text-xl font-semibold text-red-600">Quiz not found.</h1>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];

  async function submitAnswer(selectedIndex, question) {
    const isCorrect = question && question.correctAnswerIndex === selectedIndex;

    if (isCorrect && quiz.live === "No") {
      try {
        await dispatch(incrementPoints()).unwrap();
      } catch (err) {
        // Handled silently
      }
    }
  }

  function handleOptionClick(optionIndex) {
    setSelectedOption(optionIndex);
  }

  async function handleNext() {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedOption;
    setAnswers(newAnswers);

    await submitAnswer(selectedOption, currentQuestion);

    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }

    setSelectedOption(null);
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
    setAnswers(Array(quiz.questions.length).fill(null));
  }

  const chartData = quiz.questions.map((q, idx) => ({
    name: `Q${idx + 1}`,
    Correct: answers[idx] === q.correctAnswerIndex ? 1 : 0,
    Incorrect: answers[idx] !== null && answers[idx] !== q.correctAnswerIndex ? 1 : 0,
    Unanswered: answers[idx] === null ? 1 : 0,
  }));

  // Pie chart data
  const totalQuestions = quiz.questions.length;
  const correctCount = answers.filter((ans, idx) => ans === quiz.questions[idx].correctAnswerIndex).length;
  const incorrectCount = answers.filter((ans, idx) => ans !== null && ans !== quiz.questions[idx].correctAnswerIndex).length;
  const unansweredCount = totalQuestions - correctCount - incorrectCount;
  const accuracy = totalQuestions > 0 ? ((correctCount / totalQuestions) * 100).toFixed(1) : "0.0";

  const resultPieData = [
    { name: "Correct", value: correctCount, color: "#f8d215ff" },
    { name: "Incorrect", value: incorrectCount, color: "#ff0c0cff" },
    { name: "Unanswered", value: unansweredCount, color: "#94a3b8" }
  ];

  const exportResultPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Background header band
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 35, "F");

    // Title & App Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("Lumin Quiz Result", 14, 18);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(203, 213, 225);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 26);

    // Quiz Information Card
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(`Quiz: ${quiz.title}`, 14, 46);

    if (user?.name || user?.username) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(`Candidate: ${user.name || user.username}`, 14, 52);
    }

    // Summary Score Badges
    const startY = user?.name || user?.username ? 58 : 52;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, startY, 182, 22, 3, 3, "F");

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(51, 65, 85);
    doc.text(`Total Questions: ${totalQuestions}`, 20, startY + 9);
    doc.text(`Score: ${correctCount}/${totalQuestions}`, 75, startY + 9);
    doc.text(`Accuracy: ${accuracy}%`, 130, startY + 9);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(22, 101, 52); // green
    doc.text(`Correct: ${correctCount}`, 20, startY + 16);
    doc.setTextColor(153, 27, 27); // red
    doc.text(`Incorrect: ${incorrectCount}`, 75, startY + 16);
    doc.setTextColor(71, 85, 105); // slate
    doc.text(`Unanswered: ${unansweredCount}`, 130, startY + 16);

    // Question-by-question breakdown table
    const tableRows = quiz.questions.map((q, idx) => {
      const selected = answers[idx];
      const selectedText = selected !== null && selected !== undefined ? q.options[selected] || `Option ${selected + 1}` : "Not Answered";
      const correctText = q.options[q.correctAnswerIndex] || `Option ${q.correctAnswerIndex + 1}`;
      const status = selected === q.correctAnswerIndex ? "CORRECT" : selected === null ? "UNANSWERED" : "INCORRECT";

      return [
        `Q${idx + 1}`,
        q.questionText,
        selectedText,
        correctText,
        status,
      ];
    });

    autoTable(doc, {
      startY: startY + 28,
      head: [["#", "Question", "Your Answer", "Correct Answer", "Status"]],
      body: tableRows,
      theme: "striped",
      headStyles: {
        fillColor: [79, 70, 229], // Indigo 600
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 3,
        textColor: [30, 41, 59],
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 70 },
        2: { cellWidth: 42 },
        3: { cellWidth: 42 },
        4: { cellWidth: 18, halign: "center" },
      },
      didParseCell: function (data) {
        if (data.section === "body" && data.column.index === 4) {
          if (data.cell.raw === "CORRECT") {
            data.cell.styles.textColor = [22, 163, 74];
            data.cell.styles.fontStyle = "bold";
          } else if (data.cell.raw === "INCORRECT") {
            data.cell.styles.textColor = [220, 38, 38];
            data.cell.styles.fontStyle = "bold";
          } else {
            data.cell.styles.textColor = [100, 116, 139];
          }
        }
      },
      margin: { left: 14, right: 14 },
    });

    const safeTitle = quiz.title.replace(/[^a-zA-Z0-9_-]/g, "_");
    doc.save(`${safeTitle}_Results.pdf`);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-[#392a5c] to-[#030008]">
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Quiz Questions */}
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">{quiz.title}</h1>

          {!isFinished ? (
            <>
              <div className="mb-6">
                <p className="text-lg font-semibold">
                  Question {currentIndex + 1} of {quiz.questions.length}
                </p>
                <h2 className="text-xl mt-2 font-medium">{currentQuestion.questionText}</h2>
              </div>
              <div className="flex flex-col space-y-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className={`px-4 py-3 rounded-lg border text-left text-gray-700 hover:bg-indigo-500 hover:text-white transition ${selectedOption === idx
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-gray-300"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className={`mt-8 w-full py-3 rounded-lg text-white font-semibold ${selectedOption === null
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-700 hover:bg-indigo-800 transition"
                  }`}
              >
                {currentIndex + 1 === quiz.questions.length ? "Finish Quiz" : "Next Question"}
              </button>
            </>
          ) : (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold">Quiz Completed!</h2>
              <p className="text-lg">
                You scored <span className="font-bold text-indigo-600">{correctCount}</span> out of{" "}
                <span className="font-bold">{quiz.questions.length}</span> ({accuracy}%)
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={exportResultPDF}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition shadow-md"
                >
                  <FaFilePdf size={18} />
                  Export Results as PDF
                </button>
                <button
                  onClick={handleRestart}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition shadow-md"
                >
                  Restart Quiz
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Points & Stats */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-6">Live Quiz Stats</h2>
          <p className="mb-3 text-lg">Current Score: {isFinished ? correctCount : score}</p>
          <ResponsiveContainer width="100%" height={250}>
            {isFinished ? (
              <PieChart>
                <Pie
                  data={resultPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {resultPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="Correct" stackId="a" fill="#22c55e" />
                <Bar dataKey="Incorrect" stackId="a" fill="#ef4444" />
                <Bar dataKey="Unanswered" stackId="a" fill="#94a3b8" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
