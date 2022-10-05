const router = require("express").Router();
const AuthControl = require("../controllers/auth");


router.post("/login", AuthControl.apiLogin)

router.post("/signUp", AuthControl.apiSignUp)


module.exports = router;