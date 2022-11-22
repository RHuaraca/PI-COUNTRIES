const { Op } = require("sequelize");
const { Country } = require('../../db.js')
const { orderByPupolationOptions, orderByNameOptions } = require('../../midlewares/queryValidatorsToSortCountries.js')

const attributes = ['id', 'name', 'flag', 'continent', 'population'];
const getCountriesFromDbByName = async (name, orderName, orderPopulation) => {

    if (orderPopulation === orderByPupolationOptions[0] && orderName === orderByNameOptions[0]) return await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        order: [['name', 'ASC']],
        attributes
    })

    if (orderPopulation === orderByPupolationOptions[0] && orderName === orderByNameOptions[1]) return await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        order: [['name', 'DESC']],
        attributes
    })

    if (orderPopulation === orderByPupolationOptions[1] && orderName === orderByNameOptions[0]) return await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        order: [['population', 'DESC'], ['name', 'ASC']],
        attributes
    })

    if (orderPopulation === orderByPupolationOptions[1] && orderName === orderByNameOptions[1]) return await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        order: [['population', 'DESC'], ['name', 'DESC']],
        attributes
    })

    if (orderPopulation === orderByPupolationOptions[2] && orderName === orderByNameOptions[0]) return await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        order: [['population', 'ASC'], ['name', 'ASC']],
        attributes
    })

    if (orderPopulation === orderByPupolationOptions[2] && orderName === orderByNameOptions[1]) return await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        order: [['population', 'ASC'], ['name', 'DESC']],
        attributes
    })
}

module.exports={getCountriesFromDbByName}