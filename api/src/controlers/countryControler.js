const { Country } = require('../db')

const { getCountriesFromApi } = require('./modulesCountryControlers/getCountriesFromApi.js')
const { getCountriesFromDb } = require('./modulesCountryControlers/getCountriesFromDb.js')
const { getCountriesFromDbByName } =require('./modulesCountryControlers/getCountriesFromDbByName.js')

const getCountries = async (req, res) => {
    const { name } = req.query;
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
                res.status(200).send(result.length ? result : { message: 'Not Found' });
            } else {
                const result = await getCountriesFromDbByName(name);
                res.status(200).send(result.length ? result : { message: 'Not Found' });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}

const getCountryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Country.findByPk(id)
        result ? res.status(200).send(result) : res.status(400).send({ error: 'This route does not exist' })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

module.exports={getCountries, getCountryById};