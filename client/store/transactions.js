//get all transactions (by trip)
//get user transactions (by user ID)

import axios from 'axios'

const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
const GOT_NEW_TRANSACTION = 'GOT_NEW_TRANSACTION'

export const setTransactions = (transactions) => {
  return {
    type: SET_TRANSACTIONS,
    transactions,
  }
}

export const gotNewTransaction = (transaction) => ({
  type: GOT_NEW_TRANSACTION,
  transaction,
})

export const fetchTransactions = (tripId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/transactions/${tripId}`)
      dispatch(setTransactions(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchMyTransactions = (tripId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(
        `/api/transactions/${tripId}/myTransactions`
      )
      dispatch(setTransactions(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const postTransaction = (transaction, tripId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/transactions/${tripId}`,
        transaction
      )
      const newTransaction = response.data

      dispatch(gotNewTransaction(newTransaction))
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
    case SET_TRANSACTIONS:
      return action.transactions
    case GOT_NEW_TRANSACTION: {
      return [...state, action.transaction]
    }
    default:
      return state
  }
}
