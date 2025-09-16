import { useState } from "react";
import {
  Settings as SettingsIcon,
  Monitor,
  Brush,
  Info,
  Wifi,
  Shield,
  RefreshCcw,
} from "lucide-react";

export default function Settings({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { key: "general", label: "General", icon: SettingsIcon },
    { key: "system", label: "System", icon: Monitor },
    { key: "appearance", label: "Appearance", icon: Brush },
    { key: "network", label: "Network & Internet", icon: Wifi },
    { key: "privacy", label: "Privacy & Security", icon: Shield },
    { key: "updates", label: "Updates", icon: RefreshCcw },
    { key: "about", label: "About", icon: Info },
  ];

  const filteredTabs = tabs.filter((tab) =>
    tab.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ---------- If Minimized, show restore button ----------
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-zinc-800 text-white rounded shadow"
      >
        ⚙️ Settings
      </button>
    );
  }

  return (
    <div
      className={`${
        isMaximized
          ? "absolute top-16 left-44 w-[900px] h-[478px]"
          : "fixed top-0 left-0 right-0 bottom-0"
      } z-40 bg-white text-black shadow-2xl border border-gray-700 flex flex-col transition-all duration-300`}
    >
      {/* ---------- Header ---------- */}
      <div className="bg-gray-200 p-2 font-semibold flex justify-between items-center border-b">
        <span>⚙️ Settings</span>
        <div className="flex gap-2">
          {/* Minimize */}
          <button
            onClick={() => setIsMinimized(true)}
            className="text-md cursor-pointer px-3 hover:bg-zinc-600 rounded"
            title="Minimize"
          >
            ➖
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-md px-3 hover:bg-zinc-600 rounded"
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

      {/* ---------- Body (Sidebar + Content) ---------- */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/3 bg-gray-100 border-r p-3 flex flex-col">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Find a setting..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Sidebar Buttons */}
          <div className="space-y-1 overflow-y-auto">
            {filteredTabs.length > 0 ? (
              filteredTabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition ${
                    activeTab === key
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-300 hover:text-black"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500 px-2">No results found</p>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "general" && (
            <div>
              <h2 className="text-2xl font-bold mb-2">General</h2>
              <p className="text-gray-600">Manage basic app preferences.</p>
            </div>
          )}
          {activeTab === "system" && (
            <div>
              <h2 className="text-2xl font-bold mb-2">System</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Storage usage</li>
                <li>Performance settings</li>
                <li>Notifications</li>
              </ul>
            </div>
          )}
          {activeTab === "appearance" && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Appearance</h2>
              <p className="text-gray-600">
                Change themes, wallpapers, and display preferences.
              </p>
            </div>
          )}
          {activeTab === "network" && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Network & Internet</h2>
              <p className="text-gray-600">
                Wi-Fi, Ethernet, and proxy settings.
              </p>
            </div>
          )}
          {activeTab === "privacy" && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Privacy & Security</h2>
              <p className="text-gray-600">
                Control permissions and security options.
              </p>
            </div>
          )}
          {activeTab === "updates" && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Updates</h2>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Check for Updates
              </button>
            </div>
          )}
          {activeTab === "about" && (
            <div>
              <h2 className="text-2xl font-bold mb-2">About</h2>
              <p className="text-gray-600">Version: 1.0.0</p>
              <p className="text-gray-600">Developer: You 😊</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
