const User = require("../models/User")

const createUser =async (req,res)=>{
    const user = await User.create({...req.body })
    console.log(user)
    res.json({user})
}

const getUser = async(req, res)=>{
    try{
        const user= await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(error){
        res.json({message: error})
    }
}
const modifyUser = async(req, res)=>{
    try{
        if(req.user.isAdmin){
            const user= await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
            res.status(200).json(user);
        }else{
            res.json({msg: "unauthenticated"})
        }
    }catch(error){
        res.json({message: error})
    }
}
const getAllUsers = async(req, res)=>{
    try{
        const users= await User.find();
        res.status(200).json(users);
    }catch(error){
        res.json({message: error})
    }
}

module.exports = {createUser, getUser, getAllUsers, modifyUser}