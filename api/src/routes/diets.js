const { Router } = require('express');
const router = Router();
const {Diets} = require('../db');
const {allDiets} = require('../controllers/diets')

router.get('/', async (req,res) => {
        allDiets.forEach(e => {
            Diets.findOrCreate({
                where: {name:e.name}
            })
        })

         const allTheTypes = await Diets.findAll();
        res.send(allTheTypes.map(e => e.name))
})

module.exports= router;