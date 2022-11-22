const { Activity } = require('../db')

const idValidatorToPutOrDeleteActivity = async (req, res, next) => {
    const { id } = req.query;
    try {
        const errors = []
        if (!id) errors.push({ error: `query id is required` })
        if (id && !(Number(id) >= 1)) errors.push({ error: `'${id}' must be a positive number` })
        let activity
        if (id && Number(id) >= 1 && id > 0) {
            activity = await Activity.findByPk(id);
            !activity ? errors.push({ error: `There is no activity associated with id: '${id}'` }) : null;
        }
        if (errors.length) return res.status(400).send(errors)
        next()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports = { idValidatorToPutOrDeleteActivity }