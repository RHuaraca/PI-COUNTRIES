const Router = require('express');
const activities = Router();
const { getAllActivities }= require('../controlers/activityControler.js');
//requerimientos de controlador
const { Activity, Country } = require('../db');
//controlador
//modulos de controlador
//midlewares validadores
const validationsPostActivity = (req, res, next) => {
    const { name, difficulty, duration, season, countries } = req.body;
    const errors = []
    if (!name) errors.push({ error: 'name is required' })
    if (!difficulty) errors.push({ error: 'difficulty is required' });
    if (!duration) errors.push({ error: 'duration is required' });
    if (!season) errors.push({ error: 'season is required' });
    if (!countries) errors.push({ error: "countries is required if not value send '[]'"})
    if (!/^[a-zA-Z]{1,46}(( ?[a-zA-Z]+)*?[a-zA-Z]{1,46})?$/.test(name)) errors.push({ error: `invalid text formatting of '${name}'` });
    if (!Number(difficulty) >= 1) errors.push({ error: `'${difficulty}' must be a number` });
    if (!(Number(difficulty) % 1 === 0)) errors.push({ error: `'${difficulty}' must be integer` });
    if (Number(difficulty) < 1 || Number(difficulty) > 5) errors.push({ error: `'${difficulty}' must be between 1 and 5` });
    if (!Number(duration) >= 1) errors.push({ error: `'${duration}' must be a number` });
    if (!["summer", "autumn", "winter", "spring"].includes(season)) errors.push({ error: `'${season}' must be 'summer' or 'autumn' or 'winter' or 'spring'` });
    if (errors.length) return res.status(400).send(errors)
    next();
}

activities.get('/', getAllActivities);

activities.post('/', validationsPostActivity, async (req,res)=>{
    const {name, difficulty, duration, season, countries} = req.body;
    const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season
    })
    console.log(countries.length)
    countries.length? await newActivity.addCountries(countries):null
    const succes = await Activity.findOne({
        where:{
            name:name
        },
        include: {
            model: Country,
            attributes: [   "name"],
            through: {
                attributes: []
            }
        }
    })
    console.log(succes);
    res.status(200).send(succes);//aqui nos quedamos falta 
});

activities.put('/newCountries',(req,res)=>{
    const newCountries = req.body;
    res.status(200).send({msg:`actualizando paises`, payload:newCountries})
});

module.exports = activities;