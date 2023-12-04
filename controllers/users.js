const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerUser = async(req,res)=>{
    const { name, email , password } = req.body

     const HashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        name, 
        email, 
        password:HashedPassword,
    })
    const token =  jwt.sign({id:user._id}, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
  const options = {
         MaxAge: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000 ),
        httpOnly:true,
        secure:true,
        sameSite:'none',

    }


    res.status(201).cookie("token", token , options
    ).json({
        success:true,
        user
    })
}

const userLogin =  async (req,res)=>{
    const  { email , password } = req.body

    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User doesn't exist"
        })
    }

    const matchPassword = await bcrypt.compare(password,user.password)

    if(!matchPassword){
        return res.status(400).json({
            success:false,
            message:"Password does not match"
        })
    }

    const token =  jwt.sign({id:user._id}, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })

    const options = {
        maxAge : new Date(Date.now() + 60 * 60 * 24 * 7 * 1000 ),
        httpOnly:true,
        secure:true,
        sameSite:'none',


    }

    res.status(200).cookie("token", token , options
    ).json({
        status:true,
        user
    })}

const logout = (req,res)=> {  
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" }).status(201).json({
            success: true,
            message: 'User has been logged out successfully'
        });
    };
    

const updateUser = async(req,res)=>{
    const { name,  email } = req.body
    const user = await User.findById(req.user.id)

    if(!user){
        return res.status(401).json({
            success:false,
            message:"Cannot find this user"
        })
    }
    const newUserData = { name:name, email:email}
    const updateUser = await User.findByIdAndUpdate(req.user.id, newUserData,{
         new:true,
         runValidator:true,
         useFindAndModify: false
     });

    res.status(200).json({
        success:true,
        updateUser
    })

}

const getUserDetail = async (req,res)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return res.status(401).json({
            success:false,
            message:"Invalid ID / User doesn't exist "
        })
    }

    res.status(200).json({
        success:true,
        user
    })

}
const deleteUser = async (req,res)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return res.status(401).json({
            success:false,
            message:"Invalid ID / User doesn't exist "
        })
    }

    await user.deleteOne()

    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })

}
const getAllUsers= async (req,res)=>{
    const user = await User.find()

    if(!user){
        return res.status(401).json({
            success:false,
            message:"User doesn't exist "
        })
    }

    res.status(200).json({
        success:true,
        user
    })

}

const getMyDetails = async(req,res)=>{
    const user = await User.findById(req.user._id)
    
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User doesn't exist "
        })
    }

    res.status(200).json(
        {
            success:true,
            user
        }
    )
}


module.exports = { registerUser , userLogin , logout ,updateUser,getUserDetail ,getAllUsers,deleteUser,getMyDetails }
