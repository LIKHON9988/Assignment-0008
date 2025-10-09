import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Feather"
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="text-lg font-semibold tracking-tight bg-gradient-to-br from-purple-700 to-purple-500 bg-clip-text text-transparent">
            HERO.IO
          </div>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-purple-600 font-medium border-b-2 border-purple-600 pb-1"
                : "text-gray-600 hover:text-purple-600 transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/apps"
            className={({ isActive }) =>
              isActive
                ? "text-purple-600 font-medium border-b-2 border-purple-600 pb-1"
                : "text-gray-600 hover:text-purple-600 transition-colors"
            }
          >
            Apps
          </NavLink>
          <NavLink
            to="/my-installations"
            className={({ isActive }) =>
              isActive
                ? "text-purple-600 font-medium border-b-2 border-purple-600 pb-1"
                : "text-gray-600 hover:text-purple-600 transition-colors"
            }
          >
            My Installations
          </NavLink>
        </nav>

        {/* Contribution Button - Right */}
        <div className="hidden md:block">
          <a
            href="https://github.com/LIKHON9988"
            target="_blank"
            rel="noreferrer"
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-5 py-2 rounded-md shadow-sm font-medium"
          >
            🟐 Contribution
          </a>
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="p-2 bg-gray-100 rounded-md"
      >
        ☰
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg p-4 z-50">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block py-2 ${
                isActive
                  ? "text-purple-600 font-medium border-l-2 border-purple-600 pl-2"
                  : "text-gray-700 hover:text-purple-600 pl-2"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/apps"
            className={({ isActive }) =>
              `block py-2 ${
                isActive
                  ? "text-purple-600 font-medium border-l-2 border-purple-600 pl-2"
                  : "text-gray-700 hover:text-purple-600 pl-2"
              }`
            }
          >
            Apps
          </NavLink>
          <NavLink
            to="/my-installations"
            className={({ isActive }) =>
              `block py-2 ${
                isActive
                  ? "text-purple-600 font-medium border-l-2 border-purple-600 pl-2"
                  : "text-gray-700 hover:text-purple-600 pl-2"
              }`
            }
          >
            My Installations
          </NavLink>
          <a
            href="https://github.com/naseefniloy"
            target="_blank"
            rel="noreferrer"
            className="block py-2 mt-2 text-center bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
          >
            Contribution
          </a>
        </div>
      )}
    </div>
  );
}
