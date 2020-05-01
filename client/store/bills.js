import axios from 'axios'

const SET_BILLS = 'SET_BILLS'
const GOT_NEW_BILL = 'GOT_NEW_BILL'

export const setBills = (bills) => {
  return {
    type: SET_BILLS,
    bills,
  }
}

export const gotNewBill = (bill) => ({
  type: GOT_NEW_BILL,
  bill,
})

export const fetchBills = (tripId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/bills/${tripId}`)
      dispatch(setBills(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const postBill = (bill, tripId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/bills/${tripId}`, bill)
      const newBill = response.data
      dispatch(gotNewBill(newBill))
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
    case SET_BILLS:
      return action.bills
    case GOT_NEW_BILL: {
      return [...state, action.bill]
    }
    default:
      return state
  }
}
