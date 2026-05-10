const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./utils/db.js");

dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

app.use("/api/auth", require("./routes/authroutes"));

app.use("/api/projects", require("./routes/projectroutes"));

app.use("/api/tasks", require("./routes/taskroutes"));

app.use("/api/dashboard", require("./routes/dashboardroute"));


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});