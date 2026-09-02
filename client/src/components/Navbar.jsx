import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../feature/auth/authSlice";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Moon, Sparkles, Sun } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <nav className="flex justify-between items-center p-4 sm:p-6 bg-transparent text-white font-poppins italic relative">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="text-4xl font-bold">Lumin</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 text-lg font-semibold">
        <h2
          className="cursor-pointer bg-purple-300/30 rounded-xl px-3 py-1"
          onClick={() => navigate("/trivia")}
        >
          Trivia
        </h2>
        <h2
          className="cursor-pointer bg-purple-300/30 rounded-xl px-3 py-1"
          onClick={() => navigate("/leaderboard")}
        >
          Leaderboard
        </h2>
        <h2
          className="cursor-pointer bg-purple-300/30 rounded-xl px-3 py-1"
          onClick={() => navigate("/addQuiz")}
        >
          Room
        </h2>
        <h2
          className="cursor-pointer bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl px-3 py-1 flex items-center gap-1.5"
          onClick={() => navigate("/generate")}
        >
          <Sparkles size={16} className="text-yellow-400" />
          Generate AI
        </h2>
      </div>

      {/* User Section */}
      <div className="hidden md:flex items-center gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle rounded-full p-2 transition"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {user ? (
          <>
            <motion.button
              className="bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-300 px-3 py-1 text-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              onClick={handleLogout}
            >
              Logout
            </motion.button>
            <img
              src="https://media.lordicon.com/upload/pages/2024_06/Opoe5dnNVY59jeVSWRZm1.svg"
              className="h-10 cursor-pointer hover:scale-110 transition duration-300"
              onClick={() => navigate("/profile")}
              alt="profile"
            />
          </>
        ) : (
          <button
            className="bg-gray-800 font-semibold rounded-2xl px-3 py-1 text-lg"
            onClick={() => navigate("/auth")}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle rounded-full p-2 transition"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-nav-menu absolute top-16 left-0 w-full bg-[#1a1032] text-white flex flex-col items-center gap-4 py-6 shadow-lg rounded-b-2xl md:hidden z-50">
          <h2
            className="cursor-pointer bg-purple-300/30 rounded-xl px-4 py-2 w-11/12 text-center"
            onClick={() => { navigate("/trivia"); setMenuOpen(false); }}
          >
            Trivia
          </h2>
          <h2
            className="cursor-pointer bg-purple-300/30 rounded-xl px-4 py-2 w-11/12 text-center"
            onClick={() => { navigate("/leaderboard"); setMenuOpen(false); }}
          >
            Leaderboard
          </h2>
          <h2
            className="cursor-pointer bg-purple-300/30 rounded-xl px-4 py-2 w-11/12 text-center"
            onClick={() => { navigate("/addQuiz"); setMenuOpen(false); }}
          >
            Room
          </h2>
          <h2
            className="cursor-pointer bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl px-4 py-2 w-11/12 text-center flex items-center justify-center gap-1.5"
            onClick={() => { navigate("/generate"); setMenuOpen(false); }}
          >
            <Sparkles size={16} className="text-yellow-400" />
            Generate AI
          </h2>

          {user ? (
            <>
              <motion.button
                className="bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-300 px-6 py-2 text-lg"
                whileHover={{ scale: 1.05 }}
                onClick={() => { handleLogout(); setMenuOpen(false); }}
              >
                Logout
              </motion.button>
              <img
                src="https://cdn-icons-png.flaticon.com/512/9815/9815472.png"
                className="h-12 cursor-pointer hover:scale-105 transition duration-300"
                onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                alt="profile"
              />
            </>
          ) : (
            <button
              className="bg-gray-800 font-semibold rounded-2xl px-6 py-2 text-lg"
              onClick={() => { navigate("/auth"); setMenuOpen(false); }}
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
