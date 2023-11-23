const express= require('express')
const { createList, deleteList, getList } = require('../../controllers/list')
const router = express.Router()
const { isAuthenticated ,isAdmin } = require('../../middleware/authenticate')



router.post('/createList', isAuthenticated , isAdmin ,  createList )
router.delete('/deleteList/:id', isAuthenticated , isAdmin ,  deleteList )
router.get('/getList', isAuthenticated , isAdmin ,  getList )



module.exports = router