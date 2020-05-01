const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
  title: {
    type: Sequelize.STRING,
    defaultValue: 'New Trip',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  start: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = Trip
