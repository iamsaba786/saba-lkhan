import React, { useState, useEffect } from "react";

export default function StartMenu({ handleOpenApp }) {
  const [showPowerOptions, setShowPowerOptions] = useState(false);
  const [mode, setMode] = useState(null); // null | shutdown | shutdown-hold | sleep
  const [isLock, setIsLock] = useState(false);
  const [pin, setPin] = useState("");
  const [showLogin, setShowLogin] = useState(false); // Add for old style login
  const [error, setError] = useState(""); // Wrong PIN error
  const [time, setTime] = useState(new Date()); // For clock update

  // Time update every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Unlock handler
  const handleUnlock = () => {
    if (pin === "saba") {
      setIsLock(false);
      setShowLogin(false);
      setError("");
    } else {
      setError("Wrong PIN!");
    }
    setPin("");
  };

  // Power actions
  const handlePowerAction = (action) => {
    setShowPowerOptions(false);

    if (action === "restart") {
      window.location.reload();
    }

    if (action === "shutdown") {
      setMode("shutdown");
      setTimeout(() => {
        setMode("shutdown-hold"); // text gayab, black screen rahe
      }, 2000);
    }

    if (action === "sleep") {
      if (window.confirm("Go to sleep?")) {
        setMode("sleep");
      }
    }

    if (action === "lock") {
      if (window.confirm("Lock the screen?")) {
        setIsLock(true);
      }
    }
  };

  return (
    <>
      {/* Start Menu */}
      <div className="absolute bottom-12 left-2 w-80 bg-black backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-2xl p-4 z-50">
        {/* Header */}
        <h2 className="text-white text-lg font-semibold mb-3">Start Menu</h2>

        {/* Grid Apps */}
        <div className="grid grid-cols-3 gap-3">
          {/* Explorer */}
          <button
            onClick={() => handleOpenApp("explorer")}
            className="flex flex-col items-center justify-center bg-zinc-800 rounded-xl p-4 hover:scale-105 duration-200 hover:bg-zinc-700 transition"
          >
            <span className="text-2xl">📂</span>
            <span className="text-white text-sm mt-1">Explorer</span>
          </button>

          {/* Browser */}
          <button
            onClick={() => handleOpenApp("browser")}
            className="flex flex-col items-center justify-center bg-zinc-800 rounded-xl p-4 hover:scale-105 duration-200 hover:bg-zinc-700 transition"
          >
            <span className="text-2xl">🌐</span>
            <span className="text-white text-sm mt-1">Browser</span>
          </button>

          {/* File */}
          <button
            onClick={() => handleOpenApp("files")}
            className="flex flex-col items-center justify-center bg-zinc-800 rounded-xl p-4 hover:scale-105 duration-200 hover:bg-zinc-700 transition"
          >
            <span className="text-2xl">📄</span>
            <span className="text-white text-sm mt-1">File</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => handleOpenApp("settings")}
            className="flex flex-col items-center justify-center bg-zinc-800 rounded-xl p-4 hover:scale-105 duration-200 hover:bg-zinc-700 transition"
          >
            <span className="text-2xl">⚙️</span>
            <span className="text-white text-sm mt-1">Settings</span>
          </button>

          {/* Music */}
          <button
            onClick={() => handleOpenApp("audio")}
            className="flex flex-col items-center justify-center bg-zinc-800 rounded-xl p-4 hover:scale-105 duration-200 hover:bg-zinc-700 transition"
          >
            <span className="text-2xl">🎵</span>
            <span className="text-white text-sm mt-1">Music</span>
          </button>

          {/* Photos */}
          <button
            onClick={() => handleOpenApp("photos")}
            className="flex flex-col items-center justify-center bg-zinc-800 rounded-xl p-4 hover:scale-105 duration-200 hover:bg-zinc-700 transition"
          >
            <span className="text-2xl">🖼️</span>
            <span className="text-white text-sm mt-1">Photos</span>
          </button>
        </div>

        {/* Bottom user area */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-700 pt-3 relative">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-zinc-600 rounded-full"></div>
            <span className="text-white px-3 py-1 hover:rounded-xl hover:bg-gray-200 hover:text-black text-sm">
              User
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowPowerOptions(!showPowerOptions)}
              className="text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              ⏻ Power
            </button>

            {/* Power Options DropUP */}
            {showPowerOptions && (
              <div className="absolute right-0 bottom-full mb-2 w-40 bg-zinc-800 text-white rounded-lg shadow-lg border border-zinc-600 z-[9999]">
                <button
                  onClick={() => handlePowerAction("restart")}
                  className="block w-full text-left px-4 py-2 hover:bg-zinc-700"
                >
                  🔄 Restart
                </button>
                <button
                  onClick={() => handlePowerAction("shutdown")}
                  className="block w-full text-left px-4 py-2 hover:bg-zinc-700"
                >
                  ⏻ Shut down
                </button>
                <button
                  onClick={() => handlePowerAction("sleep")}
                  className="block w-full text-left px-4 py-2 hover:bg-zinc-700"
                >
                  😴 Sleep
                </button>
                <button
                  onClick={() => handlePowerAction("lock")}
                  className="block w-full text-left px-4 py-2 hover:bg-zinc-700"
                >
                  🔒 Lock
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Black Screen (Shutdown / Sleep) */}
      {mode && (
        <div
          className="fixed inset-0 bg-black flex items-center justify-center text-white text-3xl font-bold z-[99999]"
          onClick={() => setMode(null)}
        >
          {mode === "shutdown" && "Shutting down..."}
        </div>
      )}

      {/* Lock Screen (old style with Click to Unlock + PIN) */}
      {isLock && (
        <div
          className="fixed inset-0 bg-cover bg-center z-[99999] flex flex-col items-center justify-center text-white"
          style={{
            backgroundImage:
              "url('https://wallpapercave.com/wp/wp5128415.jpg')",
          }}
        >
          {!showLogin ? (
            <>
              <h1 className="text-6xl font-bold">
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h1>
              <p className="text-xl mt-2">
                {time.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <button
                onClick={() => setShowLogin(true)}
                className="mt-8 px-6 py-2 bg-black/60 rounded-lg hover:bg-black/80 transition"
              >
                Click to unlock
              </button>
            </>
          ) : (
            <div className="bg-black/70 p-6 rounded-xl">
              <h2 className="text-2xl mb-4">🔒 Enter PIN</h2>
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                className="px-4 py-2 text-black rounded mb-2"
              />
              <button
                onClick={handleUnlock}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                Unlock
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          )}
        </div>
      )}
    </>
  );
}
