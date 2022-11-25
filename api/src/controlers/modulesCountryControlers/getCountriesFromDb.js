const { Country, Activity } = require('../../db.js')
const { orderByNameOptions, orderByPupolationOptions } = require('../../midlewares/queryValidatorsToSortCountries.js');

const attributes = ['id', 'name', 'flag', 'continent', 'population'];
const include = {
    model: Activity,
    attributes: ["name"],
    through: {
        attributes: []
    }
}
const getCountriesFromDb = async (orderName, orderPopulation) => {
    if (orderPopulation === orderByPupolationOptions[0] && orderName === orderByNameOptions[0]) return await Country.findAll({
        order: [['name', 'ASC']],
        attributes,
        include
    })

    if (orderPopulation === orderByPupolationOptions[0] && orderName === orderByNameOptions[1]) return await Country.findAll({
        order: [['name', 'DESC']],
        attributes,
        include
    })

    if (orderPopulation === orderByPupolationOptions[1] && orderName === orderByNameOptions[0]) return await Country.findAll({
        order: [['population', 'DESC'], ['name', 'ASC']],
        attributes,
        include
    })

    if (orderPopulation === orderByPupolationOptions[1] && orderName === orderByNameOptions[1]) return await Country.findAll({
        order: [['population', 'DESC'], ['name', 'DESC']],
        attributes,
        include
    })

    if (orderPopulation === orderByPupolationOptions[2] && orderName === orderByNameOptions[0]) return await Country.findAll({
        order: [['population', 'ASC'], ['name', 'ASC']],
        attributes,
        include
    })

    if (orderPopulation === orderByPupolationOptions[2] && orderName === orderByNameOptions[1]) return await Country.findAll({
        order: [['population', 'ASC'], ['name', 'DESC']],
        attributes,
        include
    })
}
module.exports = {getCountriesFromDb}