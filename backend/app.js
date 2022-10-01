const express = require("express");
const app = express();
const cors = require("cors");

const diseaseRoutes = require("./routes/disease");
const riskRoutes = require("./routes/risk");

app.use(cors());
app.use(express.json()); 

app.use("/api/disease", diseaseRoutes);
app.use("/api/risk", riskRoutes);


module.exports = app;