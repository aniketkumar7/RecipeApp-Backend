const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    time: {
        type: String,
    },
    coverImage: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

// export model
// model method in mongoose is used to create a model
// we pass the name of the model and the schema
// Recipes is table name
module.exports = mongoose.model("Recipes", recipeSchema)
