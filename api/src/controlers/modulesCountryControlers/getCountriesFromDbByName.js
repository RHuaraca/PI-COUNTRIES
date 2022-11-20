const { Op } = require("sequelize");
const { Country } = require('../../db.js')

const getCountriesFromDbByName = async (name) => {
    return await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
}

module.exports={getCountriesFromDbByName}