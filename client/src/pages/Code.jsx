import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiCheck } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function Code({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to the clipboard!") ;
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
      toast.error("failed to copy code") ;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 font-poppins p-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 110, damping: 12 }}
        className="bg-white/10 shadow-xl border-4 border-yellow-400 rounded-2xl flex flex-col items-center px-8 py-10 max-w-xs md:max-w-lg w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-lg tracking-wider mb-8 text-center"
        >
          {code}
        </motion.h1>
        <button
          onClick={handleCopy}
          className="relative flex gap-2 items-center bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 hover:from-yellow-600 hover:to-yellow-400 text-black font-semibold px-5 py-2 rounded-lg transition-colors mb-6 shadow-md"
        >
          {copied ? (
            <>
              <FiCheck className="text-xl" /> Copied!
            </>
          ) : (
            <>
              <FiCopy className="text-xl" /> Copy Code
            </>
          )}
        </button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-gray-200 text-base text-center max-w-md"
        >
          Share this code with peers to join the quiz instantly.
          <br />
          <hr />
          <span className="font-bold mr-1 mt-2">Note:- </span>Refreshing or changing the page might lead to the lost of the code, so please copy it
        </motion.p>
      </motion.div>
    </div>
  );
}
