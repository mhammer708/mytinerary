const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: Sequelize.ENUM('debit', 'credit'),
    allowNull: false,
  },
})

module.exports = Transaction
