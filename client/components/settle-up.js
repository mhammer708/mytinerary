import React from 'react'
import {connect} from 'react-redux'
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Switch,
  Checkbox,
  Row,
  Col,
} from 'antd'
import {fetchBills, postBill} from '../store/bills'
import {postPlan} from '../store/plans'
import {fetchTrips, fetchTrip} from '../store/trips'

class SettleUp extends React.Component {
  constructor() {
    super()
    this.daysArr = []
    this.switchFlag = false
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  state = {visible: false}

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleSubmit(formData) {
    this.props.postPlan(formData, this.props.tripId)
    this.setState({
      visible: false,
    })

    console.log('Success:', formData)
  }

  handleOk = (e) => {
    console.log(e)

    this.setState({
      visible: false,
    })
  }

  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  componentDidMount() {
    this.props.getTrip(this.props.tripId)
  }

  render() {
    console.log('props', this.props)

    return (
      <span>
        <Button onClick={this.showModal} block>
          Settle Up
        </Button>
        <Modal
          title="Settle Up"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // width={800}
          className="modal"
          // footer={null}
        >
          <div className="center"></div>
        </Modal>
      </span>
    )
  }
}

const mapState = (state) => {
  return {
    bills: state.bills,
    trips: state.trips,
    trip: state.trip,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getBills: (tripId) => dispatch(fetchBills(tripId)),
    postBill: (formData, planId, tripId) =>
      dispatch(postBill(formData, planId, tripId)),
    postPlan: (plan, tripId) => dispatch(postPlan(plan, tripId)),
    getTrips: (userId) => dispatch(fetchTrips(userId)),
    getTrip: (tripId) => dispatch(fetchTrip(tripId)),
    // getMyTransactions: (tripId) => dispatch(fetchMyTransactions(tripId)),
    // getPlans: (tripId) => dispatch(fetchPlans(tripId)),
  }
}

export default connect(mapState, mapDispatch)(SettleUp)
