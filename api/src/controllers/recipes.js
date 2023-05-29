require('dotenv').config();
const axios = require("axios");
const {Recipe, Diets} = require("../db");
const {Sequelize} = require("sequelize");
const {API_KEY} = process.env;

const getApiInfo = async function(){
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    
    const apiInfo = await apiUrl.data.results.map(el=>{
        return {
            id: el.id,
            title: el.title,
            summary: el.summary,
            diets: el.diets.map(d=>{return {name: d}}),
            healthScore: el.healthScore,
            image: el.image,
            instructions: el.analyzedInstructions
        }
    })
    return apiInfo;
}

const getDBInfo = async function(){
    return await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['title'],
            through: {
                attributes:[],
            }
        }
    })
}

const getAllRecipes= async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();

    const allRecipes = apiInfo.concat(dbInfo);
    return allRecipes;
}

async function getRecipesByName(req, res) {
    const { name } = req.query;                         
    if (!name) {                                       
      try {
        const recipeApiInfo = await getApiInfo()       
        const recipeBD = await Recipe.findAll({         
          include: {
            model: Diets,                             
            attributes: ["title"],                      
            through: {
              attributes: [],
            },
          },
        });
        const recipes = await Promise.all(recipeBD.concat(recipeApiInfo))
        return res.send(recipes)
      } catch(err) {
        res.json({err})
        console.error(err);
    }
    } else {                                     
      const query = name.toLowerCase();       
      try {
        const recipeApiInfo = await getApiInfo()
        const recipeApi = recipeApiInfo.filter((r) =>{
          if(r.title.toLowerCase().includes(query)){     
            return r                                   
          }
         } 
        );
  
        const recipeBD = await Recipe.findAll({      
          where: {
            title:{[Sequelize.Op.like]:`%${query}%`}  
          },                  
          include : {
            model : TypeDiet,
            attributes : ['title'],               
            through: {
                attributes:[]
            }
        },
        });
  
        const respuesta = await Promise.all(recipeBD.concat(recipeApi))
        if(respuesta.length===0) res.status(404).send('No se encontraron recetas')
        else res.status(200).send(respuesta)
      } catch (err) {
        console.error(err);
      }
    }
  }
  module.exports= {
    getAllRecipes,
    getDBInfo,
    getApiInfo,
    getRecipesByName
}