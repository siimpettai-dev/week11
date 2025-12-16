// server.js

const express = require('express');
const cors = require('cors'); // ✨ 1. Impordi CORS
const recipeRouter = require('./routes/recipes.routes');
const ingredientRouter = require('./routes/ingredients.routes');
const fullRecipesRouter = require('./routes/fullRecipes.routes');
const randomRouter = require('./routes/randomRecipe.routes');
const app = express();

// ✨ 2. Kasuta CORS-i middleware'i
// See peab olema enne teiste marsruutide kasutamist!
app.use(cors()); 

app.use(express.json());

app.use('/ingredients', ingredientRouter);
app.use('/recipes', recipeRouter);
app.use('/fullRecipes', fullRecipesRouter);
app.use('/random', randomRouter);

app.listen(3000, () => {
    console.log('Server is running on Port 3000.');
});