const { Router } = require("express");
const router = Router();
const authController = require('../controllers/authController')
const { checkSchema } = require("express-validator");

router.post("/register", authController.register)
router.post('/login', authController.login)

module.exports = router