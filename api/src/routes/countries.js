const { Router } = require("express");
const { getCountries, getCountryById } = require("../controlers/countryControler.js");
const { discardingIdsToSearchCountry } = require('../midlewares/discardingIdsToSearchCountry.js')
const { queryValidatorsToSortCountries } = require('../midlewares/queryValidatorsToSortCountries.js')
const countries = Router();
//requerimientos para los modelos
//modulos de los controladores
//validadores en midlewares

countries.get('/',queryValidatorsToSortCountries, getCountries );

countries.get('/:id', discardingIdsToSearchCountry, getCountryById);

module.exports = countries;