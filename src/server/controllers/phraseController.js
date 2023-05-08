const Phrase = require("../models/phrase");
const asyncHandler = require("express-async-handler");

exports.phrase_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED YET : Lists all phrases");
});
