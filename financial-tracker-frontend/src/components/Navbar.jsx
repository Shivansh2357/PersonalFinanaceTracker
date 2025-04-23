import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { toast } from "react-toastify";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-primary dark:bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          {/* Replace with your logo */}
          <span>Financial Tracker</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-white hover:text-secondary">
            Dashboard
          </Link>
          {token ? (
            <>
              <Link to="/transactions" className="text-white hover:text-secondary">
                Transactions
              </Link>
              <Link to="/investments" className="text-white hover:text-secondary">
                Investments
              </Link>
              <Link to="/savings" className="text-white hover:text-secondary">
                Savings
              </Link>
              <Link to="/loans" className="text-white hover:text-secondary">
                Loans
              </Link>
              <Link to="/recurring-transactions" className="text-white hover:text-secondary">
                Recurring
              </Link>
              <Link to="/tax" className="text-white hover:text-secondary">
                Tax
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-secondary">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-secondary">
                Signup
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="text-white p-2 rounded-full hover:bg-secondary"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;