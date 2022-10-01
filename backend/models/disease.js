const mongoose = require("mongoose");
const { Schema } = mongoose;


const diseaseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    symptoms: [{ type: Schema.Types.ObjectId, ref: 'Symptom' }],
    riskFactors: [{ type: Schema.Types.ObjectId, ref: 'RiskFactor' }],
    // symptoms: [symptomSchema],
    // riskFactors: [riskFactorSchema],
});


const Disease = mongoose.model("Disease", diseaseSchema);

module.exports = Disease;