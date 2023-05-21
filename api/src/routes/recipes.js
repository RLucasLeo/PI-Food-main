const {Router} = require("express");
const router = Router();
require('dotenv').config();
const axios = require("axios");
const { getAllRecipes, getRecipesByName } = require("../controllers/recipes");
const {Recipe, Diets} = require("../db");

router.get('/', getRecipesByName)

router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    const allRecipes = await getAllRecipes();
    let validate = id.includes("-")//esta en bd

    if(validate){
        try {
            let dbId= await Recipe.findByPk(id, {include: Diets})
            res.status(200).json([dbId]);
        } catch (error) {
            console.log(error)
        }
    }

    else {
        try {
            if(id){
                let recipeId = await allRecipes.filter((el)=>el.id===parseInt(id));
                recipeId.length ? 
                res.status(200).send(recipeId) : res.status(400).send("No encontrado");
            }
        } catch (error) {
            res.json({message: err})
        }
    }
})

module.exports=router;
