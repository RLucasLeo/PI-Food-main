const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
   id:{
    type: DataTypes.UUID,
    primaryKey: true
   },
   title:{
    type: DataTypes.TEXT,
    allowNull: false
   },
   image:{
    type: DataTypes.TEXT,
    allowNull: false
   },
   summary: {
    type: DataTypes.TEXT,
    allowNull: false
   },
   healthScore:{
    type: DataTypes.INTEGER,
    validate:{
      min: 0,
      max: 1000
    }
   },
   instructions: {
    type: DataTypes.TEXT,
    allowNull: false
   },
  });
};
