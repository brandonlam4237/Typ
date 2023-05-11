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
router.get("/users",users_controller.verifyToken,users_controller.getAllUsers); // This enpoints also contains stats so it needs to be protected
router.get("/users/:id", users_controller.verifyTokenUserSpecific, users_controller.getUserByID); 

//POST for users
router.post("/users", users_controller.addUser);  
router.post("/users/login", users_controller.authUser);

module.exports = router;
