const { Router } = require("express");
const { Country } = require('../db.js')
const axios = require('axios');
const { Op } = require("sequelize");
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
async function getCountriesFromDbByName(name){
    return await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
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
                await getCountriesFromApi();
                const result = await getCountriesFromDbByName(name);
                res.status(200).send(result.length?result:{message:'Not Found'});
            } else { 
                const result = await getCountriesFromDbByName(name);
                res.status(200).send(result.length ? result : { message: 'Not Found' });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({error:error.message})
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