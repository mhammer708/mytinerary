const Sequelize = require('sequelize')
const db = require('../db')

const Group = db.define('group', {
  title: {
    type: Sequelize.STRING,
    defaultValue: 'New Group',
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://cdn0.iconfinder.com/data/icons/account-avatar/128/contacts-512.png',
  },
})

module.exports = Group
