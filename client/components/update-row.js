import React from 'react'
import {connect} from 'react-redux'
import {Modal, Form, Input, Select, Button, Switch} from 'antd'
import {fetchBills, postBill} from '../store/bills'

class UpdateRow extends React.Component {
  constructor() {
    super()
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
    this.props.postBill({formData}, this.props.record.key, this.props.tripId)

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
    this.props.getBills(this.props.tripId)
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
        >
          <div className="center">
            <Form
              // labelCol={{span: 4}}
              // wrapperCol={{span: 14}}
              // layout="horizontal"
              initialValues={{plan: 'new'}}
              size="small"
              onFinish={this.handleSubmit}
            >
              <Form.Item name="plan">
                <Select>
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
                <Input placeholder="Who Paid?" />
              </Form.Item>
              <Form.Item id="form" name="memo">
                <Input placeholder="What is it?" />
              </Form.Item>
              <Form.Item
                name="switch"
                label="Even Split?"
                defaultChecked
                valuePropName="checked"
                id="form"
              >
                <Switch />
              </Form.Item>
              <Form.Item id="form">
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
  }
}

const mapDispatch = (dispatch) => {
  return {
    getBills: (tripId) => dispatch(fetchBills(tripId)),
    postBill: (formData, planId, tripId) =>
      dispatch(postBill(formData, planId, tripId)),
    // getMyTransactions: (tripId) => dispatch(fetchMyTransactions(tripId)),
    // getPlans: (tripId) => dispatch(fetchPlans(tripId)),
  }
}

export default connect(mapState, mapDispatch)(UpdateRow)
