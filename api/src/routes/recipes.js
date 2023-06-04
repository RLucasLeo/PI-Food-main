const {Router} = require("express");
const router = Router();
require('dotenv').config();
const axios = require("axios");
const { getAllRecipes, getRecipesByName } = require("../controllers/recipes");
const {Recipe, Diets} = require("../db");
const { Op } = require('sequelize');

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

router.post('/', async (req, res, next)=>{
    let {
        title,
        image,
        summary,
        healthScore,
        instructions,
        typeDiets,
    } = req.body;
    if(!title || !summary){
        return res.status(400).send("Ingrese titulo y resumen para continuar!");
    }else{
        try { let createRecipe = await Recipe.create({
            title,
            image,
            summary,
            healthScore,
            instructions,
            typeDiets,
        })
        let dietDb = await Diets.findAll({where: { name: { [Op.in]: typeDiets } } });
            createRecipe.addDiets(dietDb)
            res.status(200).send('Receta creada')
            
        } catch (error) {
            next(error)
        }
    }
})

router.delete('/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        let recipe = await Recipe.findByPk(id)
        await recipe.destroy()
        res.status(200).send('Receta borrada')
    } catch (error) {
        res.status(400).send('Receta no encontrada')
    }
})
module.exports=router;
