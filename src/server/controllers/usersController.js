const Phrase = require("../models/usersModel");
const asyncHandler = require("express-async-handler");

//this get's all phrases from our model and returns as json.
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await Phrase.findAll();
    return res.status(200).json(users);
});