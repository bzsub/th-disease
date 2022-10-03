const Disease = require("../models/disease");


const getDiseases = async () => {
    try {
        const diseases = await Disease.find();
        return diseases;
    } catch (error) {
        console.log(`Could not get diseases ${ error }`)
    }
}

const saveDisease = async (diseaseData) => {
    try {
        const disease = await Disease.create(diseaseData);
        return disease;
    } catch (error) {
        console.log(`Could not save disease ${ error }`)
    }
}

const updateDisease = async (disease_id, diseaseData) => {
    try {
        const disease = await Disease.findOneAndUpdate({ "_id": disease_id}, diseaseData, { new: true });
        return disease;
    } catch (error) {
        console.log(`Could not save disease ${ error }`)
    }
}

const deleteDisease = async (disease_id) => {
    try {
        const disease = await Disease.findOneAndDelete({ "_id": disease_id })
        return disease;
    } catch (error) {
        console.log(`Could not delete disease ${ error }`)
    }
}

module.exports = { 
    getDiseases,
    saveDisease,
    updateDisease,
    deleteDisease,
}