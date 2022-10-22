const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// Librería de NODE.
const crypto = require("crypto");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    height: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    lifeSpan: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
    { timestamps: false }
  );
};
