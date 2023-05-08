const express = require("express");
const router = express.Router();

// Require Controller Mondules
const phrase_controller = require("../controllers/phraseController");

// Home Page
router.get("/", function (req, res) {
    res.send("HOME PAGE");
});

// USER ROUTES
//router.get("/users", controller.getUsers);

// PHRASE ROUTES
//router.get("/phrases", controller.getPhrases);
router.get("/phrases", phrase_controller.phrase_list);

module.exports = router;
