const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all tasks for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Create a new task
router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title, user: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update a task
router.put("/:id", auth, async (req, res) => {
  try {
    const { title } = req.body;
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
