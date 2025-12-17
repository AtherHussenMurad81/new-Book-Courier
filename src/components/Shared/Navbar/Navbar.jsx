import { useState, useEffect } from "react";
import { Link } from "react-router";
import { AiOutlineMenu, AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logofile from "../../../assets/images/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply dark/light theme to html
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed w-full z-50 shadow-md bg-white dark:bg-gray-900 transition-colors duration-300">
      <Container>
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logofile} alt="logo" className="w-14 h-14 rounded-xl" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              BookCourier
            </span>
          </Link>

          {/* Center - Dashboard link */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <Link
                to="/dashboard"
                className="btn btn-sm btn-primary text-white font-semibold"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right - Theme toggle + Dropdown */}
          <div className="flex items-center gap-4 relative">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm rounded-full p-2"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <AiOutlineSun className="text-yellow-400 w-5 h-5" />
              ) : (
                <AiOutlineMoon className="text-gray-700 w-5 h-5" />
              )}
            </button>

            {/* Dropdown menu */}
            <div>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-700 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu className="w-5 h-5 text-gray-800 dark:text-white" />
                <img
                  src={user?.photoURL || avatarImg}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden text-sm z-50">
                  <div className="flex flex-col">
                    <Link
                      to="/"
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-semibold md:hidden"
                    >
                      Home
                    </Link>
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Dashboard link */}
          {user && (
            <Link
              to="/dashboard"
              className="btn btn-sm btn-primary text-white font-semibold md:hidden"
            >
              Dashboard
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
