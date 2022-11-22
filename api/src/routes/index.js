const { Router } = require('express');
// Importar todos los routers;
const countries = require('./countries.js');
const activities = require('./activities.js');
const continents = require('./continents.js')

const router = Router();

// Configurar los routers
router.use('/countries', countries);

router.use('/activities', activities);

router.use('/continents', continents);

router.use('*',(req,res)=>{
    res.status(400).send([{error:'this endpoint does not exist'}])
})

module.exports = router;
