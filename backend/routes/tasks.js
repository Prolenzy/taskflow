const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/tasks - Get all tasks for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, completed, priority } = req.query;
    
    // Build filter object
    const filter = { user: req.user.id };
    if (completed !== undefined) filter.completed = completed === 'true';
    if (priority) filter.priority = priority;
    
    const tasks = await Task.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Task.countDocuments(filter);
    
    res.json({
      tasks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/tasks/:id - Get single task
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/tasks - Create new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user.id
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, completed, dueDate, priority } = req.body;
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, completed, dueDate, priority },
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;