const Risk = require("../models/risk");


const getRisks = async () => {
    try {
        const risks = await Risk.find();
        return risks;
    } catch (error) {
        console.log(`Could not get Risks ${ error }`)
    }
}

const saveRisk = async (riskData) => {
    try {
        const risk = await Risk.create(riskData);
        return risk;
    } catch (error) {
        console.log(`Could not save Risk ${ error }`)
    }
}

const updateRisk = async (risk_id, riskData) => {
    try {
        const risk = await Risk.findOneAndUpdate({ "_id": risk_id}, riskData, { new: true });
        return risk;
    } catch (error) {
        console.log(`Could not save Risk ${ error }`)
    }
}

const deleteRisk = async (risk_id) => {
    try {
        const risk = await Risk.findOneAndDelete({ "_id": risk_id })
        return risk;
    } catch (error) {
        console.log(`Could not delete risk ${ error }`)
    }
}


module.exports = { 
    saveRisk,
    getRisks,
    updateRisk,
    deleteRisk
}