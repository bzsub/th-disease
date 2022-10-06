const router = require("express").Router();
const SymptomControl = require("../controllers/symptom");
const auth = require("../middlewares/auth");


router.get("/", auth({ block: false }), SymptomControl.apiGetSymptoms)

router.post("/", auth({ block: true }), SymptomControl.apiSaveSymptom)

router.patch("/:symptom_id", auth({ block: true }), SymptomControl.apiUpdateSymptom);

router.delete("/:symptom_id", auth({ block: true }), SymptomControl.apiDeleteSymptom);


module.exports = router;