const mongoose = require("mongoose");


const riskSchema = new mongoose.Schema({
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

const Risk = mongoose.model("Risk", riskSchema, "Risk");

module.exports = Risk;