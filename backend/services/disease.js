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

// const addOneRisk = async (disease_id, risk_id) => {
//     try {
//         const response = await Disease.findByIdAndUpdate({_id: disease_id}, { $addToSet: { risks: risk_id } });
//         return response
//     } catch (error) {
//         console.log(`Could not update disease ${ error }`)
//     }
// }

// const addOneSymptom = async (disease_id, symptom_id) => {
//     try {
//         const response = await Disease.findByIdAndUpdate({_id: disease_id}, { $addToSet: { symptoms: symptom_id } });
//         return response
//     } catch (error) {
//         console.log(`Could not update disease ${ error }`)
//     }
// }

// const deleteOneRisk = async (disease_id, risk_id) => {
//     try {
//         const disease = await Disease.findByIdAndUpdate({ "_id": disease_id },{ $pull: { risks: risk_id }})
//         return disease;
//     } catch (error) {
//         console.log(`Could not delete disease ${ error }`)
//     }
// }

// const deleteOneSymptom = async (disease_id, symptom_id) => {
//     try {
//         const disease = await Disease.findByIdAndUpdate({ "_id": disease_id },{ $pull: { symptoms: symptom_id }})
//         return disease;
//     } catch (error) {
//         console.log(`Could not delete disease ${ error }`)
//     }
// }


module.exports = { 
    getDiseases,
    saveDisease,
    updateDisease,
    deleteDisease,
    // addOneRisk,
    // addOneSymptom,
    // deleteOneRisk,
    // deleteOneSymptom,
}