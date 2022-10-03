const mongoose = require('mongoose');
const DiseaseService = require('../services/disease');
const Disease = require("../models/disease");


const apiGetDiseases = async (req, res) => {
    Disease.find()
        .populate('risks')
        .populate('symptoms')
        .exec((err, disease) => {
            res.status(200).json(disease);
    }); 
}   

const apiSaveDisease = async (req, res) => {
    if ( !req.body.name || !req.body.description ) return res.sendStatus(400)
    const disease = await DiseaseService.saveDisease(req.body)
    if (!disease) return res.sendStatus(409) 
    res.status(200).json(disease); 
}  

const apiUpdateDisease = async (req, res) => {
    if ( !req.body.name || !req.body.description ) return res.sendStatus(400)
    if( !mongoose.Types.ObjectId.isValid(req.params.disease_id) ) return res.sendStatus(400);
    const disease = await DiseaseService.updateDisease(req.params.disease_id, req.body)
    if (!disease) return res.sendStatus(409) 
    res.status(200).json(disease); 
} 

const apiDeleteDisease = async (req, res) => {
    if( !mongoose.Types.ObjectId.isValid(req.params.disease_id) ) return res.sendStatus(400);
    const disease = await DiseaseService.deleteDisease(req.params.disease_id)
    if (!disease) return res.sendStatus(409) 
    res.status(200).json(disease);    
} 

// const apiGetOneDisease = async (req, res) => {
//     if( !mongoose.Types.ObjectId.isValid(req.params.disease_id) ) return res.sendStatus(400);
//     const disease = await Disease.findById({_id: req.params.disease_id})
//         .populate('risks')
//         .populate('symptoms')
//         .exec((err, disease) => {
//             res.status(200).json(disease);
//     }); 
// }   

// const apiAddOneRisk = async (req, res) => {
//     const { disease_id, risk_id } = req.params;
//     if( !mongoose.Types.ObjectId.isValid(disease_id) || !mongoose.Types.ObjectId.isValid(risk_id) ) return res.sendStatus(400);
//     const disease = await DiseaseService.addOneRisk(disease_id, risk_id)
//     if (!disease) return res.sendStatus(400) 
//     res.status(200).json(disease); 
// }

// const apiAddOneSymptom = async (req, res) => {
//     const { disease_id, symptom_id } = req.params;
//     if( !mongoose.Types.ObjectId.isValid(disease_id) || !mongoose.Types.ObjectId.isValid(symptom_id) ) return res.sendStatus(400);
//     const disease = await DiseaseService.addOneSymptom(disease_id, symptom_id)
//     if (!disease) return res.sendStatus(400) 
//     res.status(200).json(disease); 
// }

// const apiDeleteOneRisk = async (req, res) => {
//     const { disease_id, risk_id } = req.params;
//     if( !mongoose.Types.ObjectId.isValid(disease_id) || !mongoose.Types.ObjectId.isValid(risk_id) ) return res.sendStatus(400);
//     const disease = await DiseaseService.deleteOneRisk(disease_id, risk_id)
//     if (!disease) return res.sendStatus(400) 
//     res.status(200).json(disease); 
// }

// const apiDeleteOneSymptom = async (req, res) => {
//     const { disease_id, symptom_id } = req.params;
//     if( !mongoose.Types.ObjectId.isValid(disease_id) || !mongoose.Types.ObjectId.isValid(symptom_id) ) return res.sendStatus(400);
//     const disease = await DiseaseService.deleteOneSymptom(disease_id, symptom_id)
//     if (!disease) return res.sendStatus(400) 
//     res.status(200).json(disease); 
// }

module.exports = { 
    apiGetDiseases,
    apiSaveDisease,
    apiUpdateDisease,
    apiDeleteDisease,
    // apiGetOneDisease,
    // apiAddOneRisk,
    // apiAddOneSymptom,
    // apiDeleteOneRisk,
    // apiDeleteOneSymptom,
}