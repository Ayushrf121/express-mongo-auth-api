const { signup, login } = require("../Controllers/AuthController");
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");

// Allow to create the routes...
const router = require("express").Router();

router.post("/signup",signupValidation,signup);
router.post("/login",loginValidation,login);

module.exports = router;