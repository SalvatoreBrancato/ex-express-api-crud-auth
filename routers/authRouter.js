const { Router } = require("express");
const router = Router();
const authController = require('../controllers/authController')
const { checkSchema } = require("express-validator");

router.post("/register", authController.register)

module.exports = router