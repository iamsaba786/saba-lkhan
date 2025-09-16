import { useState } from "react";

export default function Calculator({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // 🔹 Minimize
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  // Button click handle
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Clear all
  const handleClear = () => {
    setInput("");
    setResult("");
  };

  // Backspace
  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // Evaluate expression
  const handleEqual = () => {
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(input);
      setResult(evalResult);
    } catch {
      setResult("Error");
    }
  };

  // ---------- Minimized Window Restore Button ----------
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-zinc-800 text-white rounded shadow"
      >
        🟢 Calculator Restore
      </button>
    );
  }

  return (
    <div
      className={`${
        isMaximized
          ? "absolute top-16 left-45 w-[900px] h-[478px]"
          : "fixed top-0 left-0 right-0 bottom-12"
      } z-40 bg-zinc-100/95 text-white shadow-2xl border rounded-xl border-zinc-700 flex flex-col overflow-hidden transition-all duration-300`}
    >
      {/* Header / Titlebar */}
      <div className="text-zinc-100 bg-zinc-900/95 p-2 font-semibold flex justify-between items-center">
        <span>Calculator</span>
        <div className="flex gap-2">
          {/* Minimize */}
          <button
            onClick={() => setIsMinimized(true)}
            className="text-md cursor-pointer px-3 hover:bg-zinc-700 rounded"
          >
            ➖
          </button>

          {/* Maximize */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-md cursor-pointer px-3 hover:bg-zinc-700 rounded"
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

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] bg-gray-900 text-white p-4 rounded-2xl shadow-xl">
        {/* ---------- Display ---------- */}
        <div className="bg-black text-right text-2xl p-3 rounded mb-3 h-20 flex flex-col justify-center">
          <div className="text-white">{input || "0"}</div>
          <div className="text-white font-bold">{result}</div>
        </div>

        {/* ---------- Buttons ---------- */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={handleClear}
            className="hover:bg-red-500 hover:scale-105 transition duration-200 cursor-pointer bg-red-600 p-3 rounded-lg"
          >
            AC
          </button>
          <button
            onClick={handleBackspace}
            className="hover:bg-yellow-400 hover:scale-105 transition duration-200 cursor-pointer bg-yellow-500 p-3 rounded-lg"
          >
            ⌫
          </button>
          <button
            onClick={() => handleClick("%")}
            className="hover:bg-blue-400 hover:scale-105 transition duration-200 cursor-pointer bg-blue-500 p-3 rounded-lg"
          >
            %
          </button>
          <button
            onClick={() => handleClick("/")}
            className="hover:bg-blue-400 hover:scale-105 transition duration-200 cursor-pointer bg-blue-500 p-3 rounded-lg"
          >
            ÷
          </button>

          <button
            onClick={() => handleClick("7")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer bg-gray-700 p-3 rounded-lg"
          >
            7
          </button>
          <button
            onClick={() => handleClick("8")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer bg-gray-700 p-3 rounded-lg"
          >
            8
          </button>
          <button
            onClick={() => handleClick("9")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer bg-gray-700 p-3 rounded-lg"
          >
            9
          </button>
          <button
            onClick={() => handleClick("*")}
            className="hover:bg-blue-400 hover:scale-105 transition duration-200 cursor-pointer bg-blue-500 p-3 rounded-lg"
          >
            ×
          </button>

          <button
            onClick={() => handleClick("4")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer bg-gray-700 p-3 rounded-lg"
          >
            4
          </button>
          <button
            onClick={() => handleClick("5")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer bg-gray-700 p-3 rounded-lg"
          >
            5
          </button>
          <button
            onClick={() => handleClick("6")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer bg-gray-700 p-3 rounded-lg"
          >
            6
          </button>
          <button
            onClick={() => handleClick("-")}
            className="hover:bg-blue-400 hover:scale-105 transition duration-200 cursor-pointer bg-blue-500 p-3 rounded-lg"
          >
            −
          </button>

          <button
            onClick={() => handleClick("1")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer bg-gray-700 p-3 rounded-lg"
          >
            1
          </button>
          <button
            onClick={() => handleClick("2")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer bg-gray-700 p-3 rounded-lg"
          >
            2
          </button>
          <button
            onClick={() => handleClick("3")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer bg-gray-700 p-3 rounded-lg"
          >
            3
          </button>
          <button
            onClick={() => handleClick("+")}
            className="hover:bg-blue-400 hover:scale-105 transition duration-200 cursor-pointer bg-blue-500 p-3 rounded-lg"
          >
            +
          </button>

          <button
            onClick={() => handleClick("0")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer col-span-2 bg-gray-700 p-3 rounded-lg"
          >
            0
          </button>
          <button
            onClick={() => handleClick(".")}
            className="hover:bg-gray-600 hover:scale-105 transition duration-200 cursor-pointer bg-gray-700 p-3 rounded-lg"
          >
            .
          </button>
          <button
            onClick={handleEqual}
            className="hover:bg-green-400 hover:scale-105 transition duration-200 cursor-pointer bg-green-500 p-3 rounded-lg"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
