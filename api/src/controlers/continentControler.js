const { Continent } = require('../db')
const continentsJson = require('../jsons/continents.json')

const getAllContinents = async (req, res) => {
    try {
        let continentsOfDb = await Continent.findAll();
        if (!continentsOfDb.length) {
            await Continent.bulkCreate(continentsJson);
            continentsOfDb = await Continent.findAll();
        }
        return res.status(200).send(continentsOfDb)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports={getAllContinents}