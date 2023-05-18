const express = require("express");
const router = express.Router();

// Require Controller Mondules
const phrase_controller = require("../controllers/phraseController");
const users_controller = require("../controllers/usersController");
const stats_controller = require("../controllers/statsController");

//GET Endpoints for phrases
router.get("/phrases", phrase_controller.getAllPhrases);
router.post("/phrases/populate", users_controller.verifyToken, phrase_controller.populatePhrases); //Admin Only
router.get("/phrases/random", phrase_controller.getRandomPhrase);
router.delete("/phrases/delete/all", users_controller.verifyToken, phrase_controller.deleteAllPhrases); 
router.delete("/phrases/:id",users_controller.verifyToken ,phrase_controller.deletePhraseByID);
router.get("/phrases/:id", phrase_controller.getPhraseByID);

//GET Endpoints for users.
router.get("/users",users_controller.verifyToken,users_controller.getAllUsers); //Protect user sensitive information 
router.get("/users/:id", users_controller.verifyToken, users_controller.getUserByID); //Same as above

//GET Endpoints for stats.
router.get("/stats", stats_controller.getAllStats);
router.get("/stats/:id",stats_controller.getStatsByUserID);



//PUT
//Update stats for specific users.
router.put("/stats/:id",users_controller.verifyToken,stats_controller.updateUserStats);

//POST for users
router.post("/users", users_controller.addUser);  
router.post("/users/login", users_controller.authUser);

module.exports = router;
