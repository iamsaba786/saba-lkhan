import { useState, useEffect } from "react";

export default function Explorer({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentURL, setCurrentURL] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  // 🔹 History
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Normalize URL
  function normalizeURL(url) {
    return /^https?:\/\//i.test(url) ? url : "https://" + url;
  }

  // Ctrl+K overlay toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setShowInput(false);
      }

      if (e.key === "Enter" && showInput && inputValue.trim() !== "") {
        const safeURL = normalizeURL(inputValue);
        loadURL(safeURL);
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showInput, inputValue]);

  // Load URL + Update History
  const loadURL = (url) => {
    const safeURL = normalizeURL(url);
    setCurrentURL(safeURL);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), safeURL]);
    setHistoryIndex((prev) => prev + 1);
    setInputValue(url);
  };

  const handleAddressBarSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      loadURL(inputValue);
    }
  };

  // Back / Forward / Home
  const handleBack = () => {
    if (historyIndex > 0) {
      const prevURL = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentURL(prevURL);
      setInputValue(prevURL);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextURL = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentURL(nextURL);
      setInputValue(nextURL);
    }
  };

  const handleHome = () => {
    setCurrentURL("");
    setInputValue("");
    setHistory([]);
    setHistoryIndex(-1);
  };

  // ---------- Minimized Window Restore Button ----------
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-zinc-800 text-white rounded shadow"
      >
        🔵 Explorer (Restore)
      </button>
    );
  }

  return (
    <div
      className={`${
        isMaximized
          ? "absolute top-16 left-44 w-[900px] h-[478px]"
          : "fixed top-0 left-0 right-0 bottom-12"
      } z-40 flex flex-col border border-zinc-700 transition-all duration-300
      ${darkMode ? "bg-zinc-100/95 text-white" : "bg-white text-black"}`}
    >
      {/* ---------- Header ---------- */}
      <div
        className={`p-2 font-semibold flex justify-between items-center 
        ${
          darkMode ? "bg-zinc-900/95 text-zinc-100" : "bg-zinc-200 text-black"
        }`}
      >
        <span>Explorer</span>
        <div className="flex gap-2 items-center">
          {/* 🌙/🌞 Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded hover:opacity-80"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {/* Minimize */}
          <button
            onClick={() => setIsMinimized(true)}
            className="text-md px-3 hover:bg-zinc-700 rounded"
          >
            ➖
          </button>

          {/* Maximize */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-md px-3 hover:bg-zinc-700 rounded"
          >
            {isMaximized ? "🗗" : "🗖"}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="text-sm cursor-pointer text-red-600 hover:text-red-800"
          >
            ❌
          </button>
        </div>
      </div>

      {/* ---------- Address Bar ---------- */}
      <form
        onSubmit={handleAddressBarSubmit}
        className={`p-2 flex items-center gap-2 
        ${darkMode ? "bg-zinc-900" : "bg-zinc-100"}`}
      >
        <button
          type="button"
          onClick={handleBack}
          disabled={historyIndex <= 0}
          className={`px-3 py-1 rounded hover:bg-zinc-400  disabled:opacity-40 
          ${darkMode ? "bg-zinc-900" : "bg-zinc-100"}`}
        >
          ⬅️
        </button>
        <button
          type="button"
          onClick={handleForward}
          disabled={historyIndex >= history.length - 1}
          className={`px-3 py-1 rounded hover:bg-zinc-400 disabled:opacity-40 
          ${darkMode ? "bg-zinc-900" : "bg-zinc-100"}`}
        >
          ➡️
        </button>
        <button
          type="button"
          onClick={handleHome}
          className={`px-3 py-1 rounded hover:bg-zinc-600 
          ${darkMode ? "bg-zinc-900" : "bg-zinc-100"}`}
        >
          🏠
        </button>
        <input
          type="text"
          placeholder="Enter URL..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`flex-1 p-2 rounded outline-none
          ${
            darkMode
              ? "bg-zinc-700 text-white"
              : "bg-white text-black border border-gray-400"
          }`}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded 
          ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-blue-600 hover:bg-blue-600 text-white"
          }`}
        >
          Go
        </button>
      </form>

      {/* ---------- Main Content ---------- */}
      <div
        className={`main flex-1 w-full relative overflow-hidden 
        ${darkMode ? "bg-[#111]" : "bg-zinc-100"}`}
      >
        {/* Overlay (Ctrl+K) */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute inset-0 items-center justify-center pb-70 bg-[#1c1c1c] bg-opacity-95`}
        >
          <div
            className="palette w-[700px] h-[50px] bg-[#383838] border-2 rounded-[50px] border-[rgb(108,108,108)] text-white shadow-[0px_10px_20px_rgba(0,0,0,0.4)] flex items-center px-4"
            onClick={() => setShowInput(true)}
          >
            {showInput ? (
              <input
                type="text"
                placeholder="Type URL..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-full p-2 text-[18px] bg-transparent border-none outline-none"
                autoFocus
              />
            ) : (
              <span className="text-gray-400">Press here to type...</span>
            )}
          </div>
        </div>

        {/* ---------- Iframe ---------- */}
        {currentURL ? (
          <iframe
            src={currentURL}
            title="Explorer Browser"
            className="w-full h-full border-none"
          />
        ) : (
          <div className="flex items-center justify-center pb-20 h-full text-gray-400">
            Press "ctrl" + "k" to open Command palette.
          </div>
        )}
      </div>
    </div>
  );
}
