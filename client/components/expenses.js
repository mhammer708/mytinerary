import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchMyTransactions} from '../store/transactions'
import {fetchBills} from '../store/bills'
import {fetchPlans} from '../store/plans'
import {Button, Table} from 'antd'

const Expenses = (props) => {
  const [tableData, setData] = useState()

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      // render: (value, row, index) => {
      //   const obj = {
      //     children: value,
      //     props: {},
      //   };
      //   if (value.slice(0,3) === 'Day') {
      //     return <a>{text}</a>;
      //   }
      //   return {
      //     children: <a>{text}</a>,
      //     props: {
      //       colSpan: 5,
      //     },
    },
    {
      title: 'You',
      dataIndex: 'you',
      key: 'you',
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
    },
  ]

  // const youCalc = (planId) => {
  //   const foo = props.transactions
  //     .filter(
  //       (transaction) =>
  //         transaction.bill.planId === planId && transaction.type === 'debit'
  //     )
  //     .map((transaction) => Number.parseFloat(transaction.amount))
  //     .reduce((accum, currVal) => accum + currVal, 0)

  //   // const planBills = props.bills.filter((bill) => bill.planId === planId)
  //   // // 1 , 2 , 3
  //   // const planTransactions = planBills.map((bill) =>
  //   //   props.transactions.filter(
  //   //     (transaction) => transaction.billId === bill.id
  //   //   )
  //   // )

  //   console.log('bills', props.bills)
  //   console.log('foo', foo)
  //   // console.log('billIds', planBills)
  //   // console.log('planTrans', planTransactions)

  //   // return planTransactions.map().reduce((accum, currVal) => accum + currVal)
  // }

  const dataCalc = () => {
    if (props.plans) {
      let table = []
      const foo = props.bills
        // .filter((bill) => bill.planId === props.plans[0].id)
        .map((bill) => Number.parseFloat(bill.price))
        .reduce((accum, currVal) => accum + currVal, 0)
      console.log('yooo', foo)
      props.plans.forEach((plan) => {
        table.push({
          key: plan.id,
          description: plan.description,
          you: props.transactions
            .filter(
              (transaction) =>
                transaction.bill.planId === plan.id &&
                transaction.type === 'debit'
            )
            .map((transaction) => Number.parseFloat(transaction.amount))
            .reduce((accum, currVal) => accum + currVal, 0),
          group: props.bills
            .filter((bill) => bill.planId === plan.id)
            .map((bill) => Number.parseFloat(bill.price))
            .reduce((accum, currVal) => accum + currVal, 0),
        })
      })
      console.log('hi')
      setData(table)
    }
  }

  useEffect(() => {
    props.getPlans(1)
  }, [])
  useEffect(() => {
    // const tripId = props.match.params.id
    props.getBills(1)
  }, [])
  useEffect(() => {
    props.getMyTransactions(1)
  }, [])

  useEffect(() => {
    dataCalc()
  }, [props])

  return (
    <div>
      <h1>Expenses</h1>
      <Table dataSource={tableData} columns={columns} />
    </div>
  )
}

const mapState = (state) => {
  return {
    bills: state.bills,
    transactions: state.transactions,
    plans: state.plans,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getBills: (tripId) => dispatch(fetchBills(tripId)),
    getMyTransactions: (tripId) => dispatch(fetchMyTransactions(tripId)),
    getPlans: (tripId) => dispatch(fetchPlans(tripId)),
  }
}

export default connect(mapState, mapDispatch)(Expenses)
