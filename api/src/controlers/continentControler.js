const { Continent } = require('../db')
const continentsJson = require('../jsons/continents.json')

const getAllContinents = async (req, res) => {
    const continentsOfDb = await Continent.findAll();
    try {
        if (!continentsOfDb.length) {
            await Promise.all(continentsJson.map(async continent => {
                return await Continent.create({
                    name: continent.name
                })
            })).then(value => value);
            return res.status(200).send(await Continent.findAll())
        } else {
            return res.status(200).send(await Continent.findAll())
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

module.exports={getAllContinents}