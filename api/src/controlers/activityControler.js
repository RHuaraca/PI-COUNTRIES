const { Activity, Country } = require('../db');
const { getCountriesFromApi } = require('./modulesCountryControlers/getCountriesFromApi.js');

const getAllActivities = async (req, res) => {
    try {
        const allActivities = await Activity.findAll({
            include:{
                model:Country,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        allActivities.length? res.status(200).send(allActivities) : res.status(400).send([{ message: 'No activities' }]);
    } catch (error) {
        res.status(400).send([{ error: error.message }])
    }
}

const postActivity = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
    try {
        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });
        let countriesInDb = await Country.findAll();
        if (!countriesInDb.length){
            await getCountriesFromApi();
            countriesInDb = await Country.findAll();
        }
        countries.length ? await newActivity.addCountries(countries) : null;
        const succes = await Activity.findOne({
            where: {
                name: name
            },
            include: {
                model: Country,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        res.status(200).send([succes]);
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message });
    }
};

const activityUpdate = async (req, res) => {
    const { id } = req.query;
    const valuesOfActivityToUpdate = req.body;
    try {
        let activityToUpdate = await Activity.findByPk(id)
        await activityToUpdate.update(valuesOfActivityToUpdate);
        await activityToUpdate.save();
        activityToUpdate = await Activity.findByPk(id, {
            include: {
                model: Country,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        res.status(200).send([activityToUpdate]);
    } catch (error) {
        console.log(error);
        res.status(500).send([{ error: error.message}])
    }
}

const deleteActivity = async (req, res) => {
    const { id } = req.query
    try {
        const activityToDelete = await Activity.findByPk(id);
        await activityToDelete.destroy();
        res.status(200).send([{ message: `'${activityToDelete.name}' has been removed` }])
    } catch (error) {
        res.status(500).send([{ error: error.message }])
    }
}

module.exports={getAllActivities, postActivity, activityUpdate, deleteActivity}