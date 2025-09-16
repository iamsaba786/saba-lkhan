import React from "react";

function DesktopIcon({ name, icon, onDoubleClick }) {
  return (
    <button
      onDoubleClick={onDoubleClick}
      className="desktop-icon flex flex-col items-center text-xs hover:scale-105 transition duration-200 cursor-pointer"
    >
      <img src={icon} alt={name} className="w-9 h-9" />
      <span>{name}</span>
    </button>
  );
}

export default DesktopIcon;
