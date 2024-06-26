require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const {
  userRoutes,
  programRoutes,
  assignationRoutes,
  activityRoutes,
  reportRoutes,
} = require("./src/routes");

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ success: true, data: null, message: "Service Running" });
});

app.listen(port, () => {
  console.log(`Service listening on port ${port}`);
});

app.use("/user", userRoutes);
app.use("/activity", activityRoutes);
app.use("/admin/program", programRoutes, assignationRoutes);
app.use("/report", reportRoutes);
