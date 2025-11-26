const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {

    try {
        // Eemaldatud: imageURL
        const recipeQuery = 'SELECT id, recipeName, instructions FROM recipe ORDER BY RANDOM() LIMIT 1;';
        const recipeResult = await db.query(recipeQuery);
        const selectedRecipe = recipeResult.rows[0];
        
        // Kontrollime, et retsepti ID oleks olemas, enne kui koostisosi küsime
        if (!selectedRecipe) {
            return res.status(404).json({ errorMessage: 'No recipes found.' });
        }
        
        // Jätame koostisosade päringu samaks
        const ingredientsQuery = 'SELECT b.ingredientName FROM ingredient b INNER JOIN IngredientInRecipe c ON b.id = c.ingredientId WHERE c.recipeId = $1;';

        const ingredientsResult = await db.query(ingredientsQuery, [selectedRecipe.id]);  
        const ingredients = ingredientsResult.rows.map( element => element.ingredientname);
        
        const randomRecipe = {
            // selectedRecipe objektis on nüüd ainult id, recipeName ja instructions
            recipe: selectedRecipe,
            ingredients: ingredients
        };
        res.json(randomRecipe);

    }
    catch(error) {
        console.error("Database or Server Error:", error); // Kasutame console.error
        res.status(500).json({errorMessage: 'Internal Server error.'});
    }
});

module.exports = router;