const { Country } = require('../../db.js')

const getCountriesFromDb = async () => {
    return await Country.findAll()
}
module.exports = {getCountriesFromDb}