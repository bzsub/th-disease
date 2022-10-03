const express = require("express");
const app = express();
const cors = require("cors");
// const errorHandler = require("./middlewares/errorHandler");


const riskRoutes = require("./routes/risk");
const symptomRoutes = require("./routes/symptom");
const diseaseRoutes = require("./routes/disease");

app.use(cors());
app.use(express.json()); 


app.use("/api/risk", riskRoutes);
app.use("/api/symptom", symptomRoutes);
app.use("/api/disease", diseaseRoutes);

// app.use(errorHandler);


module.exports = app;