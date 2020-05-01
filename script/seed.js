'use strict'

const db = require('../server/db')
const {User, Place, Plan} = require('../server/db/models')

const users = [
  {
    email: 'cody@email.com',
    password: '123',
    username: 'cody23',
    nickname: 'cody',
  },
  {
    email: 'murphy@email.com',
    password: '123',
    username: 'murphy6',
    nickname: 'murph',
  },
]

const tripPlaces = [
  {name: 'Chicago', tripLevel: true},
  {name: 'New York', tripLevel: true},
  {name: 'Houston', tripLevel: true},
  {name: 'New Orleans', tripLevel: true},
  {name: 'Miami', tripLevel: true},
]

const trips = [
  {start: '2021-04-01', duration: 3, placeId: 1},
  {start: '2022-08-01', duration: 4, placeId: 2},
  {start: '2023-01-01', duration: 5, placeId: 3},
  {start: '2024-06-01', duration: 6, placeId: 4},
  {start: '2025-02-01', duration: 7, placeId: 5},
]

const doPlaces = tripPlaces.map((place) => {
  return {
    name: 'City Hall',
    address: '22 W Adams St, ' + place.name + ' 60611',
  }
})

const doPlans = trips.map((trip, ind) => {
  return {
    start: trip.start + ' 14:00:00',
    duration: 30,
    activity: 'Do',
    description: 'Walking Tour',
    placeId: ind + 5,
  }
})

const eatPlaces = tripPlaces.map((place) => {
  return {
    name: 'Rainforest Cafe ' + place.name,
    address: '222 East St, ' + place.name + ' 60611',
  }
})

const eatPlans = trips.map((trip, ind) => {
  return {
    start: trip.start + ' 12:00:00',
    duration: 90,
    activity: 'Do',
    description: 'Lunch',
    placeId: ind,
  }
})

const sleepPlaces = tripPlaces.map((place) => {
  return {
    name: 'The Peninsula ' + place.name,
    address: '108 E Superior St, ' + place.name + ' 60611',
  }
})

const sleepPlans = trips.map((trip, ind) => {
  return {
    weather: 'Sunny',
    start: trip.start + ' 04:00:00',
    duration: 1200,
    activity: 'Sleep',
    description: 'Hotel',
    placeId: ind,
  }
})

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await User.bulkCreate(users)
  await Place.bulkCreate(tripPlaces)
  await Place.bulkCreate(doPlaces)
  await Plan.bulkCreate(doPlans)
  await Place.bulkCreate(eatPlaces)
  await Plan.bulkCreate(eatPlans)
  await Place.bulkCreate(sleepPlaces)
  await Plan.bulkCreate(sleepPlans)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
