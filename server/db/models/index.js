const User = require('./user')
const Bill = require('./bill')
const Group = require('./group')
const Place = require('./place')
const Plan = require('./plan')
const Review = require('./review')
const Trip = require('./trip')
const Transaction = require('./transaction')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Review)
User.belongsToMany(Trip, {through: Group})
User.hasMany(Transaction)
User.hasMany(Bill)

Trip.belongsToMany(User, {through: Group})
Trip.hasOne(Place)
Trip.hasMany(Plan)

Plan.hasMany(Bill)
Plan.hasOne(Place)

Place.hasMany(Review)
Place.hasOne(Bill)
Place.belongsTo(Trip)

Review.belongsTo(Place)
Review.belongsTo(User)

Bill.belongsTo(User)
Bill.belongsTo(Plan)
Bill.belongsTo(Place)
Bill.hasMany(Transaction)

Transaction.belongsTo(User)
Transaction.belongsTo(Bill)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Bill,
  Group,
  Place,
  Plan,
  Review,
  Trip,
  Transaction,
}
