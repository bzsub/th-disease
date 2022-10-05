const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
// const errorHandler = require("./middlewares/errorHandler");

morgan.token("host", function (req, res) {
    return req.hostname;
  });

const riskRoutes = require("./routes/risk");
const symptomRoutes = require("./routes/symptom");
const diseaseRoutes = require("./routes/disease");
const authRoutes = require("./routes/auth");


app.use(cors());
app.use(express.json()); // parse data from req.body
// app.use(morgan({format: 'POST body length in bytes :req.body', immediate: true}))

app.use(morgan(":method :url :status - HOST: :host  - :response-time ms")); // use this middleware to log data on every request


app.use("/api/risk", riskRoutes);
app.use("/api/symptom", symptomRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api", authRoutes);

// app.use(errorHandler);


module.exports = app;