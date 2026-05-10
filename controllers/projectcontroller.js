const Project = require("../models/project");

const createProject = async (req, res) => {
  try {

    const { title, description } = req.body;


    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }


    const project = await Project.create({
      title,
      description,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


const getProjects = async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      total: projects.length,
      projects
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};




const updateProject = async (req, res) => {

  try {

    const { title, description } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



const deleteProject = async (req, res) => {

  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject
};