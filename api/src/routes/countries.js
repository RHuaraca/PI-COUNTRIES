const { Router } = require("express");
const { getCountries, getCountryById } = require("../controlers/countryControler.js");
const { discardingIds } = require('../midlewares/discardingIds.js')
const countries = Router();
//requerimientos para los modelos
//modulos de los controladores
//validadores en midlewares

countries.get('/',getCountries );

countries.get('/:id', discardingIds, getCountryById);

module.exports = countries;