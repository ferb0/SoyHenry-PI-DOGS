const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// Librería de NODE.
const crypto = require("crypto");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      set(value) {
        this.setDataValue('id', (value + 1000));
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lifeSpan: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    { timestamps: false }
  );
};
