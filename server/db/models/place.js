const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tripLevel: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  source: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  rating: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: true,
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'https://i.dlpng.com/static/png/6959315_preview.png',
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  website: {
    type: Sequelize.STRING,
    allowNull: true,
  },
})

module.exports = Place
