const Phrase = require("../models/phrasesModel");
const asyncHandler = require("express-async-handler");

//this get's all phrases from our model and returns as json.
exports.getAllPhrases= asyncHandler(async (req, res, next) => {
    const phrases = await Phrase.findAll();
    return res.status(200).json(phrases);
});

exports.getPhraseByID = asyncHandler(async (req,res, next)=>{
    const id = parseInt(req.params.id);
    const phrase = await Phrase.findByPk(id);
    if (phrase == null){
        res.send("Phrase not found or does not exist");
    }
    return res.status(200).json(phrase);
});

exports.getRandomPhrase = asyncHandler(async (req, res, next)=>{
    const phrases = await Phrase.findAll();
    const rand_num = Math.floor(Math.random()* phrases.length)+1;
    console.log(rand_num);
    const rand_phrase = await Phrase.findByPk(rand_num);
    return res.status(200).json(rand_phrase);
});

