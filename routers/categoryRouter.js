const express = require ('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');


router.post('/create', categoriesController.create)
router.put('/update/:id', categoriesController.update)
router.delete('/destroy/:id', categoriesController.destroy )



module.exports = router