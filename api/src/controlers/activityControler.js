const { Activity } = require('../db');

const getAllActivities = async (req, res) => {
    try {
        const allActivities = await Activity.findAll()
        allActivities.name ? res.status(200).send(allActivities) : res.status(400).send([{ message: 'No activities' }]);
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

module.exports={getAllActivities}