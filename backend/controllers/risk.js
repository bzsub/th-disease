const mongoose = require('mongoose')
const RiskService = require('../services/risk');
const DiseaseService = require('../services/disease');


const apiGetRisks = async (req, res) => {

    const risks = await RiskService.getRisks()
    if (!risks) return res.sendStatus(400) 

    res.status(200).json(risks);
}   

const apiSaveRisk = async (req, res) => {

    if ( !req.body.name || !req.body.description ) return res.status(400).send("Name and description can't be empty")

    const risk = await RiskService.saveRisk(req.body)
    if (!risk) return res.status(409).send("Name or description already taken")

    res.status(200).json(risk); 
}  

const apiUpdateRisk = async (req, res) => {

    if ( !req.body.name || !req.body.description ) return res.status(400).send("Name and description can't be empty")
    if( !mongoose.Types.ObjectId.isValid(req.params.risk_id) ) return res.status(400).send("Wrong disease id")

    const risk = await RiskService.updateRisk(req.params.risk_id, req.body)
    if (!risk) return res.status(409).send("Name or description already taken") 

    res.status(200).json(risk); 
} 

const apiDeleteRisk = async (req, res) => {

    if( !mongoose.Types.ObjectId.isValid(req.params.risk_id) ) return res.status(400).send("Wrong disease id")
    
    const risk = await RiskService.deleteRisk(req.params.risk_id)
    
    if (!risk) {
        return res.status(409).send("Name or description already taken")
    } else {
        const diseases = await DiseaseService.deleteOneRiskOrSymptom("risks",req.params.risk_id)
    }

    res.status(200).json(risk);    
} 

module.exports = { 
    apiGetRisks,
    apiSaveRisk,
    apiUpdateRisk,
    apiDeleteRisk,
}