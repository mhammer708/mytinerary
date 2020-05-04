const Sequelize = require('sequelize')
const db = require('../db')

const Bill = db.define('bill', {
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  evenSplit: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    validate: {
      notEmpty: true,
    },
  },
  paymentStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    validate: {
      notEmpty: true,
    },
  },
  refundDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  note: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  type: {
    type: Sequelize.ENUM('Cash', 'Card'),
    allowNull: false,
    defaultValue: 'Card',
  },
  currency: {
    type: Sequelize.ENUM('USD', 'EUR'),
    allowNull: false,
    defaultValue: 'USD',
  },
  miscCategory: {
    type: Sequelize.ENUM('Fee', 'Transport', 'Equipment', 'Other'),
    allowNull: true,
  },
})

module.exports = Bill
