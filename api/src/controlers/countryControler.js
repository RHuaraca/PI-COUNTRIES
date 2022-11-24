const { Country, Activity } = require('../db')

const { getCountriesFromApi } = require('./modulesCountryControlers/getCountriesFromApi.js')
const { getCountriesFromDb } = require('./modulesCountryControlers/getCountriesFromDb.js')
const { getCountriesFromDbByName } =require('./modulesCountryControlers/getCountriesFromDbByName.js')

const getCountries = async (req, res) => {
    const { name, orderName, orderPopulation } = req.query;
    try {
        let allCountries = await getCountriesFromDb(orderName, orderPopulation)
        if(!allCountries.length){
            await getCountriesFromApi()
            allCountries = await getCountriesFromDb(orderName, orderPopulation)
        }
        if(!name) return res.status(200).send(allCountries)
        const result = await getCountriesFromDbByName(name, orderName, orderPopulation);
        res.status(200).send(result.length ? result : [{ message: 'Not Found' }]);
    } catch (error) {
        res.status(500).send([{ error: error.message }])
    }
}

const getCountryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Country.findByPk(id,{
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: []
                }
            }
        })
        result ? res.status(200).send([result]) : res.status(400).send([{ error: 'This route does not exist' }])
    } catch (error) {
        res.status(400).send([{ error: error.message }])
    }
} 

module.exports={getCountries, getCountryById};