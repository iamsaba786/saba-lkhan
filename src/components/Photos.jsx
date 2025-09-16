import { useState } from "react";
import { Rnd } from "react-rnd";

export default function Photos({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // 🆕 minimize support
  const [viewMode, setViewMode] = useState("grid");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Dummy photos list
  const photos = [
    "https://i.pinimg.com/736x/aa/f3/0d/aaf30d5685b74740072813c85710658b.jpg",
    "https://i.pinimg.com/736x/da/a9/24/daa924c0ca8afe682a55c3109f9534a0.jpg",
    "https://i.pinimg.com/1200x/b3/ae/23/b3ae23dd8874bd0cdf625f069206411f.jpg",
    "https://i.pinimg.com/736x/c5/21/81/c52181f5212108d03720d77bdc81955a.jpg",
    "https://i.pinimg.com/736x/fe/0a/bc/fe0abcd44dca63f2afda6b6754e0bc3b.jpg",
    "https://i.pinimg.com/1200x/f7/97/bb/f797bb1ce18e9326652a41c14079ce86.jpg",
    "https://i.pinimg.com/736x/3f/f0/f7/3ff0f765c75898d56854662a18a10c1c.jpg",
    "https://i.pinimg.com/1200x/8e/90/1f/8e901f7e4827cac9073ae2c3131d90fa.jpg",
    "https://i.pinimg.com/1200x/75/13/10/75131014da1d6d91090b8ec104a00b38.jpg",
    "https://i.pinimg.com/736x/b6/1f/0e/b61f0e0c2c72cc14383205940cfc869d.jpg",
    "https://i.pinimg.com/736x/20/8a/44/208a4448deb5f23c9f5c46b02b275c04.jpg",
    "https://i.pinimg.com/1200x/15/8b/67/158b67b7a1f50b69140df1dad3279bbe.jpg",
    "https://i.pinimg.com/736x/87/2a/53/872a53adae6d5eb103b228e2c7f590b3.jpg",
    "https://i.pinimg.com/1200x/02/5e/5d/025e5d085f129e752c198ce6ef0f878c.jpg",
    "https://i.pinimg.com/736x/da/86/74/da8674291ef54c96fcc781c6c193ff66.jpg",
    "https://i.pinimg.com/736x/ef/16/08/ef16089bfda3e38f11d08509a3f9f08a.jpg",
    "https://i.pinimg.com/1200x/b2/d8/b4/b2d8b4afc1bdf7ffed8b0b7129539826.jpg",
    "https://i.pinimg.com/736x/31/4f/33/314f3388f7da810b7cb2cfd00faa1c15.jpg",
    "https://i.pinimg.com/1200x/f7/5c/51/f75c51faa63acaa103771024f34e1384.jpg",
    "https://i.pinimg.com/1200x/49/62/62/49626260b6473d7662873afa50998885.jpg",
    "https://i.pinimg.com/1200x/01/de/40/01de40c9ac74d5d9fee3b48fefab16b5.jpg",
    "https://i.pinimg.com/1200x/2b/9e/12/2b9e1215ab2a882970fa7777a09becce.jpg",
    "https://i.pinimg.com/1200x/8e/9c/f4/8e9cf46ef1347db92b0312cb4360c62b.jpg",
    "https://i.pinimg.com/1200x/ae/b5/4a/aeb54af1705b726ab3483e1a03804c5a.jpg",
  ];

  // Center Position for non-maximized state
  const centerX = window.innerWidth / 2 - 450; // width 900 / 2
  const centerY = window.innerHeight / 2 - 250; // height 500 / 2
  const [windowPos, setWindowPos] = useState({ x: centerX, y: centerY });

  // 🆕 Restore button when minimized
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-zinc-800 text-white rounded shadow"
      >
        🖼 Restore Photos
      </button>
    );
  }

  return (
    !isMinimized && (
      <Rnd
        default={{
          x: windowPos.x,
          y: windowPos.y,
          width: 900,
          height: 497,
        }}
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
        <div className="title-bar text-zinc-100 bg-zinc-900/95 p-2 font-semibold flex justify-between items-center">
          <span>Photos</span>
          <div className="flex gap-2">
            {/* Minimize */}
            <button
              onClick={() => setIsMinimized(true)}
              className="text-md px-3 hover:bg-zinc-700 rounded"
            >
              ➖
            </button>

            {/* Maximize / Restore */}
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-md cursor-pointer px-3 hover:bg-zinc-700 rounded"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? "🗗" : "🗖"}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="text-sm text-red-600 cursor-pointer rounded"
              title="Close"
            >
              ❌
            </button>
          </div>
        </div>

        {/* ---------- Photo Gallery ---------- */}
        <div
          className={`flex-1 overflow-auto p-4 ${
            viewMode === "grid"
              ? "grid grid-cols-6 gap-4"
              : "flex flex-col gap-3"
          }`}
        >
          {photos.map((src, i) => (
            <div
              key={i}
              className="cursor-pointer hover:scale-105 transition"
              onClick={() => setSelectedIndex(i)}
            >
              <img
                src={src}
                alt={`Photo ${i}`}
                className={`rounded-lg shadow ${
                  viewMode === "list" ? "w-full h-40 object-cover" : "w-full"
                }`}
              />
            </div>
          ))}
        </div>

        {/* ---------- Fullscreen Photo Preview ---------- */}
        {selectedIndex !== null && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            {/* Previous Button */}
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev > 0 ? prev - 1 : photos.length - 1
                )
              }
              className="absolute hover:scale-105 transition cursor-pointer left-5 px-4 py-2"
            >
              <img
                className="h-13 w-13"
                src="https://img.icons8.com/nolan/50/rewind.png"
                alt="Previous button"
              />
            </button>

            {/* Selected Image */}
            <img
              src={photos[selectedIndex]}
              alt="Preview"
              className="p-10 max-h-[100%] max-w-[100%] rounded-lg shadow-lg"
            />

            {/* Next Button */}
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev < photos.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute hover:scale-105 transition cursor-pointer right-5 px-4 py-2"
            >
              <img
                className="h-13 w-13"
                src="https://img.icons8.com/nolan/64/fast-forward.png"
                alt="Next button"
              />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute bottom-20 bg-red-600 cursor-pointer text-white px-4 py-2 rounded shadow hover:bg-red-500"
            >
              Close
            </button>
          </div>
        )}
      </Rnd>
    )
  );
}
