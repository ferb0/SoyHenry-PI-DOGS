const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/i,
      }
    },

    minHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,

        onlyPositive(value) {
          if (value <= 0)
            throw new Error('Only numbers greater than zero are allowed.');
        },

        minorHeight(value) {
          if (value > this.maxHeight)
            throw new Error('The minHeight > maxHeight.');
        }
      }
    },

    maxHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,

        onlyPositive(value) {
          if (value <= 0)
            throw new Error('Only numbers greater than zero are allowed.');
        },

        maxHeight(value) {
          if (value < this.minHeight)
            throw new Error('The maxHeight < minHeight.');
        }
      }
    },

    minWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,

        onlyPositive(value) {
          if (value <= 0)
            throw new Error('Only numbers greater than zero are allowed.');
        },

        minorWeight(value) {
          if (value > this.maxWeight)
            throw new Error('The minWeight > minWeight.');
        }
      }
    },

    maxWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,

        onlyPositive(value) {
          if (value <= 0)
            throw new Error('Only numbers greater than zero are allowed.');
        },

        maxWeight(value) {
          if (value < this.minWeight)
            throw new Error('The maxWeight < minWeight.');
        }
      }
    },

    minLifeSpan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,

        onlyPositive(value) {
          if (value <= 0)
            throw new Error('Only numbers greater than zero are allowed.');
        },

        minorLifeSpan(value) {
          if (value > this.maxLifeSpan)
            throw new Error('The minLifeSpan > maxLifeSpan.');
        }
      }
    },

    maxLifeSpan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,

        onlyPositive(value) {
          if (value <= 0)
            throw new Error('Only numbers greater than zero are allowed.');
        },

        maxLifeSpan(value) {
          if (value < this.minLifeSpan)
            throw new Error('The maxLifeSpan < minLifeSpan.');
        }
      }
    },

    img: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {

        url(value) {
          if (value && !value.match(/^http/))
            throw new Error('The img is not a URL valid.');
        }
      }
    },
  },

    { timestamps: false }
  );
};
