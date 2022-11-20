const discardingIds = async (req, res, next) => {
    const { id } = req.params;
    if (Number(id) >= 1) return res.status(400).send({ error: 'the ID is not numbers' });
    if (id.length !== 3) return res.status(400).send({ error: 'ID length is 3' });
    next();
};

module.exports={discardingIds}