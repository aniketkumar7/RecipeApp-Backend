// Backend/routes/recipeRoutes.js
const express = require("express");
const {
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    deleteRecipe
} = require("../controller/recipe");
const { upload } = require("../config/cloudinary");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", upload.single("file"), verifyToken, addRecipe);
router.put("/:id", upload.single("file"), verifyToken, editRecipe);
router.delete("/:id", verifyToken, deleteRecipe);

module.exports = router;
