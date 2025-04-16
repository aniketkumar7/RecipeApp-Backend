// Backend\controller\recipe.js
const Recipes = require("../models/recipe");
const { upload, cloudinary } = require("../config/cloudinary");


// create getRecipes function to get recipes
const getRecipes = async (req, res) => {
  const recipes = await Recipes.find();
  return res.json(recipes);
};

// create getRecipe function to get recipe by id
const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  res.json(recipe);
};

const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file.path, // Cloudinary returns the URL in req.file.path
      createdBy: req.user.id,
    });

    return res.json(newRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error);
    return res.status(500).json({ message: "Error adding recipe" });
  }
};

const editRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;
    let recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    let coverImage = recipe.coverImage;

    if (req.file) {
      // If there's a new image, update coverImage
      coverImage = req.file.path;

      // Delete old image from Cloudinary if it exists
      if (recipe.coverImage) {
        const publicId = recipe.coverImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy('recipes/' + publicId);
      }
    }

    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      {
        title,
        ingredients,
        instructions,
        time,
        coverImage
      },
      { new: true }
    );

    res.json(updatedRecipe);
  } catch (err) {
    console.error('Error updating recipe:', err);
    return res.status(500).json({ message: "Error updating recipe" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Delete image from Cloudinary if it exists
    if (recipe.coverImage) {
      const publicId = recipe.coverImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy('recipes/' + publicId);
    }

    await Recipes.deleteOne({ _id: req.params.id });
    res.json({ status: "ok" });
  } catch (err) {
    console.error('Error deleting recipe:', err);
    return res.status(500).json({ message: "Error deleting recipe" });
  }
};
// export getRecipes function
module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload };
