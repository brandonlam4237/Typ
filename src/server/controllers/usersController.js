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
    const user = await Users.findByPk(id);
    if (user == null) {
        res.send("User not found or does not exist");
    }
    return res.status(200).json(user);
});

exports.addUser = asyncHandler(async (req, res, next) => {
    const { username, password, email, creationdate } = req.body;

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
        });
        console.log(`User created with user id: ${newUser.user_id}`);
        stats = stats_controller.initStats(newUser.user_id);
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

/*
exports.authUser = asyncHandler(async (req, res, next) => {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
        console.log("Err Invalid Login");
        return res.status(400).json({
            status: "Error",
            message: "Invalid Email or Password",
        });
    } else {
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                jwt.sign({ user }, "random", (err, authToken) => {
                    res.json({
                        status: "success",
                        authToken: authToken,
                        user,
                    });
                });
            } else {
                res.json({ status: "failed with incorrect password" });
            }
        } catch {
            res.status(400).send("Login Failed");
        }
    }
});
*/

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
            jwt.sign({ user }, "random", (err, authToken) => {
                res.json({
                    status: "successful login",
                    authToken: authToken,
                    user,
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

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "random", (err, user) => {
        if (err) return res.sendStatus(403);
        //console.log(user['user']['user_id'])
        req.user = user;
        next();
    });
};
exports.verifyTokenUserSpecific = function (req, res, next) {
    const authHeader = req.headers["authorization"];
    //console.log(req)
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    const id = parseInt(req.params.id);

    jwt.verify(token, "random", (err, user) => {
        if (err || user["user"]["user_id"] != id) return res.sendStatus(403);

        req.user = user;
        next();
    });
};
