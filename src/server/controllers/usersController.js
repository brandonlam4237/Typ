const Phrase = require("../models/usersModel");
const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");
const { json } = require("sequelize");

//this get's all phrases from our model and returns as json.
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await Users.findAll();
    return res.status(200).json(users);
});


exports.getUserByID = asyncHandler(async (req,res, next)=>{
    const id = parseInt(req.params.id);
    const user = await Users.findByPk(id);
    if (user == null){
        res.send("User not found or does not exist");
    }
    return res.status(200).json(user);
});

exports.addUser = asyncHandler(async (req,res, next)=>{
    const {username, password, email, creationdate} = req.body;
    //First check if the username or email is taken.
    const found_username = await Users.findOne({where: {username:username}});
    const found_email = await Users.findOne({where: {email:email}});

    if (found_username != null || found_email != null){res.send("Username or password is already in use")}
    else{
        const date = new Date();
        const newUser = await Users.create({
            username: username, 
            password: password, 
            email: email, 
            creationdate: date
        })
        console.log(`User created with user id: ${newUser.user_id}`);   
    }
})