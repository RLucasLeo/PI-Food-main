const { Router } = require('express');
const router = Router();
const {Diets} = require('../db');
const {allDiets} = require('../controllers/diets')
const { Op } = require('sequelize');

router.get('/', allDiets)

module.exports= router;