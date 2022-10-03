const router = require("express").Router();
const DiseaseControl = require("../controllers/disease");


//this contains all the risks and symptoms
router.get("/", DiseaseControl.apiGetDiseases)

router.post("/", DiseaseControl.apiSaveDisease)

router.patch("/:disease_id", DiseaseControl.apiUpdateDisease);

router.delete("/:disease_id", DiseaseControl.apiDeleteDisease);


// router.get("/:disease_id", DiseaseControl.apiGetOneDisease)
// router.patch("/:disease_id/risks/:risk_id", DiseaseControl.apiAddOneRisk);
// router.patch("/:disease_id/symptoms/:symptom_id", DiseaseControl.apiAddOneSymptom);
// router.delete("/:disease_id/risks/:risk_id", DiseaseControl.apiDeleteOneRisk);
// router.delete("/:disease_id/symptoms/:symptom_id", DiseaseControl.apiDeleteOneSymptom);


module.exports = router;