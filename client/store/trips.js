import axios from 'axios'

const SET_TRIPS = 'SET_TRIPS'
const GOT_NEW_TRIP = 'GOT_NEW_TRIP'

export const setTrips = (trips) => {
  return {
    type: SET_TRIPS,
    trips,
  }
}

export const gotNewTrip = (trip) => ({
  type: GOT_NEW_TRIP,
  trip,
})

export const fetchTrip = (tripId) => {
  return async (dispatch) => {
    try {
      console.log('TRIP ID LOOK', tripId)
      const {data} = await axios.get(`/api/trips/${tripId}`)
      console.log('fetched data !', data)
      dispatch(gotNewTrip(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchTrips = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/trips`, userId)
      dispatch(setTrips(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const postTrip = (trip) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/trips`, trip)
      const newTrip = response.data
      dispatch(gotNewTrip(newTrip))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TRIPS:
      return action.trips
    case GOT_NEW_TRIP: {
      return [...state, action.trip]
    }
    default:
      return state
  }
}
