require('dotenv').config();
const {API_KEY}=process.env;
const axios = require('axios');
const {Recipe, Diets} = require_("../db");

const apiData = async function(){
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/compexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
    const apiInfo = await apiUrl.data.results.map(el=>{
        return {
            id: el.id,
            title: el.title,
            summary: el.summary,
            diets: el.diets.map(d=>{return {name: d}}),
            healthScore: el.healthScore,
            image: el.image,
            instructions: el.analyzedInstructions[0]?.steps.map(pasos=>{
                return `<b>${pasos.number}</b> ${paso.step} `
            })
        }
    })
    return apiInfo;
}

const bdData = async function(){
    return await Recipe.findALL({
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes:[],
            }
        }
    })
}

const allData = async function(){
    const allApiData = await apiData();
    const allBdData = await bdData();

    const allDataContainer = allApiData.concat(allBdData);
    return allDataContainer;
}

const allDiets = async function(){
    const dietList = await axios.get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
    const repeated = await dietList.data.results.map( d => d.diets).flat(1);
    return [... new Set(repeated)]
};

module.exports = {
    allData,
    allDiets,
    bdData,
    apiData
}