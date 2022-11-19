const { Router } = require('express');
// Importar todos los routers;
const countries = require('./countries.js');
const activities = require('./activities.js');

const router = Router();

// Configurar los routers
router.use('/countries', countries);

router.use('/activities', activities);

module.exports = router;
