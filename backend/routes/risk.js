const router = require("express").Router();
const RiskControl = require("../controllers/risk");
const auth = require("../middlewares/auth");


router.get("/", auth({ block: false }), RiskControl.apiGetRisks)

router.post("/", auth({ block: true }), RiskControl.apiSaveRisk)

router.patch("/:risk_id", auth({ block: true }), RiskControl.apiUpdateRisk);

router.delete("/:risk_id", auth({ block: true }), RiskControl.apiDeleteRisk);


module.exports = router;