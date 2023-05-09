const express = require("express");
const router = express.Router();

// Require Controller Mondules
const phrase_controller = require("../controllers/phraseController");
const users_controller = require("../controllers/usersController");

//GET Endpoints for phrases
router.get("/phrases", phrase_controller.getAllPhrases);
router.get("/phrases/populate", phrase_controller.populatePhrases);
router.get("/phrases/random", phrase_controller.getRandomPhrase);
router.get("/phrases/delete/all", phrase_controller.deleteAllPhrases);
router.get("/phrases/:id", phrase_controller.getPhraseByID);

//GET Endpoints for users.
router.get("/users", users_controller.getAllUsers);
router.get("/users/:id", users_controller.getUserByID);

module.exports = router;
