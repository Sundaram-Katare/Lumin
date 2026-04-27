import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const qa = [
  {
    question: "How do I create a quiz?",
    answer: "From the bar at the top of the page, click on 'Room'. Type in your quiz's details, and create!",
  },
  {
    question: "How do I join an open quiz room?",
    answer: "On the homepage, look for the 'join with code' button. From the join quiz page, type in the quiz code, and join!",
  },
  {
    question: "How is the leaderboard ranked?",
    answer: "The leaderboard is ranked based on accuracy percentage, not points. Keep practicing to keep it high!",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-poppins">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        {/* Title */}
        <motion.h1
          className="font-bold text-4xl mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          ❓ Frequently Asked Questions
        </motion.h1>

        {/* Q&A */}


        <motion.div
          className="p-4 rounded-xl bg-gray-950 bg-opacity-80 shadow-lg border border-gray-800"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
        <div className="space-y-6">
         {qa.map((block, index) => (
            <div key={index}>
            <h2 className="text-xl font-semibold mb-2 text-purple-400">
                    {block.question}
            </h2>
            <p className="text-gray-300">{block.answer}</p>
          </div>
          ))}
        </div>
        </motion.div>
      </div>
    <Footer />
    </div>
  );
}
