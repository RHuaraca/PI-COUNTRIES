const { Router } = require("express");
const { Country } = require('../db.js')
const axios = require('axios')
const countries = Router();

async function getCountriesFromDb(){
    return await Country.findAll()
}

async function getCountriesFromApi(){
    const { data } = await axios.get(`https://restcountries.com/v3/all`);
    return await Promise.all(data.map(country => {
        return Country.create({
            id: country.cca3,
            name: country.name.common,
            flag: country.flags[1],
            continent: country.region,
            capital: country.capital ? country.capital[0] : null,
            subregion: country.subregion,
            area: country.area,
            population: country.population
        });
    })).then(values => values);
}

countries.get('/', async(req, res) => {
    const {name} = req.query;
    //console.log((await getCountriesFromDb()).length )
    try {
        if (!name) {
            if (!(await getCountriesFromDb()).length) {
                res.status(200).send(await getCountriesFromApi());
            } else {
                res.status(200).send(await getCountriesFromDb());
            }
        } else {
            if (!(await getCountriesFromDb()).length) {
                await getCountriesFromApi()
                console.log(await Country.findAll())//Nos quedamos aqui (debemos buscar por coincidencia de nombre)
                res.status(200).send({ msg: `Enviar lista completa de paises por ${name}` });
            } else {
                res.status(200).send({ msg: `Enviar lista completa de paises por ${name}` });
            }
        }
    } catch (error) {
        res.status(400).send({error:error})
    }


    //res.status(200).send({ msg: `Enviar lista completa de paises por ${name}` });
});

countries.get('/:id', (req,res)=>{
    const {id} = req.params;
    console.log(req.params)
    res.status(200).send({msg: `Enviar el detalle del pais cuyo id es ${id}`})
});

countries.get('/continents',(req,res)=>{
    res.status(200).send({msg: `Enviar lista completa de continentes`})
});

module.exports = countries;