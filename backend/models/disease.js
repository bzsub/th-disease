const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String, 
        required: false, 
        unique: true 
    },
    symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Symptom' }],
    risks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Risk' }],
});


const Disease = mongoose.model("Disease", diseaseSchema, "Disease");

module.exports = Disease;