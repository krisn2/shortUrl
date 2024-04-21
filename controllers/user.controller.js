const {v4 : uuidv4} = require ('uuid')
const { setUser }= require  ("../services/auth.services")
const User = require ("../model/user.model");
const { seed } = require('shortid');

async function handleUserSignup(req,res){
    const {name , email ,password}=req.body;

    await User.create({
        name,
        email,
        password,
    })
    return res.redirect("/")
}

async function handleUserLogin(req,res){
    const {email ,password}=req.body;

   const user= await User.findOne({email, password})

    if(!user)
        return res.render("login",{
            error : "Invalid Crediantials "
    })

    // const sessionID = uuidv4();
    // setUser(sessionID, user);

    
    const token = setUser(user)
    // res.cookie("uid", token)
    return res.json(token)
    return res.redirect("/")
}

module.exports ={
    handleUserSignup,
    handleUserLogin
}