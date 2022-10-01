const mongoose = require("mongoose");


const symptomSchema = new mongoose.Schema({
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
});

const Symptom = mongoose.model("Symptom", symptomSchema, "Symptom");

module.exports = Symptom;