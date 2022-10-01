const mongoose = require('mongoose');
const DiseaseService = require('../services/disease');


const apiGetDiseases = async (req, res) => {
    const diseases = await DiseaseService.getDiseases()
    if (!diseases) return res.sendStatus(400) 
    res.status(200).json(diseases);
}   

const apiGetOneDisease = async (req, res) => {
    if( !mongoose.Types.ObjectId.isValid(req.params.disease_id) ) return res.sendStatus(400);
    const disease = await DiseaseService.getOneDisease(req.params.disease_id)
    if (!disease) return res.sendStatus(400) 
    res.status(200).json(disease);
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

module.exports = { 
    apiGetDiseases,
    apiGetOneDisease,
    apiSaveDisease,
    apiUpdateDisease,
    apiDeleteDisease,
}