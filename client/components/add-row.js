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

class AddRow extends React.Component {
  constructor() {
    super()
    this.daysArr = []
    this.switchFlag = false
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.splitSwitch = this.splitSwitch.bind(this)
  }

  state = {visible: false}

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  splitSwitch(checked) {
    this.switchFlag = !this.switchFlag
    console.log(`switch to ${checked}`)
    console.log(this.switchFlag)
  }

  handleSubmit(formData) {
    this.props.postPlan(formData, this.props.tripId)

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

  componentDidUpdate() {
    if (!this.daysArr.length && this.props.trips[0]) {
      for (let i = 1; i <= this.props.trips[0].duration; i++) {
        let dayText =
          this.props.trips[0].start.slice(0, 9) +
          (this.props.trips[0].start.slice(10) + i - 0)
        this.daysArr.push(`${dayText} Day ${i}`)
      }
    }
  }

  render() {
    console.log('props', this.props)

    return (
      <span>
        <Button type="primary" onClick={this.showModal} block>
          Add New
        </Button>
        <Modal
          title="Add Plan"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // width={800}
          className="modal"
        >
          <div className="center">
            <Form
              // labelCol={{span: 4}}
              // wrapperCol={{span: 14}}
              layout="horizontal"
              initialValues={{plan: '1', category: 'Do', duration: '30'}}
              size="small"
              onFinish={this.handleSubmit}
            >
              <Form.Item id="form" name="day">
                <Select>
                  {this.daysArr.map((day) => {
                    return (
                      <Select.Option
                        value={this.props.trips[0].start.slice(0, 10)}
                        key={day}
                      >
                        {day}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item id="form" name="activity">
                <Select>
                  <Select.Option value="Do">Do</Select.Option>
                  <Select.Option value="Sleep">Sleep</Select.Option>
                  <Select.Option value="Eat">Eat</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item id="form" name="duration">
                <Select>
                  <Select.Option value="30">.5 hour</Select.Option>
                  <Select.Option value="60">1 hour</Select.Option>
                  <Select.Option value="90">1.5 hours</Select.Option>
                  {/* <Select.Option value={120}>2 hours</Select.Option>
                <Select.Option value={150}>2.5 hours</Select.Option>
                <Select.Option value={180}>3 hours</Select.Option> */}
                </Select>
              </Form.Item>
              <Form.Item id="form" name="description">
                <Input placeholder="Description" />
              </Form.Item>

              <Form.Item id="form" name="placeId">
                <Select>
                  {this.props.trips[0] && (
                    <Select.Option value={this.props.trips[0].place.id}>
                      {this.props.trips[0].place.name}
                    </Select.Option>
                  )}
                </Select>
              </Form.Item>

              <Form.Item className="center">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
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

export default connect(mapState, mapDispatch)(AddRow)
