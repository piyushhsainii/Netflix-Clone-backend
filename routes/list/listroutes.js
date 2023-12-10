const express= require('express')
const { createList, deleteList, getList, updateList, deleteListElement } = require('../../controllers/list')
const router = express.Router()
const { isAuthenticated ,isAdmin } = require('../../middleware/authenticate')



router.post('/createList', isAuthenticated , isAdmin ,  createList )
router.delete('/deleteList/:id', isAuthenticated , isAdmin ,  deleteList )
router.get('/getList', isAuthenticated , getList )
router.put('/CreateandUpdateMyList', isAuthenticated , updateList )
router.put('/deleteElementMyList', isAuthenticated , deleteListElement )
 


module.exports = router