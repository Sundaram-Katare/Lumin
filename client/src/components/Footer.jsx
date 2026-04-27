import { FaPlay, FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2">

        {/* Logo + Socials */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">Lumin</h1>
          <div className="flex space-x-6 mb-4">
            <FaTwitter className="hover:text-blue-400 transition cursor-pointer" onClick={() => window.open("https://x.com/sundaramkatare", "_blank")} size={28} />
            <FaGithub className="hover:text-gray-400 transition cursor-pointer" onClick={() => window.open("https://github.com/Sundaram-Katare", "_blank")} size={28} />
            <FaLinkedin className="hover:text-blue-400 transition cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/sundaram-katare5/", "_blank")} size={28} />
            <FaInstagram className="hover:text-pink-400 transition cursor-pointer" onClick={() => window.open("https://x.com/sundaramkatare", "_blank")} size={28} />
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">Links</h2>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="hover:text-blue-200 cursor-pointer transition">About</li>
              <li className="hover:text-blue-200 cursor-pointer transition">Mission</li>
              <li className="hover:text-blue-200 cursor-pointer transition">Trivia</li>
              <li className="hover:text-blue-200 cursor-pointer transition">Docs</li>
              <li className="hover:text-blue-200 cursor-pointer transition" onClick={() => window.open("/faq", "_blank")}>FAQ</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">Resources</h2>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="hover:text-blue-200 cursor-pointer transition">Blog</li>
              <li className="hover:text-blue-200 cursor-pointer transition">Careers</li>
              <li className="hover:text-blue-200 cursor-pointer transition">Partners</li>
              <li className="hover:text-blue-200 cursor-pointer transition">Contact</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">Legal</h2>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="hover:text-blue-200 cursor-pointer transition">Privacy</li>
              <li className="hover:text-blue-200 cursor-pointer transition">Terms</li>
              <li className="hover:text-blue-200 cursor-pointer transition">Cookies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs sm:text-sm opacity-70">
        © 2025 Lumin. All rights reserved.
      </div>
    </footer>
  );
}
