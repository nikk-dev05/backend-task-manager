const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authmiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskcontroller");



router.post("/", protect, createTask);


router.get("/", protect, getTasks);



router.put("/:id", protect, updateTask);


router.delete("/:id", protect, deleteTask);


module.exports = router;