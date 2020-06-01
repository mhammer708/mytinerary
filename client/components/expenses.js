import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import UpdateRow from './update-row'
import SettleUp from './settle-up'
import AddRow from './add-row'
import {fetchMyTransactions} from '../store/transactions'
import {fetchBills} from '../store/bills'
import {fetchPlans} from '../store/plans'
import {Button, Table, Typography} from 'antd'
const {Text} = Typography

const Expenses = (props) => {
  const [tableData, setTableData] = useState()
  // const {tripId} = props.match.params
  const tripId = props.tripId

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '70%',
    },
    {
      title: 'You',
      dataIndex: 'you',
      key: 'you',
      width: '15%',
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <UpdateRow tripId={tripId} record={record} text={text} />
      ),
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      width: '15%',
    },
  ]

  const dataCalc = () => {
    if (props.plans) {
      let table = []
      const foo = props.bills
        // .filter((bill) => bill.planId === props.plans[0].id)
        .map((bill) => Number.parseFloat(bill.price))
        .reduce((accum, currVal) => accum + currVal, 0)
      console.log('bump', foo)
      props.plans.forEach((plan) => {
        table.push({
          key: plan.id,
          description: plan.description,
          you:
            '$ ' +
            props.transactions
              .filter(
                (transaction) =>
                  transaction.bill.planId === plan.id &&
                  transaction.type === 'debit'
              )
              .map((transaction) => Number.parseFloat(transaction.amount))
              .reduce((accum, currVal) => accum + currVal, 0)
              .toFixed(2),
          group:
            '$ ' +
            props.bills
              .filter((bill) => bill.planId === plan.id)
              .map((bill) => Number.parseFloat(bill.price))
              .reduce((accum, currVal) => accum + currVal, 0)
              .toFixed(2),
        })
      })

      setTableData(table)
    }
  }

  useEffect(() => {
    // const tripId = props.match.params.id
    props.getPlans(tripId)
    props.getMyTransactions(tripId)
    props.getBills(tripId)
  }, [])

  useEffect(() => {
    dataCalc()
  }, [props])

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
        footer={() => {
          return (
            <div>
              <AddRow tripId={tripId} />
              <SettleUp tripId={tripId} />
            </div>
          )
        }}
        summary={(pageData) => {
          if (pageData) {
            let totalYou = 0
            let totalGroup = 0

            pageData.forEach(({you, group}) => {
              totalYou += Number.parseFloat(you.slice(2))
              totalGroup += Number.parseFloat(group.slice(2))
            })

            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell>Total</Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <Text>$ {totalYou}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <Text>$ {totalGroup}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            )
          }
        }}
      />
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
