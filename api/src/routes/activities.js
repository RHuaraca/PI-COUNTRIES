const Router = require('express')

const activities = Router();

activities.get('/', (req, res) => {
    res.status(200).send({msg:"Acá enviaremos las actividades ya guardadas"});
});

activities.post('/',(req,res)=>{
    const newActivity = req.body;
    res.status(200).send({msg: 'guardar nueva actividad', payload:newActivity});
});

activities.put('/newCountries',(req,res)=>{
    const newCountries = req.body;
    res.status(200).send({msg:`actualizando paises`, payload:newCountries})
});

module.exports = activities;