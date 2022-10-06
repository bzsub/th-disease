const mongoose = require('mongoose')
const SymptomService = require('../services/symptom');
const DiseaseService = require('../services/disease');


const apiGetSymptoms = async (req, res) => {

    const symptomps = await SymptomService.getSymptoms()
    if (!symptomps) return res.sendStatus(400) 

    res.status(200).json(symptomps);
}   

const apiSaveSymptom = async (req, res) => {

    if ( !req.body.name || !req.body.description ) return res.sendStatus(400)
    
    const symptom = await SymptomService.saveSymptom(req.body)
    if (!symptom) return res.sendStatus(409) 
    
    res.status(200).json(symptom); 
}  

const apiUpdateSymptom = async (req, res) => {
    
    if ( !req.body.name || !req.body.description ) return res.sendStatus(400)
    if( !mongoose.Types.ObjectId.isValid(req.params.symptom_id) ) return res.sendStatus(400);
    
    const symptom = await SymptomService.updateSymptom(req.params.symptom_id, req.body)
    if (!symptom) return res.sendStatus(409) 
    
    res.status(200).json(symptom); 
} 

const apiDeleteSymptom = async (req, res) => {

    if( !mongoose.Types.ObjectId.isValid(req.params.symptom_id) ) return res.sendStatus(400);
    
    const symptom = await SymptomService.deleteSymptom(req.params.symptom_id)
    if (!symptom) {
        return res.sendStatus(409) 
    } else {
        const diseases = await DiseaseService.deleteOneRiskOrSymptom("symptoms",req.params.symptom_id)
    }    
    res.status(200).json(symptom);    
} 

module.exports = { 
    apiGetSymptoms,
    apiSaveSymptom,
    apiUpdateSymptom,
    apiDeleteSymptom,
}