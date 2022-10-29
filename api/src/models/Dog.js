const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// IdBase
const IDBASE = require('../global/idDogsBase.js');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      set(value) {
        this.setDataValue('id', (value + IDBASE));
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    minHeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    maxHeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    minWeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    maxWeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    minLifeSpan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    maxLifeSpan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  },
    { timestamps: false }
  );
};
