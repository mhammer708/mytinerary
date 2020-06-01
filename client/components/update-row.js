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
import {fetchTrip} from '../store/trips'

class UpdateRow extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  state = {visible: false}

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleSubmit(formData) {
    this.props.postBill({formData}, this.props.record.key, this.props.tripId)
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

  handleChange = (e) => {
    const selectedBill = this.props.bills.filter((bill) => bill.id === e.value)
    console.log(selectedBill)
  }

  componentDidMount() {
    this.props.getBills(this.props.tripId)
    this.props.getTrip(this.props.tripId)
  }

  render() {
    console.log('props', this.props)

    return (
      <span>
        <a onClick={this.showModal}>{this.props.text}</a>
        <Modal
          title="Update Row"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // width={800}
          className="modal"
          footer={null}
        >
          <div className="center">
            <Form
              // labelCol={{span: 4}}
              // wrapperCol={{span: 14}}
              layout="horizontal"
              initialValues={{plan: 'new'}}
              size="small"
              onFinish={this.handleSubmit}
            >
              <Form.Item name="plan">
                <Select onChange={this.handleChange}>
                  {this.props.bills
                    .filter((bill) => bill.planId === this.props.record.key)
                    .map((bill) => {
                      return (
                        <Select.Option value={bill.id} key={bill.id}>
                          {bill.plan && bill.plan.description}
                          {bill.note}
                        </Select.Option>
                      )
                    })}
                  <Select.Option value="new">New Bill</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item id="form" name="amount">
                <Input placeholder="How Much?" />
              </Form.Item>
              <Form.Item id="form" name="payer">
                <Select>
                  {this.props.trips[0] &&
                    this.props.trips[0].users.map((user) => {
                      return (
                        <Select.Option key={user.id} value={user.id}>
                          {user.nickname}
                        </Select.Option>
                      )
                    })}
                </Select>
              </Form.Item>
              <Form.Item id="form" name="memo">
                <Input placeholder="What is it?" />
              </Form.Item>

              <Form.Item label="Who was involved?" name="payees">
                <Checkbox.Group>
                  <Row>
                    {this.props.trips[0] &&
                      this.props.trips[0].users.map((user) => {
                        return (
                          <Col key={user.id} keyspan={8}>
                            <Checkbox
                              value={user.id}
                              style={{lineHeight: '32px'}}
                            >
                              {user.nickname}
                            </Checkbox>
                          </Col>
                        )
                      })}
                  </Row>
                </Checkbox.Group>
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
    getTrip: (tripId) => dispatch(fetchTrip(tripId)),
    // getMyTransactions: (tripId) => dispatch(fetchMyTransactions(tripId)),
    // getPlans: (tripId) => dispatch(fetchPlans(tripId)),
  }
}

export default connect(mapState, mapDispatch)(UpdateRow)
