const axios = require('axios');
const { Country } = require('../../db.js')

const getCountriesFromApi = async () => {
    const { data } = await axios.get(`https://restcountries.com/v3/all`);
    return await Promise.all(data.map(country => {
        return Country.create({
            id: country.cca3,
            name: country.name.common,
            flag: country.flags[1],
            continent: country.region,
            capital: country.capital ? country.capital[0] : "",
            subregion: country.subregion,
            area: country.area,
            population: country.population
        });
    })).then(values => values);
}

module.exports={getCountriesFromApi}