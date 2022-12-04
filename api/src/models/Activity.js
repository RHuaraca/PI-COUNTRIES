const {DataTypes} = require('sequelize')

module.exports= (sequelize)=>{
    sequelize.define('activity',{
        name:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate:{
                is: /^[a-zA-Z']{1,46}(( ?[a-zA-Z']+)*?[a-zA-Z']{0,46})?$/
            }
        },
        difficulty:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                isNumeric:true,
                max:5,
                min:1
            }
        },
        duration:{
            type:DataTypes.FLOAT,
            validate:{
                isNumeric:true,
            }
        },
        season:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isIn:[['Summer', 'Autumn', 'Winter', 'Spring']]
            }
        }
    },{timestamps:false});
};