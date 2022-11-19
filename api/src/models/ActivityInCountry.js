const {DataTypes}=require('sequelize');
const Activity = require('./Activity');
const Country = require('./Activity');

module.exports=(sequelize)=>{
    sequelize.define('ActivityInCountry',{
        id:{
            type:DataTypes.INTEGER,
            autoincremente:true,
            primaryKey:true
        },
        countryId:{
            type:DataTypes.STRING,
            refereces:{
                model: Country,
                key:'id'
            }
        },
        activityId:{
            type:DataTypes.INTEGER,
            refereces:{
                model:Activity,
                key:'id'
            }
        }
    },{timestamps:false});
};