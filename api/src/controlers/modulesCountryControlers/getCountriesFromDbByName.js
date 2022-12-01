const { Op } = require("sequelize");
const { Country, Activity } = require('../../db.js')
const { orderByPupolationOptions, orderByNameOptions } = require('../../midlewares/queryValidatorsToSortCountries.js')

const attributes = ['id', 'name', 'flag', 'continent', 'population'];
const include = {
    model: Activity,
    attributes: ["name"],
    through: {
        attributes: []
    }
}


const getCountriesFromDbByName = async (name, orderName, orderPopulation) => {
    const where = {
        name: {
            [Op.iLike]: `%${name}%`
        }
    }

    if (orderPopulation === orderByPupolationOptions[0] && orderName === orderByNameOptions[0]) return await Country.findAll({
        where,
        order: [['name', 'ASC']],
        attributes,
        include
    })

    if (orderPopulation === orderByPupolationOptions[0] && orderName === orderByNameOptions[1]) return await Country.findAll({
        where,
        order: [['name', 'DESC']],
        attributes,
        include
    })

    if (orderPopulation === orderByPupolationOptions[1] && orderName === orderByNameOptions[0]) return await Country.findAll({
        where,
        order: [['population', 'DESC'], ['name', 'ASC']],
        attributes,
        include
    })

    if (orderPopulation === orderByPupolationOptions[1] && orderName === orderByNameOptions[1]) return await Country.findAll({
        where,
        order: [['population', 'DESC'], ['name', 'DESC']],
        attributes,
        include
    })

    if (orderPopulation === orderByPupolationOptions[2] && orderName === orderByNameOptions[0]) return await Country.findAll({
        where,
        order: [['population', 'ASC'], ['name', 'ASC']],
        attributes,
        include
    })

    if (orderPopulation === orderByPupolationOptions[2] && orderName === orderByNameOptions[1]) return await Country.findAll({
        where,
        order: [['population', 'ASC'], ['name', 'DESC']],
        attributes,
        include
    })
}

module.exports={getCountriesFromDbByName}