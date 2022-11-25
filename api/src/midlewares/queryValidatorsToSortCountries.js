
const orderByNameOptions = ['AZ', 'ZA'];
const orderByPupolationOptions = ['Not', 'Max', 'Min'];

const queryValidatorsToSortCountries = (req, res, next) => {
    const { orderName, orderPopulation } = req.query;
    const error = [];
    if (!orderName) error.push({ error: `orderName query ir required` })
    if (!orderPopulation) error.push({ error: `orderPopulation query is required` })
    if (orderName && !orderByNameOptions.includes(orderName)) error.push({ error: `'${orderName}' must be ${orderByNameOptions}` })
    if (orderPopulation && !orderByPupolationOptions.includes(orderPopulation)) error.push({ error: `'${orderPopulation}' must be ${orderByPupolationOptions}` })
    if (error.length) return res.status(400).send(error)
    next()
}

module.exports={queryValidatorsToSortCountries, orderByNameOptions, orderByPupolationOptions}