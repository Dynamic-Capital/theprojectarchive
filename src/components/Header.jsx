import React from 'react';

export default function Header({ onToggle }) {
  return (
    <header className="site-header fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow z-50">
      <a href="#home" className="logo text-xl font-bold text-gray-800">The Project Archive</a>
      <button
        className="hamburger flex flex-col justify-between w-8 h-6"
        aria-label="Open menu"
        onClick={onToggle}
      >
        <span className="block h-0.5 bg-gray-800"></span>
        <span className="block h-0.5 bg-gray-800"></span>
        <span className="block h-0.5 bg-gray-800"></span>
      </button>
    </header>
  );
}
