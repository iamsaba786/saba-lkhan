import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import {
  Trash2,
  RotateCw,
  X,
  Trash,
  ArrowUpRight,
  Search,
  Folder,
  File as FileIcon,
  Grid,
  Minus,
} from "lucide-react";

export default function RecycleBin({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // ✅ new state
  const [items, setItems] = useState([
    {
      id: 1,
      type: "folder",
      name: "Old Project",
      size: "4.2 MB",
      deletedAt: "2 days ago",
    },
    {
      id: 2,
      type: "file",
      name: "Meeting-notes.docx",
      size: "56 KB",
      deletedAt: "5 days ago",
    },
    {
      id: 3,
      type: "file",
      name: "holiday-photo.png",
      size: "3.1 MB",
      deletedAt: "1 week ago",
    },
    {
      id: 4,
      type: "file",
      name: "draft.pdf",
      size: "720 KB",
      deletedAt: "3 weeks ago",
    },
  ]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmEmpty, setConfirmEmpty] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = items.filter((it) =>
    it.name.toLowerCase().includes(query.toLowerCase())
  );

  const restoreItem = (item) => {
    setItems((s) => s.filter((i) => i.id !== item.id));
    setSelected(null);
    setToast(`Restored "${item.name}"`);
  };

  const deletePermanent = (item) => {
    setItems((s) => s.filter((i) => i.id !== item.id));
    setSelected(null);
    setToast(`Permanently deleted "${item.name}"`);
    setConfirmDelete(null);
  };

  const emptyBin = () => {
    setItems([]);
    setSelected(null);
    setToast("Recycle Bin emptied");
    setConfirmEmpty(false);
  };

  const centerX = window.innerWidth / 2 - 420;
  const centerY = window.innerHeight / 2 - 260;

  // ✅ Minimized state — only restore button
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-zinc-800 text-white rounded shadow z-50"
      >
        🗑️ Recycle Bin
      </button>
    );
  }

  return (
    <>
      <Rnd
        default={{ x: centerX, y: centerY, width: 840, height: 520 }}
        size={isMaximized ? { width: "100%", height: "100%" } : undefined}
        position={isMaximized ? { x: 0, y: 0 } : undefined}
        enableResizing={!isMaximized}
        disableDragging={isMaximized}
        minWidth={520}
        minHeight={320}
        bounds="window"
        dragHandleClassName="rb-titlebar"
        className="z-50 shadow-2xl border border-zinc-700 rounded bg-zinc-900/95 text-white flex flex-col overflow-hidden"
      >
        {/* Titlebar */}
        <div className="rb-titlebar flex items-center justify-between px-3 py-2 bg-zinc-800/90">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            <span className="font-semibold">Recycle Bin</span>
            <span className="text-xs text-zinc-400 ml-2">
              ({items.length} items)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* ✅ Minimize button */}
            <button
              onClick={() => setIsMinimized(true)}
              title="Minimize"
              className="px-2 py-1 rounded hover:bg-zinc-700/60"
            >
              <Minus className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMaximized(!isMaximized)}
              title="Maximize / Restore"
              className="px-2 py-1 rounded hover:bg-zinc-700/60"
            >
              {isMaximized ? "🗗" : "🗖"}
            </button>

            <button
              onClick={onClose}
              title="Close"
              className="px-2 py-1 rounded cursor-pointer hover:bg-red-600/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-sm">This PC</span>
            <span className="text-zinc-600">›</span>
            <span className="text-sm font-medium">Recycle Bin</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center bg-zinc-800/60 px-2 py-1 rounded border border-zinc-700">
              <Search className="w-4 h-4 text-zinc-400 mr-2" />
              <input
                placeholder="Search Recycle Bin"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-56"
              />
            </div>
            <div className="text-zinc-400 text-sm">View</div>
            <button className="px-2 py-1 rounded hover:bg-zinc-700/60">
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: items list */}
          <div className="w-1/2 bg-zinc-900/95 p-4 overflow-auto border-r border-zinc-800">
            {filtered.length === 0 ? (
              <div className="text-zinc-400 text-center mt-20">
                Recycle Bin is empty
              </div>
            ) : (
              <ul className="space-y-2">
                {filtered.map((it) => (
                  <li
                    key={it.id}
                    onClick={() => setSelected(it)}
                    onDoubleClick={() => restoreItem(it)}
                    className={`flex items-center justify-between p-2 rounded hover:bg-zinc-800/60 cursor-pointer ${
                      selected?.id === it.id
                        ? "bg-zinc-800/50 ring-1 ring-zinc-600"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded bg-zinc-800/40">
                        {it.type === "folder" ? (
                          <Folder className="w-5 h-5 text-yellow-400" />
                        ) : (
                          <FileIcon className="w-5 h-5 text-sky-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="text-xs text-zinc-500">
                          {it.size} • deleted {it.deletedAt}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          restoreItem(it);
                        }}
                        className="px-2 py-1 text-sm bg-zinc-700 rounded hover:bg-zinc-700/80"
                      >
                        Restore
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDelete(it);
                        }}
                        className="px-2 py-1 text-sm text-red-400 rounded hover:bg-red-600/10"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: preview/details */}
          <div className="flex-1 p-4 bg-zinc-900/90">
            {selected ? (
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded bg-zinc-800/40">
                      {selected.type === "folder" ? (
                        <Folder className="w-6 h-6 text-yellow-400" />
                      ) : (
                        <FileIcon className="w-6 h-6 text-sky-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {selected.name}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {selected.size} • deleted {selected.deletedAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => restoreItem(selected)}
                      className="px-3 py-1 bg-zinc-700 rounded hover:bg-zinc-700/80"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => setConfirmDelete(selected)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete Permanently
                    </button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-zinc-800/40 rounded">
                  <div className="text-zinc-300 mb-2">Preview</div>
                  <div className="h-40 bg-zinc-800/20 rounded flex items-center justify-center text-zinc-500">
                    (Preview not available){" "}
                    <ArrowUpRight className="ml-2 w-4 h-4 inline" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-zinc-500">
                Select an item to preview & restore
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-zinc-800 flex items-center justify-between text-sm text-zinc-400">
          <div>Items: {items.length}</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const all = confirm("Restore all items?");
                if (all) {
                  setItems([]);
                  setToast("Restored all items");
                }
              }}
              className="px-3 py-1 rounded hover:bg-zinc-800/60"
            >
              Restore all
            </button>
            <button
              onClick={() => setConfirmEmpty(true)}
              className="px-3 py-1 rounded hover:bg-zinc-800/60"
            >
              Empty Recycle Bin
            </button>
          </div>
        </div>
      </Rnd>

      {/* Confirm & Toast (same as before) */}
      {confirmEmpty && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60"
          onClick={() => setConfirmEmpty(false)}
        >
          <div
            className="bg-white text-black rounded p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Empty Recycle Bin</h3>
            <p className="text-sm text-zinc-600 mb-4">
              Are you sure you want to permanently delete all items?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmEmpty(false)}
                className="px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={emptyBin}
                className="px-3 py-1 rounded bg-red-600 text-white"
              >
                Empty
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60"
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="bg-white text-black rounded p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Delete Permanently</h3>
            <p className="text-sm text-zinc-600 mb-4">
              Permanently delete "{confirmDelete.name}"?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePermanent(confirmDelete)}
                className="px-3 py-1 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed right-6 bottom-6 z-[1000] bg-black/80 text-white px-4 py-2 rounded">
          {toast}
        </div>
      )}
    </>
  );
}
