const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diets', {
   id:{
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true
   },
   title:{
    type: DataTypes.TEXT,
    allowNull: false
   }
  });
};
