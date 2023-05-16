const express = require("express");
const router = express.Router();

// Require Controller Mondules
const phrase_controller = require("../controllers/phraseController");
const users_controller = require("../controllers/usersController");
const stats_controller = require("../controllers/statsController");

//GET Endpoints for phrases
router.get("/phrases", phrase_controller.getAllPhrases);
router.get("/phrases/populate", phrase_controller.populatePhrases);
router.get("/phrases/random", phrase_controller.getRandomPhrase);
router.get("/phrases/delete/all", phrase_controller.deleteAllPhrases);
router.get("/phrases/:id", phrase_controller.getPhraseByID);

//GET Endpoints for users.
router.get("/users",users_controller.verifyToken,users_controller.getAllUsers); // This enpoints also contains stats so it needs to be protected
router.get("/users/:id", users_controller.verifyToken, users_controller.getUserByID); 

//GET Endpoints for stats.
router.get("/stats", stats_controller.getAllStats);
router.get("/stats/:id",stats_controller.getStatsByUserID);



//PUT
//router.put("/stats/:id", stats_controller.updateUserStat);
router.put("/stats/:id",users_controller.verifyToken,stats_controller.updateUserStats);

//POST for users
router.post("/users", users_controller.addUser);  
router.post("/users/login", users_controller.authUser);

module.exports = router;
