//get all transactions (by trip)
//get user transactions (by user ID)

import axios from 'axios'

const SET_PLANS = 'SET_PLANS'
const GOT_NEW_PLAN = 'GOT_NEW_PLAN'

export const setPlans = (plans) => {
  return {
    type: SET_PLANS,
    plans,
  }
}

export const gotNewPlan = (plan) => ({
  type: GOT_NEW_PLAN,
  plan,
})

export const fetchPlans = (tripId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/plans/${tripId}`)
      dispatch(setPlans(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const postPlan = (plan, tripId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/plans/${tripId}`, plan)
      const newPlan = response.data
      dispatch(gotNewPlan(newPlan))
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
    case SET_PLANS:
      return action.plans
    case GOT_NEW_PLAN: {
      return [...state, action.plan]
    }
    default:
      return state
  }
}
