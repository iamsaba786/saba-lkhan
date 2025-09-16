import { useState, useEffect } from "react";

export default function Browser({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // 🔹 Minimize
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [theme, setTheme] = useState("dark");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // arrow key navigation

  const allSuggestions = {
    google: "https://www.google.com",
    sheryians: "https://www.sheryians.com",
    youtube: "https://www.youtube.com",
    facebook: "https://www.facebook.com",
    twitter: "https://www.twitter.com",
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com",
    github: "https://www.github.com",
    reddit: "https://www.reddit.com",
    amazon: "https://www.amazon.in",
    flipkart: "https://www.flipkart.com",
    spotify: "https://www.spotify.com",
    netflix: "https://www.netflix.com",
    wikipedia: "https://www.wikipedia.org",
    pinterest: "https://www.pinterest.com",
    gdrive: "https://drive.google.com",
    gmail: "https://mail.google.com",
    brave: "https://brave.com",
    awwwards: "https://www.awwwards.com",
    geeksforgeeks: "https://www.geeksforgeeks.org",
  };

  function normalizeURL(url) {
    return /^https?:\/\//i.test(url) ? url : "https://" + url;
  }

  // ---------- Keyboard listener ----------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setShowInput(false);
      }

      if (e.key === "Enter" && showInput) {
        e.preventDefault();

        if (activeIndex >= 0 && filteredSuggestions.length > 0) {
          setInputValue(filteredSuggestions[activeIndex]);
          setFilteredSuggestions([]);
          setActiveIndex(-1);
        } else if (inputValue.trim() !== "") {
          const command = inputValue.trim();
          const lowerCmd = command.toLowerCase();

          if (lowerCmd.startsWith("google ")) {
            const q = command.replace(/google\s+/i, "").trim();
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(q)}`,
              "_blank"
            );
          } else if (lowerCmd.startsWith("yt ")) {
            const q = command.replace(/yt\s+/i, "").trim();
            window.open(
              `https://www.youtube.com/results?search_query=${encodeURIComponent(
                q
              )}`,
              "_blank"
            );
          } else if (lowerCmd.startsWith("wiki ")) {
            const q = command.replace(/wiki\s+/i, "").trim();
            window.open(
              `https://en.wikipedia.org/wiki/${encodeURIComponent(q)}`,
              "_blank"
            );
          } else if (lowerCmd.startsWith("gh ")) {
            const q = command.replace(/gh\s+/i, "").trim();
            window.open(
              `https://github.com/search?q=${encodeURIComponent(q)}`,
              "_blank"
            );
          } else if (lowerCmd.startsWith("amz ")) {
            const q = command.replace(/amz\s+/i, "").trim();
            window.open(
              `https://www.amazon.in/s?k=${encodeURIComponent(q)}`,
              "_blank"
            );
          } else if (lowerCmd === "light") {
            setTheme("light");
          } else if (lowerCmd === "dark") {
            setTheme("dark");
          } else {
            const safeURL = normalizeURL(command);
            window.open(safeURL, "_blank");
          }

          setIsOpen(false);
          setInputValue("");
          setFilteredSuggestions([]);
        }
      }

      // Arrow key navigation
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
      }
      if (e.key === "ArrowUp") {
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showInput, inputValue, filteredSuggestions, activeIndex]);

  // ---------- Suggestion logic ----------
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredSuggestions([]);
      setActiveIndex(-1);
    } else {
      const matches = Object.keys(allSuggestions).filter((s) =>
        s.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setActiveIndex(-1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputValue.trim().toLowerCase();
    if (allSuggestions[query]) {
      window.open(allSuggestions[query], "_blank");
    } else {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank"
      );
    }
    setInputValue("");
    setFilteredSuggestions([]);
    setActiveIndex(-1);
  };

  const handleSuggestionClick = (s) => {
    setInputValue(s);
    setFilteredSuggestions([]);
    setActiveIndex(-1);

    if (allSuggestions[s.toLowerCase()]) {
      window.open(allSuggestions[s.toLowerCase()], "_blank");
    } else {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(s)}`,
        "_blank"
      );
    }
  };

  // ---------- Minimized Window Restore ----------
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-zinc-800 text-white rounded shadow"
      >
        🟢 Browser Restore
      </button>
    );
  }

  return (
    <div
      className={`${
        isMaximized
          ? "absolute top-16 left-44 w-[900px] h-[478px]"
          : "fixed top-0 left-0 right-0 bottom-12"
      } z-40 shadow-2xl rounded-xl border border-zinc-700 flex flex-col transition-all duration-300
      ${theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"}`}
    >
      {/* ---------- Header ---------- */}
      <div
        className={`p-2 font-semibold flex justify-between items-center
        ${
          theme === "dark"
            ? "bg-zinc-900 text-zinc-100"
            : "bg-gray-300 text-black"
        }`}
      >
        <span>Browser</span>
        <div className="flex gap-2">
          {/* Minimize */}
          <button
            onClick={() => setIsMinimized(true)}
            className={`text-md cursor-pointer px-3 rounded ${
              theme === "dark"
                ? "hover:bg-zinc-700"
                : "hover:bg-gray-400 text-black"
            }`}
          >
            ➖
          </button>

          {/* Maximize */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className={`text-md cursor-pointer px-3 rounded ${
              theme === "dark"
                ? "hover:bg-zinc-700"
                : "hover:bg-gray-400 text-black"
            }`}
          >
            {isMaximized ? "🗗" : "🗖"}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="text-sm text-red-600 cursor-pointer hover:text-red-800"
          >
            ❌
          </button>
        </div>
      </div>

      {/* ---------- Main Content ---------- */}
      <div
        className={`main flex-1 w-full relative overflow-hidden flex items-center justify-center
        ${
          theme === "dark" ? "bg-[#111] text-gray-400" : "bg-white text-black"
        }`}
      >
        {/* Overlay */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute inset-0 items-center justify-center pb-70 
          ${
            theme === "dark"
              ? "bg-[#1c1c1c] bg-opacity-95"
              : "bg-gray-200 bg-opacity-95"
          }`}
        >
          <div
            className={`palette w-[700px] border-2 rounded-4xl shadow-lg cursor-pointer flex flex-col
            ${
              theme === "dark"
                ? "bg-[#383838] text-white border-gray-500"
                : "bg-white text-black border-gray-400"
            }`}
            onClick={() => setShowInput(true)}
          >
            {showInput ? (
              <div className="relative w-full">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Type something..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full h-[40px] px-5 text-[16px] bg-transparent border-none outline-none"
                    autoFocus
                  />
                </form>

                {/* Suggestion box */}
                {filteredSuggestions.length > 0 && (
                  <ul className="absolute left-0 w-full bg-white text-black shadow-lg rounded-b-lg z-50">
                    {filteredSuggestions.map((s, i) => (
                      <li
                        key={i}
                        onClick={() => handleSuggestionClick(s)}
                        className={`px-4 py-2 cursor-pointer ${
                          i === activeIndex
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-500 hover:text-black hover:rounded-xl"
                        }`}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <span className="text-gray-400 p-2">Press here to type...</span>
            )}
          </div>
        </div>

        <div className="pb-70">
          Press <b>"ctrl" + "k"</b> to open Command palette.
        </div>
      </div>
    </div>
  );
}
