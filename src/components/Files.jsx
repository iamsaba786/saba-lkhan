import { useState } from "react";
import { Rnd } from "react-rnd";
import {
  Folder,
  File,
  HardDrive,
  Search,
  List,
  Grid,
  Minus,
} from "lucide-react";

export default function Files({ folder, onClose }) {
  const [files, setFiles] = useState([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [path, setPath] = useState(["This PC", "Documents"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [contextMenu, setContextMenu] = useState(null);
  const [items, setItems] = useState([
    { type: "folder", name: "Projects" },
    { type: "folder", name: "Assignments" },
    { type: "file", name: "Notes.txt" },
    { type: "file", name: "Resume.pdf" },
    { type: "file", name: "Photo.png" },
  ]);

  // for renaming support
  const [editingItem, setEditingItem] = useState(null);

  const filteredItems = items.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item,
    });
  };

  // 🆕 handle right-click on empty background
  const handleBackgroundContext = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item: null, // empty area
    });
  };

  const handleRename = (item) => {
    const newName = prompt("Enter new name:", item.name);
    if (newName) {
      setItems(
        items.map((i) => (i.name === item.name ? { ...i, name: newName } : i))
      );
    }
    setContextMenu(null);
  };

  const handleDelete = (item) => {
    setItems(items.filter((i) => i.name !== item.name));
    setContextMenu(null);
  };

  // 🆕 create new folder
  const handleNewFolder = () => {
    const newFolder = { type: "folder", name: "New Folder" };
    setItems([...items, newFolder]);
    setEditingItem(newFolder.name); // immediately edit
    setContextMenu(null);
  };

  // Center Position for non-maximized state
  const centerX = window.innerWidth / 2 - 400; // 800/2
  const centerY = window.innerHeight / 2 - 250; // 500/2
  const [windowPos, setWindowPos] = useState({ x: centerX, y: centerY });

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-zinc-800 text-white rounded shadow"
      >
        📂 Restore Files
      </button>
    );
  }

  return (
    !isMinimized && (
      <Rnd
        size={isMaximized ? { width: "100%", height: "100%" } : undefined}
        position={isMaximized ? { x: 0, y: 0 } : windowPos}
        onDragStop={(e, d) => setWindowPos({ x: d.x, y: d.y })}
        onResizeStop={(e, direction, ref, delta, position) =>
          setWindowPos(position)
        }
        enableResizing={!isMaximized}
        disableDragging={isMaximized}
        minWidth={900}
        minHeight={497}
        bounds="window"
        dragHandleClassName="title-bar"
        className="z-40 shadow-2xl border border-zinc-700 rounded bg-white flex flex-col overflow-hidden"
      >
        {/* ---------- Header / Titlebar ---------- */}
        <div>
          <div className="title-bar text-zinc-100 bg-zinc-900/95 p-2 font-semibold flex justify-between items-center">
            <span>File Explorer</span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-md px-3 hover:bg-zinc-700 rounded"
              >
                <Minus size={16} />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-md px-3 hover:bg-zinc-700 rounded"
              >
                {isMaximized ? "🗗" : "🗖"}
              </button>
              <button
                onClick={onClose}
                className="text-sm cursor-pointer text-red-600"
              >
                ❌
              </button>
            </div>
          </div>

          {/* ---------- Breadcrumb + Search + View Toggle ---------- */}
          <div className="flex items-center bg-zinc-200 p-2 space-x-2">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-1 flex-1">
              {path.map((p, i) => (
                <span
                  key={i}
                  className="cursor-pointer hover:underline"
                  onClick={() => setPath(path.slice(0, i + 1))}
                >
                  {p} {i < path.length - 1 && "›"}
                </span>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center px-2 py-1 border rounded bg-white">
              <Search size={16} className="text-zinc-600 mr-1" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-sm outline-none"
              />
            </div>

            {/* View Toggle */}
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="ml-2 p-1 border rounded bg-white"
            >
              {viewMode === "grid" ? <List size={16} /> : <Grid size={16} />}
            </button>
          </div>

          {/* ---------- Main Layout ---------- */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 bg-zinc-300 border-r p-2 text-sm space-y-2">
              <div className="font-semibold">Quick Access</div>
              <ul className="space-y-1">
                <li
                  className="flex items-center gap-2 hover:bg-zinc-300 hover:text-black p-1 rounded cursor-pointer"
                  onDoubleClick={() => setPath(["This PC", "Documents"])}
                >
                  <Folder size={16} /> Documents
                </li>
                <li
                  className="flex items-center gap-2 hover:bg-zinc-300 hover:text-black p-1 rounded cursor-pointer"
                  onDoubleClick={() => setPath(["This PC", "Downloads"])}
                >
                  <Folder size={16} /> Downloads
                </li>
                <li
                  className="flex items-center gap-2 hover:bg-zinc-300 hover:text-black p-1 rounded cursor-pointer"
                  onDoubleClick={() => setPath(["This PC", "Pictures"])}
                >
                  <Folder size={16} /> Pictures
                </li>
                <li
                  className="flex items-center gap-2 hover:bg-zinc-300 hover:text-black p-1 rounded cursor-pointer"
                  onDoubleClick={() => setPath(["This PC", "Music"])}
                >
                  <Folder size={16} /> Music
                </li>
              </ul>

              <div className="font-semibold mt-4">This PC</div>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 hover:bg-zinc-300 hover:text-black p-1 rounded cursor-pointer">
                  <HardDrive size={16} /> Local Disk (C:)
                </li>
                <li className="flex items-center gap-2 hover:bg-zinc-300 hover:text-black p-1 rounded cursor-pointer">
                  <HardDrive size={16} /> Local Disk (D:)
                </li>
              </ul>
            </div>

            {/* File Area */}
            <div
              onContextMenu={handleBackgroundContext} // 🆕 background right click
              className={`flex-1 p-4 ${
                viewMode === "grid"
                  ? "grid grid-cols-4 gap-4"
                  : "flex flex-col space-y-2"
              } text-sm overflow-auto`}
            >
              {filteredItems.map((item, i) => (
                <div
                  key={i}
                  onDoubleClick={() =>
                    item.type === "folder" && setPath([...path, item.name])
                  }
                  onContextMenu={(e) => handleContextMenu(e, item)}
                  className={`${
                    viewMode === "grid"
                      ? "flex flex-col items-center p-2"
                      : "flex items-center gap-2 p-2"
                  } hover:bg-zinc-400 hover:text-black rounded cursor-pointer`}
                >
                  {item.type === "folder" ? (
                    <Folder
                      size={viewMode === "grid" ? 32 : 20}
                      className="text-yellow-500"
                    />
                  ) : (
                    <File
                      size={viewMode === "grid" ? 32 : 20}
                      className="text-blue-500"
                    />
                  )}

                  {/* 🆕 rename input if editing */}
                  {editingItem === item.name ? (
                    <input
                      autoFocus
                      defaultValue={item.name}
                      onBlur={(e) => {
                        const newName = e.target.value.trim() || item.name;
                        setItems(
                          items.map((i) =>
                            i.name === item.name ? { ...i, name: newName } : i
                          )
                        );
                        setEditingItem(null);
                      }}
                      className="border px-1 rounded"
                    />
                  ) : (
                    <span onDoubleClick={() => setEditingItem(item.name)}>
                      {item.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Context Menu ---------- */}
        {contextMenu && (
          <div
            style={{
              top: contextMenu.y,
              left: contextMenu.x,
              position: "fixed",
            }}
            className="bg-white border shadow-md rounded w-32 text-sm"
            onMouseLeave={() => setContextMenu(null)}
          >
            {contextMenu.item ? (
              <>
                <div
                  className="px-3 py-2 hover:bg-zinc-300 hover:text-black cursor-pointer"
                  onClick={() => setContextMenu(null)}
                >
                  Open
                </div>
                <div
                  className="px-3 py-2 hover:bg-zinc-300 hover:text-black cursor-pointer"
                  onClick={() => handleRename(contextMenu.item)}
                >
                  Rename
                </div>
                <div
                  className="px-3 py-2 hover:bg-zinc-300 hover:text-red-600 cursor-pointer text-red-600"
                  onClick={() => handleDelete(contextMenu.item)}
                >
                  Delete
                </div>
              </>
            ) : (
              <div
                className="px-3 py-2 hover:bg-zinc-300 hover:text-black cursor-pointer"
                onClick={handleNewFolder}
              >
                📁 New Folder
              </div>
            )}
          </div>
        )}
      </Rnd>
    )
  );
}
