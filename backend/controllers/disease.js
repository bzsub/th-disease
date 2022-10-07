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
    if ( !req.body.name || !req.body.description ) return res.status(400).send("Name and description can't be empty")
    const disease = await DiseaseService.saveDisease(req.body)
    if (!disease) return res.status(409).send("Name or description already taken") 
    res.status(200).json(disease); 
}  

const apiUpdateDisease = async (req, res) => {
    if ( !req.body.name || !req.body.description ) return res.status(400).send("Name and description can't be empty")
    if( !mongoose.Types.ObjectId.isValid(req.params.disease_id)) return res.status(400).send("Wrong disease id")
    const disease = await DiseaseService.updateDisease(req.params.disease_id, req.body)
    if (!disease) return res.status(409).send("A disease with a same parameter already exist")
    res.status(200).json(disease); 
} 

const apiDeleteDisease = async (req, res) => {
    if( !mongoose.Types.ObjectId.isValid(req.params.disease_id) ) return res.status(400).send("Wrong disease id")
    const disease = await DiseaseService.deleteDisease(req.params.disease_id)
    if (!disease) return res.sendStatus(409) 
    res.status(200).json(disease);    
} 


module.exports = { 
    apiGetDiseases,
    apiSaveDisease,
    apiUpdateDisease,
    apiDeleteDisease,
}