const { registerUser, userLogin, logout, updateUser, getUserDetail, 
    getAllUsers, deleteUser,
    getMyDetails
} = require('../../controllers/users')
const { isAuthenticated } = require('../../middleware/authenticate')
const router = require('express').Router()
 

router.post('/register',registerUser)   // register user
router.post('/login',userLogin)   // login user
router.get('/logout',isAuthenticated,logout )   // login user
router.put('/updateUser',isAuthenticated,updateUser )   // login user 
router.get('/getMyDetails',isAuthenticated,getMyDetails)
router.get('/getUserDetails/:id',isAuthenticated,getUserDetail )   // get User Details
router.delete('/deleteUser/:id',isAuthenticated,deleteUser )   // get User Details
router.get('/getAllUsers',isAuthenticated,getAllUsers )   // get User Details



module.exports = router