const router = require("express").Router();
// const auth = require("../middlewares/auth");
const SymptomControl = require("../controllers/symptom");


router.get("/", SymptomControl.apiGetSymptoms)

router.post("/", SymptomControl.apiSaveSymptom)

router.patch("/:symptom_id", SymptomControl.apiUpdateSymptom);

router.delete("/:symptom_id", SymptomControl.apiDeleteSymptom); // isDeleted: true ;)


module.exports = router;