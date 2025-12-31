import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route path="/register" element={<Layout><Register /></Layout>} />
                <Route path="/dashboard" element={<Layout protectedRoute={true}><Dashboard /></Layout>} />
                <Route path="/" element={
                    <Layout>
                        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
                            <div className="text-center max-w-lg">
                                <h1 className="text-4xl font-bold text-white mb-4">
                                    Task Manager
                                </h1>
                                <p className="text-gray-400 text-lg mb-8">
                                    A simple and clean way to manage your daily tasks.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <a
                                        href="/register"
                                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 transition"
                                    >
                                        Get Started
                                    </a>
                                    <a
                                        href="/login"
                                        className="border border-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                                    >
                                        Sign In
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Layout>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
