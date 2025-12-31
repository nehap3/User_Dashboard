const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// Get tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Add task
router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title?.trim()) return res.status(400).json({ msg: "Title required" });

    const task = await Task.create({ title: title.trim(), user: req.user.id });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    console.log("PUT request:", req.params.id, req.body);

    const { title } = req.body;
    if (!title?.trim()) return res.status(400).json({ msg: "Title required" });

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title: title.trim() },
      { new: true }
    );

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json(task);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;