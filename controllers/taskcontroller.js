const Task = require("../models/task");
const Project = require("../models/project");
const createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      status,
      projectId,
      assignedTo
    } = req.body;
    if (!title || !description || !projectId) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing"
      });
    }
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    const task = await Task.create({
      title,
      description,
      status,
      projectId,
      assignedTo,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};




const getTasks = async (req, res) => {

  try {

    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter)
      .populate("projectId", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");

    res.status(200).json({
      success: true,
      total: tasks.length,
      tasks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};




// UPDATE TASK
const updateTask = async (req, res) => {

  try {

    const {
      title,
      description,
      status
    } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};




// DELETE TASK
const deleteTask = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};