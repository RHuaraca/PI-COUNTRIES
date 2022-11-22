
const orderByNameOptions = ['AZ', 'ZA'];
const orderByPupolationOptions = ['Not', 'Max', 'Min'];

const queryValidatorsToSortCountries = async (req, res, next) => {
    const { name, orderName, orderPopulation } = req.query;
    const errors = [];
    if (!orderName) errors.push({ error: `orderName query ir required` })
    if (!orderPopulation) errors.push({ error: `orderPopulation query is required` })
    if (orderName && !orderByNameOptions.includes(orderName)) errors.push({ error: `'${orderName}' must be ${orderByNameOptions}` })
    if (orderPopulation && !orderByPupolationOptions.includes(orderPopulation)) errors.push({ error: `'${orderPopulation}' must be ${orderByPupolationOptions}` })
    if (errors.length) return res.status(400).send(errors)
    next()
}

module.exports={queryValidatorsToSortCountries, orderByNameOptions, orderByPupolationOptions}