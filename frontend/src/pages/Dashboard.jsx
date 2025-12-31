import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      alert("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await api.post("/tasks", { title });
      setTasks([res.data, ...tasks]);
      setTitle("");
    } catch {
      alert("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      alert("Failed to delete task");
    }
  };

  const updateTask = async (id, newTitle) => {
    try {
      const res = await api.put(`/tasks/${id}`, { title: newTitle });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch {
      alert("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
        <p className="text-gray-500 mb-8">Manage your daily tasks efficiently</p>

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            className="flex-1 bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-500 transition placeholder-gray-500"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
          />
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 transition disabled:opacity-50"
            onClick={addTask}
            disabled={!title.trim()}
          >
            Add
          </button>
        </div>

        {/* Search */}
        <input
          className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-lg mb-6 focus:outline-none focus:border-indigo-500 transition placeholder-gray-500"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-500 mb-4 px-1">
          <span>{filteredTasks.length} task{filteredTasks.length !== 1 && "s"}</span>
          {search && <span>Searching: "{search}"</span>}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 bg-gray-900 rounded-xl border border-gray-800">
              <p className="text-gray-400 text-lg mb-1">
                {search ? "No matching tasks" : "No tasks yet"}
              </p>
              <p className="text-gray-600 text-sm">
                {search ? "Try a different search" : "Add your first task above"}
              </p>
            </div>
          ) : (
            filteredTasks.map((t) => (
              <div
                key={t._id}
                className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition group"
              >
                <span className="text-white font-medium">{t.title}</span>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                  <button
                    className="text-sm text-amber-400 hover:text-amber-300"
                    onClick={() => {
                      const newTitle = prompt("Edit task:", t.title);
                      if (newTitle) updateTask(t._id, newTitle);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-400 hover:text-red-300"
                    onClick={() => deleteTask(t._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
