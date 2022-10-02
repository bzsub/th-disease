const Symptom = require("../models/symptom");


const getSymptoms = async () => {
    try {
        const symptoms = await Symptom.find(); //.find().distinct('name');
        return symptoms;
    } catch (error) {
        console.log(`Could not get symptoms ${ error }`)
    }
}

const saveSymptom = async (symptomData) => {
    try {
        const symptom = await Symptom.create(symptomData);
        return symptom;
    } catch (error) {
        console.log(`Could not save symptom ${ error }`)
    }
}

const updateSymptom = async (symptom_id, symptomData) => {
    try {
        const symptom = await Symptom.findOneAndUpdate({ "_id": symptom_id}, symptomData, { new: true });
        return symptom;
    } catch (error) {
        console.log(`Could not save symptom ${ error }`)
    }
}

const deleteSymptom = async (symptom_id) => {
    try {
        const symptom = await Symptom.findOneAndDelete({ "_id": symptom_id })
        return symptom;
    } catch (error) {
        console.log(`Could not delete symptom ${ error }`)
    }
}


module.exports = { 
    saveSymptom,
    getSymptoms,
    updateSymptom,
    deleteSymptom
}