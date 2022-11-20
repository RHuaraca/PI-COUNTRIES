const { Continent } = require('../db')
const continentsJson = require('../jsons/continents.json')

const getAllContinents = async (req, res) => {
    const continentsOfDb = await Continent.findAll();
    if (!continentsOfDb.length) {
        let newContinent;
        await Promise.all(continentsJson.map(async continent => {
            return newContinent = await Continent.create({
                name: continent.name
            })
        })).then(value => value);
        return res.status(200).send(await Continent.findAll())
    } else {
        return res.status(200).send(await Continent.findAll())
    }
}

module.exports={getAllContinents}