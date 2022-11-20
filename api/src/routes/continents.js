const Router = require('express');
const continents = Router();
const {getAllContinents} = require('../controlers/continentControler.js')

continents.get('/', getAllContinents);

module.exports = continents;