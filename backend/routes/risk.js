const router = require("express").Router();
// const auth = require("../middlewares/auth");
const RiskControl = require("../controllers/risk");


router.get("/", RiskControl.apiGetRisks)

router.post("/", RiskControl.apiSaveRisk)

router.patch("/:risk_id", RiskControl.apiUpdateRisk);

router.delete("/:risk_id", RiskControl.apiDeleteRisk); // isDeleted: true ;)


module.exports = router;