import { useState, useEffect } from "react";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import Browser from "./components/Browser";
import Explorer from "./components/Explorer";
import Files from "./components/Files";
import RecycleBin from "./components/RecycleBin";
import Taskbar from "./components/Taskbar";
import StartMenu from "./components/StartMenu";
import Audio from "./components/Audio";
import Settings from "./components/Settings";
import Photos from "./components/Photos";
import Calculator from "./components/Calculator";
import Notepad from "./components/Notepad";

const apps = [
  {
    name: "Explorer",
    icon: "https://img.icons8.com/color/48/internet-explorer.png",
    appId: "explorer",
  },
  {
    name: "Recycle Bin",
    icon: "https://img.icons8.com/color/48/recycle-bin.png",
    appId: "recyclebin",
  },
  {
    name: "File Explorer",
    icon: "https://img.icons8.com/color/48/opened-folder.png",
    appId: "files",
  },
  {
    name: "Browser",
    icon: "https://img.icons8.com/doodle/48/internet--v1.png",
    appId: "browser",
  },
  {
    name: "Audio",
    icon: "https://img.icons8.com/nolan/64/apple-music.png",
    appId: "audio",
  },
  {
    name: "Settings",
    icon: "https://img.icons8.com/3d-fluency/94/gear.png",
    appId: "settings",
  },
  {
    name: "Photos",
    icon: "https://img.icons8.com/plasticine/100/apple-photos.png",
    appId: "photos",
  },
  {
    name: "Calculator",
    icon: "https://img.icons8.com/3d-fluency/94/calculator-2.png",
    appId: "calculator",
  },
  {
    name: "Notepad",
    icon: "https://img.icons8.com/officel/80/making-notes.png",
    appId: "notepad",
  },
];

