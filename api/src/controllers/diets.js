const axios = require("axios");
require("dotenv").config();
const { Diets } = require("../db");
const {API_KEY} = process.env;

const allDiets = async (req, res) => {
    const dietsDB = []
    const dietsAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
    console.log(dietsAPI)
    const arrayDiets = dietsAPI.results.map(recipe => recipe.diets)
    for (let i = 0; i < arrayDiets.length; i++) {
      for (let j=0; j<arrayDiets[i].length; j++){
        if(!dietsDB.includes(arrayDiets[i][j])){
          dietsDB.push(arrayDiets[i][j])
        }
      }
    }
    await Diets.bulkCreate(dietsDB.map(diet=>{
      return {
        title: diet
      }
    }), {ingoreDuplicates: true})
    console.log('DB CARGADA')
};

const DietsInDb = async () => {
    const dietsFromApi = await Diets.findAll()
    return dietsFromApi;
  };
  
  
  module.exports = {
    DietsInDb,
    allDiets,
  };