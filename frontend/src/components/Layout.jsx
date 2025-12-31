import { useContext } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children, protectedRoute = false }) => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    if (protectedRoute && !user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Navbar */}
            <nav className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-white">
                        📋 TaskApp
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition ${location.pathname === "/" ? "text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/dashboard"
                            className={`text-sm font-medium transition ${location.pathname === "/dashboard" ? "text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Dashboard
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-700">
                                <span className="text-sm text-gray-300">{user.name}</span>
                                <button
                                    onClick={logout}
                                    className="text-sm text-gray-400 hover:text-red-400 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-700">
                                <Link to="/login" className="text-sm text-gray-400 hover:text-white transition">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
};

export default Layout;
