const router = require("express").Router();
const RiskControl = require("../controllers/risk");


router.get("/", RiskControl.apiGetRisks)

router.post("/", RiskControl.apiSaveRisk)

router.patch("/:risk_id", RiskControl.apiUpdateRisk);

router.delete("/:risk_id", RiskControl.apiDeleteRisk);


module.exports = router;