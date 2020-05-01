const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('trip', {
  userRating: {
    type: Sequelize.ENUM(1, 2, 3, 4, 5),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
})

module.exports = Review
