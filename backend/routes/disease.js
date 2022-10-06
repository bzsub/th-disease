const router = require("express").Router();
const DiseaseControl = require("../controllers/disease");
const auth = require("../middlewares/auth");


router.get("/", auth({ block: false }), DiseaseControl.apiGetDiseases)

router.post("/", auth({ block: true }), DiseaseControl.apiSaveDisease)

router.patch("/:disease_id", auth({ block: true }), DiseaseControl.apiUpdateDisease);

router.delete("/:disease_id", auth({ block: true }), DiseaseControl.apiDeleteDisease);


module.exports = router;