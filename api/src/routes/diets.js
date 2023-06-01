const { Router } = require('express');
const router = Router();
const {Diets} = require('../db');
const {allDiets, DietsInDb} = require('../controllers/diets')
const { Op } = require('sequelize');

router.get('/', async (req,res)=>{
    try {
        const diets = await DietsInDb()
        res.status(200).json(diets)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports= router;