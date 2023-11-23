const jwt = require('jsonwebtoken')
const user = require('../models/user')

const isAuthenticated = async(req,res,next)=>{
  const { token } = req.cookies;
  if(!token){
    return res.status(401).json({
        success:false,
        message:"Please login to access this resource"
    })
  }
    try {
      const decode = jwt.verify(token , process.env.SECRET_KEY)
      req.user = await user.findById(decode.id)
    } catch (error) {
      return res.status(400).json({
        success:false,
        message:error
      })
    }
    next()
}

const isAdmin  = async (req,res,next)=>{
  if( req.user.isAdmin === "admin"){
    next()
  }
  else {
    return res.status(400).json({
      success:false,
      message:"Only Admin is allowed to acccess this resource"
    })
  }
  
}

module.exports = {isAuthenticated ,isAdmin }