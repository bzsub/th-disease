const router = require("express").Router();
const SymptomControl = require("../controllers/symptom");


router.get("/", SymptomControl.apiGetSymptoms)

router.post("/", SymptomControl.apiSaveSymptom)

router.patch("/:symptom_id", SymptomControl.apiUpdateSymptom);

router.delete("/:symptom_id", SymptomControl.apiDeleteSymptom);


module.exports = router;