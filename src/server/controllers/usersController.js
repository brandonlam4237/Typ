const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken')


//this get's all phrases from our model and returns as json.
exports.getAllUsers = asyncHandler( async (req, res, next) => {
    
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
        //Username and email are available
        else{
            try{
                //Encrypt password
                const encryptedPW = await bcrypt.hash(password, 10);

                const date = new Date(); //Today's date
                //Add user to DB.
                const newUser = await Users.create({
                    username: username, 
                    password: encryptedPW, 
                    email: email, 
                    creationdate: date
                })
                console.log(`User created with user id: ${newUser.user_id}`); 

            }
            catch(error){
                res.status(500).send(error)
            }
        }
})


exports.authUser = asyncHandler(async (req,res,next) =>{
    const user = await Users.findOne({where: {email: req.body.email}})
    if(user == null){return res.status(400).send('Cannot find user')}
    else{
        try{

            if(await bcrypt.compare(req.body.password, user.password)){
                jwt.sign({user}, "random",(err,authToken)=>{
                    res.json({
                        status: "success",
                        authToken: authToken,
                        user
                        
                    })
                })  
            }
            else{ res.json({ status: "failed"})};
        
        }catch{
            res.status(500).send('Login Failed');
        }
    }
})

exports.verifyToken = function(req,res,next){
    const authHeader = req.headers['authorization'];
    console.log(req)
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "random", (err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

    
}