function App() {
  const [openQuickSettings, setOpenQuickSettings] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showWelcome, setShowWelcome] = useState(true);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [bgImage, setBgImage] = useState(1);
  const [openApps, setOpenApps] = useState([]);
  const [folders, setFolders] = useState([]);
  const [folderContextMenu, setFolderContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    folderId: null,
  });
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  // Time ke liye
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Welcome message ke liye
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000); // 2 seconds ke baad message gayab ho jayega

    return () => clearTimeout(timer);
  }, []);

  const changeBackground = () => {
    setBgImage((prev) => (prev % 4) + 1); // 1 → 2 → 3 → 4 → 1 ...
  };

  // App open karna
  const handleOpenApp = (appId) => {
    if (typeof appId === "object" || typeof appId === "number") {
      const folder = folders.find((f) => f.id === appId || f.id === appId.id);
      if (folder) {
        setOpenApps((prev) => [...prev, folder]);
        return;
      }
    }

    // Normal apps
    setOpenApps((prev) => [...prev, appId]);
    setOpenQuickSettings(false);
    setShowStartMenu(false);
  };

  // App close karna
  const handleCloseApp = (index) => {
    setOpenApps(openApps.filter((_, i) => i !== index));
  };

  // Refresh window
  const handlePowerAction = (action) => {
    if (action === "refresh") {
      window.location.reload();
    }
  };

  // New folder
  const handleNewFolder = () => {
    const newFolder = {
      id: Date.now(), // unique id
      name: `New Folder ${folders.length + 1}`,
      icon: "https://img.icons8.com/fluency/48/folder-invoices.png",
    };
    setFolders([...folders, newFolder]);
    setContextMenu({ ...contextMenu, visible: false });
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center font-sans relative overflow-hidden"
      style={{
        backgroundImage:
          bgImage === 1
            ? "url('https://i.pinimg.com/736x/de/57/5d/de575dc6806bda9296e7e4b2de643b5b.jpg')"
            : bgImage === 2
            ? "url('https://i.pinimg.com/736x/ad/fc/70/adfc70f15fa1bcb2647a40bb067b1668.jpg')"
            : bgImage === 3
            ? "url('https://i.pinimg.com/736x/db/86/3f/db863f56b9857e665c7c2e522ae4d543.jpg')"
            : "url('https://i.pinimg.com/1200x/3a/76/82/3a768288bcab029d5b81e2c8a6e3acd4.jpg')",
      }}
      onContextMenu={(e) => {
        e.preventDefault();

        // Agar click icon/folder ke upar hua to return (desktop menu na dikhao)
        if (e.target.closest(".desktop-icon")) return;

        // Nahi to desktop context menu dikhao
        setContextMenu({
          visible: true,
          x: e.clientX,
          y: e.clientY,
        });
      }}
      onClick={() => {
        setContextMenu({ ...contextMenu, visible: false });
        setFolderContextMenu({ ...folderContextMenu, visible: false });
      }}
    >
      {/* Welcome Message */}
      {showWelcome && (
        <div className="text-3xl absolute top-10 left-1/2 transform -translate-x-1/2 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-1000 opacity-90">
          👋 Heyy Welcome to Our OS UI !!
        </div>
      )}

      {/* Desktop Icons */}
      <div className="absolute left-4 top-4 grid grid-rows-5 grid-flow-col gap-10 p-4">
        {apps.map((app) => (
          <DesktopIcon
            key={app.name}
            name={app.name}
            icon={app.icon}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleOpenApp(app.appId);
            }}
          />
        ))}
        {folders.map((folder) => (
          <div
            key={folder.id}
            onContextMenu={(e) => {
              e.preventDefault();
              setFolderContextMenu({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                folderId: folder.id,
              });
            }}
          >
            <DesktopIcon
              name={folder.name}
              icon={folder.icon}
              onDoubleClick={() => handleOpenApp(folder.id)}
            />
          </div>
        ))}
        {folderContextMenu.visible && (
          <ul
            className="absolute bg-zinc-800 text-white text-sm rounded shadow-lg border border-zinc-700"
            style={{ top: folderContextMenu.y, left: folderContextMenu.x }}
          >
            <li
              onClick={() => {
                const newName = prompt("Enter new folder name:");
                if (newName) {
                  setFolders((prev) =>
                    prev.map((f) =>
                      f.id === folderContextMenu.folderId
                        ? { ...f, name: newName }
                        : f
                    )
                  );
                }
                setFolderContextMenu({ ...folderContextMenu, visible: false });
              }}
              className="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
            >
              ✏️ Rename
            </li>
            <li
              onClick={() => {
                setFolders((prev) =>
                  prev.filter((f) => f.id !== folderContextMenu.folderId)
                );
                setFolderContextMenu({ ...folderContextMenu, visible: false });
              }}
              className="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
            >
              🗑️ Delete
            </li>
          </ul>
        )}
      </div>

      {/* Open Windows */}
      <div className="grid grid-rows-5 grid-flow-col gap-4 w-full">
        {openApps.map((app, index) => (
          <Window
            key={index}
            title={
              typeof app === "string"
                ? app.charAt(0).toUpperCase() + app.slice(1)
                : app.name
            }
            onClose={() => handleCloseApp(index)}
          >
            {app === "explorer" && (
              <Explorer onClose={() => handleCloseApp(index)} />
            )}
            {app === "browser" && (
              <Browser onClose={() => handleCloseApp(index)} />
            )}
            {app === "files" && <Files onClose={() => handleCloseApp(index)} />}
            {app === "recyclebin" && (
              <RecycleBin onClose={() => handleCloseApp(index)} />
            )}
            {app === "audio" && <Audio onClose={() => handleCloseApp(index)} />}
            {app === "settings" && (
              <Settings onClose={() => handleCloseApp(index)} />
            )}
            {app === "photos" && (
              <Photos onClose={() => handleCloseApp(index)} />
            )}
            {app === "calculator" && (
              <Calculator onClose={() => handleCloseApp(index)} />
            )}
            {app === "notepad" && (
              <Notepad onClose={() => handleCloseApp(index)} />
            )}
          </Window>
        ))}
      </div>

      {/* Start Menu dikhana */}
      {showStartMenu && (
        <StartMenu
          handleOpenApp={(appId) => {
            handleOpenApp(appId);
            setShowStartMenu(false); // ✅ Auto close
          }}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        handleOpenApp={handleOpenApp}
        setShowStartMenu={setShowStartMenu}
        showStartMenu={showStartMenu}
        time={time}
        openQuickSettings={openQuickSettings}
        setOpenQuickSettings={setOpenQuickSettings}
      />
      {contextMenu.visible && (
        <ul
          className="absolute bg-zinc-800 text-white text-sm rounded shadow-lg border border-zinc-700"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            onClick={() => handlePowerAction("refresh")}
            className="block w-full text-left px-4 py-2 hover:bg-zinc-700"
          >
            🔄 refresh
          </button>
          <li
            onClick={handleNewFolder}
            className="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
          >
            📁 New Folder
          </li>
          <li
            onClick={() => {
              changeBackground();
              setContextMenu({ ...contextMenu, visible: false });
            }}
            className="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
          >
            🖼️ Change Background
          </li>
        </ul>
      )}
    </div>
  );
}

export default App;
