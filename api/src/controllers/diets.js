const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { Diets } = require("../db");

const DietsInDb = async () => {
    const dietsFromApi = [
      "vegetarian",
      "gluten free",
      "dairy free",
      "lacto ovo vegetarian",
      "vegan",
      "paleolithic",
      "primal",
      "whole 30",
      "pescatarian",
      "ketogenic",
      "fodmap friendly",
    ];
    const diets = await Diets.findAll();
    if (diets.length === 0) {
      dietsFromApi.forEach(async (el) => {
        await Diets.create({
          id: uuidv4(),
          title: el,
        });
      });
    }
    return dietsFromApi;
  };
  
  const allDiets = async (req, res) => {
    const allDiet = await DietsInDb(); // await Diet.findAll()
    res.json(allDiet);
  
  };
  
  module.exports = {
    DietsInDb,
    allDiets,
  };