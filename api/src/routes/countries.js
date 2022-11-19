const { Router } = require("express");

const countries = Router();

//validaciones

countries.get('/', (req, res) => {
    const {name} = req.query;
    if (name) {
        res.status(200).send({ msg: `Enviar lista completa de paises por ${name}` });
    } else {
        res.status(200).send({ msg: "Enviar lista completa de paises" });
    }
});

countries.get('/:id', (req,res)=>{
    const {id} = req.params;
    console.log(req.params)
    res.status(200).send({msg: `Enviar el detalle del pais cuyo id es ${id}`})
});

module.exports = countries;