const allDiets = async function(){
    const dietList = await axios.get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
    const repeated = await dietList.data.results.map( d => d.diets).flat(1);
    return [... new Set(repeated)]
};
module.exports = { 
   allDiets
};