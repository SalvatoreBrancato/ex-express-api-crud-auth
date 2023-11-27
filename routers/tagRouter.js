const express = require ('express');
const router = express.Router();
const tagsController = require('../controllers/tagsController')


router.post('/create', tagsController.create)
router.put('/update/:id', tagsController.update)
router.delete('/destroy/:id', tagsController.destroy )

module.exports = router