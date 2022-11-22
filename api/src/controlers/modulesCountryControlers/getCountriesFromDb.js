const { Country } = require('../../db.js')
const { orderByNameOptions, orderByPupolationOptions } = require('../../midlewares/queryValidatorsToSortCountries.js');

const attributes = ['id', 'name', 'flag', 'continent', 'population'];
const getCountriesFromDb = async (orderName, orderPopulation) => {
    if (orderPopulation === orderByPupolationOptions[0] && orderName === orderByNameOptions[0]) return await Country.findAll({
        order: [['name', 'ASC']],
        attributes
    })

    if (orderPopulation === orderByPupolationOptions[0] && orderName === orderByNameOptions[1]) return await Country.findAll({
        order: [['name', 'DESC']],
        attributes
    })

    if (orderPopulation === orderByPupolationOptions[1] && orderName === orderByNameOptions[0]) return await Country.findAll({
        order: [['population', 'DESC'], ['name', 'ASC']],
        attributes
    })

    if (orderPopulation === orderByPupolationOptions[1] && orderName === orderByNameOptions[1]) return await Country.findAll({
        order: [['population', 'DESC'], ['name', 'DESC']],
        attributes
    })

    if (orderPopulation === orderByPupolationOptions[2] && orderName === orderByNameOptions[0]) return await Country.findAll({
        order: [['population', 'ASC'], ['name', 'ASC']],
        attributes
    })

    if (orderPopulation === orderByPupolationOptions[2] && orderName === orderByNameOptions[1]) return await Country.findAll({
        order: [['population', 'ASC'], ['name', 'DESC']],
        attributes
    })
}
module.exports = {getCountriesFromDb}