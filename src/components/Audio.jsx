import React, { useState, useRef } from "react";

export default function Audio({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Playlist ka data ek jagah
  const songs = [
    {
      title: "as_it_was",
      img: "https://i.pinimg.com/1200x/3a/43/5e/3a435e88a3fae6835765d46709a58afd.jpg",
      src: "./audio/as_it_was.mp3",
    },
    {
      title: "qaseeda_burda_sharif",
      img: "https://i.pinimg.com/736x/93/76/bc/9376bc1dfbafcd1b24229ca384670d40.jpg",
      src: "./audio/qaseeda_burda_sharif.mp3",
    },
    {
      title: "Oh my hope",
      img: "https://i.pinimg.com/736x/07/94/5a/07945af5b44f6f6e6f0cf21cbead9623.jpg",
      src: "./audio/Oh my hope.mp3",
    },
    {
      title: "faded",
      img: "https://i.pinimg.com/736x/36/13/f8/3613f80ed028ff965586a741bb11205f.jpg",
      src: "./audio/faded.mp3",
    },
    {
      title: "let me down slowly",
      img: "https://i.pinimg.com/736x/6d/0b/28/6d0b28ac294c985728f9f5b3fceffb2b.jpg",
      src: "./audio/let_me_down.mp3",
    },
    {
      title: "Alone",
      img: "https://i.pinimg.com/736x/ea/cc/b8/eaccb861c4c03ecd9c508db57ac1b5d1.jpg",
      src: "./audio/alone.mp3",
    },
    {
      title: "stay",
      img: "https://i.pinimg.com/1200x/a2/6d/6a/a26d6a347d9784f5c8a178621708ab2f.jpg",
      src: "./audio/stay.mp3",
    },
    {
      title: "Bad boy",
      img: "https://i.pinimg.com/736x/98/40/e7/9840e70c7ee28ff6ccfbd5e9ba063d05.jpg",
      src: "./audio/bad_boy.mp3",
    },
  ];

  // Har ek song ke liye ref array
  const audioRefs = useRef([]);

  // Play function
  const handlePlay = (index) => {
    // sabhi audio stop karo
    audioRefs.current.forEach((ref) => {
      if (ref) {
        ref.pause();
        ref.currentTime = 0;
      }
    });
    // jo select hua usko play karo
    audioRefs.current[index].play();
  };

  // Pause function
  const handlePause = (index) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
    }
  };

  // restore btn
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-zinc-800 text-white rounded shadow"
      >
        🎵 Restore Audio
      </button>
    );
  }

  return (
    <div
      className={`${
        isMaximized
          ? "absolute top-16 left-40 w-[900px] h-[478px]"
          : "fixed top-0 left-0 w-full h-full"
      } z-40 bg-[#fff] shadow-2xl border rounded-xl border-zinc-700 flex flex-col overflow-hidden transition-all duration-300`}
    >
      {/* Header / Titlebar */}
      <div className="text-zinc-100 bg-zinc-900/95 p-2 font-semibold flex justify-between items-center">
        <span>🎵 Audio</span>
        <div className="flex gap-2">
          {/* Minimize */}
          <button
            onClick={() => setIsMinimized(true)}
            className="text-md cursor-pointer px-3 hover:bg-zinc-700 rounded"
            title="Minimize"
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
            className="text-sm text-red-600 cursor-pointer hover:text-red-800"
            title="Close"
          >
            ❌
          </button>
        </div>
      </div>

      <div>
        <h1 className="font-mono text-2xl pt-2 flex items-center justify-center">
          My ~ Playlist
        </h1>

        <div className="Playlists m-10 pl-10 pr-10 grid grid-cols-4 grid-flow-row gap-5">
          {songs.map((song, index) => (
            <div
              key={index}
              className="w-60 h-60 pl-2 bg-zinc-400 rounded-2xl shadow-lg transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
            >
              <div className="w-30 h-30 m-13 rounded-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={song.img}
                  alt={song.title}
                />
              </div>

              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                src={song.src}
              ></audio>

              <div className="relative bottom-9 pl-4">
                <button
                  onClick={() => handlePlay(index)}
                  className="px-7 py-1 m-1 rounded-xl bg-zinc-300 border border-black"
                >
                  Play
                </button>
                <button
                  onClick={() => handlePause(index)}
                  className="px-7 py-1 m-1 rounded-xl bg-zinc-300 border border-black"
                >
                  Pause
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
