const idValidatorToActivityDetail = async (req, res, next) => {
    const { id } = req.params;
    const errors = []
    if (id && !(Number(id) >= 1)) errors.push({ error: `'${id}' must be a positive number` })
    if (errors.length) return res.status(400).send(errors)
    next()
}

module.exports = { idValidatorToActivityDetail }