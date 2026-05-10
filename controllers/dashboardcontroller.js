const Task = require("../models/task");
const Project = require("../models/project");

const getDashboardStats = async (req, res) => {

  try {

    const totalProjects = await Project.countDocuments();

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "completed"
    });

    const pendingTasks = await Task.countDocuments({
      status: "pending"
    });

    res.status(200).json({
      success: true,
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getDashboardStats
};