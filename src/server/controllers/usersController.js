const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stats_controller = require("../controllers/statsController");

//this get's all phrases from our model and returns as json.
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await Users.findAll();
    return res.status(200).json(users);
});

exports.getUserByID = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    console.log(id);
    console.log(req.user.user_id);
    if (id !== req.user.user_id) {
        return res.status(403).json({
          status: 'Error',
          message: 'Forbidden from getUserByid',
        });
    }    
    const user = await Users.findByPk(id);
    if (user == null) {
        res.status(404).send("User not found or does not exist");
    }
    return res.status(200).json(user);
});

exports.addUser = asyncHandler(async (req, res, next) => {
    const { username, password, email} = req.body;

    // Form Validation
    if (!username || !email || !password) {
        return res.status(400).json({
            status: "Error",
            message: "Form Fields Cannot Be Empty",
        });
    }

    //First check if the username or email is taken.
    const found_username = await Users.findOne({
        where: { username: username },
    });

    const found_email = await Users.findOne({ where: { email: email } });   
    if (found_username != null) {
        return res.status(400).json({
            status: "Error",
            message: "Username already in use",
        });
    }

    if (found_email != null) {
        return res.status(400).json({
            status: "Error",
            message: "Email already in use",
        });
    }

    // Username and email are available
    else {
        //Encrypt password
        const encryptedPW = await bcrypt.hash(password, 10);

        const date = new Date(); //Today's date
        //Add user to DB.
        const newUser = await Users.create({
            username: username,
            password: encryptedPW,
            email: email,
            creationdate: date,
            role: 'basic'
        });
        console.log(`User created with user id: ${newUser.user_id}`);
        console.log(newUser)
        stats = stats_controller.initStats(newUser.user_id, newUser.username);
        console.log("Stats initiated");
        console.log(stats);
        return res
            .status(200)
            .json({
                status: "Success",
                message: "Account Created Successfully",
            })
            .send(`User created with id:${newUser.user_id}`);
    }
});


exports.authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validating Empty Form
    if (!email || !password) {
        return res.status(400).json({
            status: "Error",
            message: "email and password fields cannot be empty",
        });
    }

    const user = await Users.findOne({ where: { email: req.body.email } });

    if (!user) {
        console.log("Err Invalid Login");
        return res.status(400).json({
            status: "Error",
            message: "Invalid Email",
        });
    } else {
        if (await bcrypt.compare(req.body.password, user.password)) {
            jwt.sign({ user:user }, "random", (err, authToken) => {
                res.json({
                    status: "successful login",
                    authToken: authToken,
                    user:user,

                });
            });
        } else {
            return res.status(400).json({
                status: "Error",
                message: "Invalid Password",
            });
        }
    }
});

exports.verifyToken = function (req, res, next) {
    const authHeader = req.headers["authorization"];
    //console.log(req)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
          status: 'Error',
          message: 'Unauthorized',
        });
      }

      try {
        // Verify the token
        const decodedToken = jwt.verify(token, 'random');
        // Store the user ID from the token in the request object
        req.user = decodedToken.user;
    
        next();
      } catch (error) {
        return res.status(403).json({
          status: 'Error',
          message: 'Forbidden from verify',
        });
      }
};

