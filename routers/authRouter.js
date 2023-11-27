const { Router } = require("express");
const router = Router();
const authController = require('../controllers/authController')
const { checkSchema } = require("express-validator");
const userRegisterValidation = require('../validations/userRegisterValidation');
const userLoginValidation = require('../validations/userLoginValidation');
const { checkValidity } = require("../middlewares/schemaValidator");

router.post("/register", checkSchema(userRegisterValidation), checkValidity, authController.register)
router.post('/login', checkSchema(userLoginValidation), checkValidity, authController.login)

module.exports = router