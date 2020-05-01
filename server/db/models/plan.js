const Sequelize = require('sequelize')
const db = require('../db')

const Plan = db.define('plan', {
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  activity: {
    type: Sequelize.ENUM('Do', 'Eat', 'Sleep'),
    allowNull: false,
  },
  start: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 60,
    validate: {
      notEmpty: true,
    },
  },
  weather: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = Plan
