const express = require("express");
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } = require("../controller/recipe");
const verifyToken = require("../middleware/auth");
const router = express.Router();

// create route for home page
// It is used to get all the recipes
router.get("/", getRecipes);

// Route for getting recipes by id
router.get("/:id", getRecipe);

// Route for adding recipes
router.post("/", upload.single("file"), verifyToken, addRecipe);

// Route for updating recipes
router.put("/:id", upload.single("file"), editRecipe);

// Route for deleting recipes
router.delete("/:id", deleteRecipe);

module.exports = router;
