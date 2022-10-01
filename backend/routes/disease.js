const router = require("express").Router();
// const auth = require("../middlewares/auth");
const DiseaseControl = require("../controllers/disease");


router.get("/", DiseaseControl.apiGetDiseases)

router.post("/", DiseaseControl.apiSaveDisease)

router.patch("/:disease_id", DiseaseControl.apiUpdateDisease);

router.delete("/:disease_id", DiseaseControl.apiDeleteDisease); // isDeleted: true ;)


module.exports = router;