import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AiOutlineMenu, AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logofile from "../../../assets/images/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Theme apply
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-primary text-white"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logofile} alt="logo" className="w-10 h-10 rounded-lg" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              BookCourier
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/books" className={navLinkClass}>
              Books
            </NavLink>
            <NavLink to="/wishlist" className={navLinkClass}>
              Wishlist
            </NavLink>

            {user && (
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            )}

            {!user ? (
              <NavLink to="/login" className={navLinkClass}>
                Login / Register
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg font-medium text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm rounded-full"
            >
              {theme === "dark" ? (
                <AiOutlineSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <AiOutlineMoon className="w-5 h-5" />
              )}
            </button>

            {/* User avatar */}
            {user && (
              <img
                src={user.photoURL || avatarImg}
                alt="profile"
                className="w-9 h-9 rounded-full border"
                referrerPolicy="no-referrer"
              />
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden btn btn-ghost btn-sm"
            >
              <AiOutlineMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 mb-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 space-y-2">
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/books"
              className={navLinkClass}
            >
              Books
            </NavLink>

            {user && (
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/dashboard"
                className={navLinkClass}
              >
                Dashboard
              </NavLink>
            )}

            {!user ? (
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/login"
                className={navLinkClass}
              >
                Login / Register
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg font-medium text-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
