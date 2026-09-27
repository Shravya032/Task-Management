const Task = require('../models/Task');

// =========================
// GET TASKS
// =========================

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            userId: req.userId
        }).sort({
            createdAt: 1
        });

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// =========================
// CREATE TASK
// =========================

exports.createTask = async (req, res) => {
    const {
        description,
        priority,
        dueDate
    } = req.body;

    try {
        const newTask = new Task({
            userId: req.userId,
            description,
            priority,
            dueDate
        });

        await newTask.save();

        res.status(201).json(newTask);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// =========================
// UPDATE TASK
// =========================

exports.updateTask = async (req, res) => {
    try {
        const task =
            await Task.findOneAndUpdate(
                {
                    _id: req.params.id,
                    userId: req.userId
                },
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// =========================
// DELETE TASK
// =========================

exports.deleteTask = async (req, res) => {
    try {
        const task =
            await Task.findOneAndDelete({
                _id: req.params.id,
                userId: req.userId
            });

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.status(200).json({
            message: 'Task deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};