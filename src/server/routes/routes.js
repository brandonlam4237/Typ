const express = require("express");
const router = express.Router();

// Require Controller Mondules
const phrase_controller = require("../controllers/phraseController");
const users_controller = require("../controllers/usersController");

// Home Page
router.get("/", function (req, res) {
    res.send("HOME PAGE");
});

// USER ROUTES
//router.get("/users", controller.getUsers);

// PHRASE ROUTES
//router.get("/phrases", controller.getPhrases);

//GET for all phrases.
router.get("/phrases", phrase_controller.getAllPhrases);
router.get("/phrases/:id", phrase_controller.getPhraseByID);

router.get("/users", users_controller.getAllUsers);
router.get("/users/:id", users_controller.getUserByID);

module.exports = router;
