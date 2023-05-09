const Phrase = require("../models/phrasesModel");
const Sequelize = require("../models/phrasesModel").sequelize;
const asyncHandler = require("express-async-handler");

async function createPhrase(content) {
    // NOTE: .build is not async
    const new_phrase = Phrase.build({ phrase: content });
    await new_phrase.save(function (err) {
        if (err) return console.log(err);
    });
    console.log("Added new Phrase to DB");
}

exports.populatePhrases = asyncHandler(async (req, res, next) => {
    var count = 5;
    const numberOfSentences = 50;
    const phraseBank = [];

    // Get X amount of phrases via fetch
    for (let i = 0; i < count; i++) {
        const url = await fetch(
            `http://metaphorpsum.com/sentences/${numberOfSentences}`
        )
            .then((response) => response.text())
            .then((text) => {
                phraseBank.push(text);
            })
            .catch((error) => console.error(error));
    }

    // Create new instances
    for (let j = 0; j < phraseBank.length; j++) {
        // Need to make sure phrase is not already in our database
        const phraseExists = await Phrase.findOne({
            where: { phrase: phraseBank[j] },
        });
        if (phraseExists === null) {
            console.log("Phrase not Found - Adding to Database");
            await createPhrase(phraseBank[j]);
        }
    }
    res.type("json").send(JSON.stringify(phraseBank, null, 2) + "\n");
});

//this get's all phrases from our model and returns as json.
exports.getAllPhrases = asyncHandler(async (req, res, next) => {
    const phrases = await Phrase.findAll();
    return res.status(200).json(phrases);
});

exports.getPhraseByID = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const phrase = await Phrase.findByPk(id);
    if (phrase == null) {
        res.send("Phrase not found or does not exist");
    }
    return res.status(200).json(phrase);
});

exports.getRandomPhrase = asyncHandler(async (req, res, next) => {
    /*
    const phrases = await Phrase.findAll();
    const rand_num = Math.floor(Math.random() * phrases.length) + 1;
    const rand_phrase = await Phrase.findByPk(rand_num);
    */

    // Won't have to worry about PKs with this method
    const rand_phrase = await Phrase.findOne({
        order: [Sequelize.random()],
    });

    return res.status(200).json(rand_phrase);
});

exports.deleteAllPhrases = asyncHandler(async (req, res, next) => {
    await Phrase.destroy({ where: {} });
    const phrases = await Phrase.findAll();
    return res.type("json").send(JSON.stringify(phrases, null, 2) + "\n");
});
