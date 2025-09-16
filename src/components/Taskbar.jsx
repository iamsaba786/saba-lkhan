import { useState, useEffect } from "react";
import { Globe, Folder, Compass } from "lucide-react";
import { Volume2, Battery, Wifi, Bluetooth, Bell } from "lucide-react";

export default function Taskbar({
  showStartMenu,
  setShowStartMenu,
  handleOpenApp,
  time,
  openQuickSettings,
  setOpenQuickSettings,
}) {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(100);
  const [battery, setBattery] = useState(87);
  const [notifications, setNotifications] = useState([
    "Update available",
    "New message",
    "Battery low",
  ]);

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-zinc-900/90 text-white flex items-center justify-between px-2 z-50 overflow-hidden">
      {/* Left: Start Button */}
      <div className="flex ml-7 items-center space-x-2">
        <button
          onClick={() => setShowStartMenu(!showStartMenu)}
          className="px-3 py-1 bg-zinc-800 backdrop-blur-xl hover:bg-zinc-700 rounded"
        >
          Start
        </button>
      </div>

      {/* Center: Apps */}
      <div className="flex space-x-6">
        <button
          onClick={() => handleOpenApp("explorer")}
          className="flex flex-col items-center p-2 rounded hover:bg-zinc-700 transition"
        >
          <img
            className="w-6 h-6"
            src="https://img.icons8.com/color/48/internet-explorer.png"
            alt=""
          />
          <span className="text-xs">Explorer</span>
        </button>

        <button
          onClick={() => handleOpenApp("browser")}
          className="flex flex-col items-center p-2 rounded hover:bg-zinc-700 transition"
        >
          <img
            className="w-6 h-6"
            src="https://img.icons8.com/doodle/48/internet--v1.png"
            alt=""
          />
          <span className="text-xs">Browser</span>
        </button>

        <button
          onClick={() => handleOpenApp("files")}
          className="flex flex-col items-center p-2 rounded hover:bg-zinc-700 transition"
        >
          <img
            className="w-6 h-6"
            src="https://img.icons8.com/color/48/opened-folder.png"
            alt=""
          />
          <span className="text-xs">Files</span>
        </button>
      </div>

      {/* Right: Quick Settings */}
      <div className="flex items-center space-x-3 relative">
        <button
          onClick={() => setOpenQuickSettings(!openQuickSettings)}
          className="flex items-center space-x-2 px-2 py-1 hover:bg-zinc-700 rounded"
        >
          <Volume2 className="w-5 h-5" />
          <Battery className="w-5 h-5" />
          <Wifi className="w-5 h-5" />
        </button>
        {/* Clock */}
        <span>{time.toLocaleTimeString()}</span>
        {/* Quick Settings Panel */}
        {openQuickSettings && (
          <div className="fixed right-2 bottom-12 w-72 bg-black border border-zinc-700 rounded-xl shadow-xl p-4 space-y-4">
            {/* Brightness */}
            <div className="flex items-center justify-between">
              <span>Brightness</span>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => {
                  setBrightness(e.target.value);
                  document.body.style.filter = `brightness(${e.target.value}%)`;
                }}
                className="w-32"
              />
            </div>

            {/* Volume */}
            <div className="flex items-center justify-between">
              <span>Volume</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-32"
              />
            </div>

            {/* Wi-Fi */}
            <div className="flex items-center justify-between">
              <span>Wi-Fi</span>
              <button className="px-2 py-1 bg-gray-600 rounded flex items-center space-x-2">
                <Wifi className="w-4 h-4" /> <span>Connected</span>
              </button>
            </div>

            {/* Bluetooth */}
            <div className="flex items-center justify-between">
              <span>Bluetooth</span>
              <button className="px-2 py-1 bg-gray-600 rounded flex items-center space-x-2">
                <Bluetooth className="w-4 h-4" /> <span>On</span>
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <button
                onClick={() => setNotifications([])}
                className="px-2 py-1 bg-gray-600 rounded flex items-center space-x-2"
              >
                <Bell className="w-4 h-4" /> <span>Clear All</span>
              </button>
            </div>

            {/* Battery */}
            <div className="flex items-center justify-between">
              <span>Battery</span>
              <span>{battery}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
