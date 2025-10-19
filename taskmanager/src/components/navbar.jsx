import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Taskmanager
      </div>

      {/* Links */}
      <div className="flex space-x-6 text-gray-700 dark:text-gray-200 font-medium">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
        <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link>
        <Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400">Products</Link>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="ml-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
        title="Toggle theme"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
};

export default Navbar;
