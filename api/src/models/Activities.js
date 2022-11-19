const {DataTypes} = require('sequelize')

module.exports= (sequelize)=>{
    sequelize.define('activity',{
        id:{
            type: DataTypes.INTEGER,
            autoincrement:true,
            primaryKey:true
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                isAlpha: true,
            }
        },
        difficulty:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                isNumeric:true,
                isIn:[1,2,3,4,5]
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
                isIn:['summer', 'autumn', 'winter', 'spring']
            }
        }
    },{timestamps:false});
};