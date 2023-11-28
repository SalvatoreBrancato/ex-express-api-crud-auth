const express = require ('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authHandler = require('../middlewares/authHandler')


router.post('/post', postsController.create)//ho tolto autHeandler dalla rotta per accede con vue senza login
router.get('/post', postsController.showAll)
//filtrare per:
// Post pubblicati.
// Post che contengono una determinata parola nel titolo o nel contenuto.
router.get('/post/:slug', postsController.show)
router.put('/post/:slug', postsController.update)
router.delete('/post/:slug', authHandler, postsController.destroy)




module.exports = router