const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authmiddleware");

const {
  getDashboardStats
} = require("../controllers/dashboardcontroller");

router.get("/", protect, getDashboardStats);


module.exports = router;