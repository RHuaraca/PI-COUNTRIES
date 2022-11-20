const { Router } = require("express");
const { getCountries } = require("../controlers/countryControler.js");
const countries = Router();

countries.get('/',getCountries );

countries.get('/:id', (req,res)=>{
    const {id} = req.params;
    console.log(req.params)
    res.status(200).send({msg: `Enviar el detalle del pais cuyo id es ${id}`})
});

countries.get('/continents',(req,res)=>{
    res.status(200).send({msg: `Enviar lista completa de continentes`})
});

module.exports = countries;