const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authmiddleware");

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require("../controllers/projectcontroller");



router.post("/", protect, createProject);

router.get("/", protect, getProjects);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);


module.exports = router;