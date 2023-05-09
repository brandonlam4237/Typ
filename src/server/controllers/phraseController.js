const Phrase = require("../models/phrasesModel");
const asyncHandler = require("express-async-handler");

//this get's all phrases from our model and returns as json.
exports.getAllPhrases= asyncHandler(async (req, res, next) => {
    const phrases = await Phrase.findAll();
    return res.status(200).json(phrases);
});

