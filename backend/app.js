const express = require("express");
const app = express();
const cors = require("cors");


const riskRoutes = require("./routes/risk");
const symptomRoutes = require("./routes/symptom");

app.use(cors());
app.use(express.json()); 


app.use("/api/risk", riskRoutes);
app.use("/api/symptom", symptomRoutes);


module.exports = app;